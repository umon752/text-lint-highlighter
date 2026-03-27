// ─── Highlight marker ────────────────────────────────────────────────────────
const HIGHLIGHT_CLASS = 'tl-highlight-span';

const MAX_MATCHES_PER_NODE = 500;

// Tags whose text content should NOT be touched
const SKIP_TAGS = new Set([
  'SCRIPT', 'STYLE', 'NOSCRIPT', 'IFRAME', 'OBJECT', 'EMBED',
  'INPUT', 'TEXTAREA', 'SELECT', 'BUTTON', 'CODE', 'KBD', 'SAMP', 'VAR',
]);

// ─── Regex builder ────────────────────────────────────────────────────────────

/**
 * Returns a NEW RegExp instance (always with 'g' flag) for a given rule,
 * or null if the rule is invalid.
 */
function buildRegex(rule) {
  try {
    switch (rule.type) {
      case 'cjk-extra-space':
        // One or more half-width spaces between two CJK characters
        // Uses lookbehind/lookahead so only the space(s) are highlighted
        return /(?<=[\u4e00-\u9fff\u3400-\u4dbf\uff00-\uffef\u3000-\u303f]) +(?=[\u4e00-\u9fff\u3400-\u4dbf\uff00-\uffef\u3000-\u303f])/g;

      case 'cjk-missing-space':
        // Boundary between a CJK ideograph and an ASCII letter/digit with no space.
        // Only pure CJK ideograph ranges are included — symbols and punctuation
        // (e.g. ！？。、 in \u3000-\u303f / \uff00-\uffef) are intentionally excluded
        // because it is acceptable to write "：2025" or "（iOS）" without spaces.
        return /([\u4e00-\u9fff\u3400-\u4dbf][A-Za-z0-9])|([A-Za-z0-9][\u4e00-\u9fff\u3400-\u4dbf])/g;

      case 'keyword':
        return new RegExp(escapeRegex(rule.pattern), 'g');

      case 'regex':
        // Strip any 'g' flag supplied by the user, then re-add it
        return new RegExp(rule.pattern, 'g');

      default:
        console.warn(`[TextLint] 未知規則類型: ${rule.type}`);
        return null;
    }
  } catch (e) {
    console.warn(`[TextLint] 規則 "${rule.name}" regex 編譯失敗:`, e.message);
    return null;
  }
}

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// ─── Text node collection ─────────────────────────────────────────────────────

function collectTextNodes(root) {
  const nodes = [];
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const el = node.parentElement;
      if (!el) return NodeFilter.FILTER_REJECT;
      if (SKIP_TAGS.has(el.tagName)) return NodeFilter.FILTER_REJECT;
      // Skip nodes already inside our own highlight spans
      if (el.classList.contains(HIGHLIGHT_CLASS)) return NodeFilter.FILTER_REJECT;
      // Skip invisible nodes
      const style = getComputedStyle(el);
      if (style.display === 'none' || style.visibility === 'hidden') {
        return NodeFilter.FILTER_REJECT;
      }
      if (!node.textContent.trim()) return NodeFilter.FILTER_SKIP;
      return NodeFilter.FILTER_ACCEPT;
    },
  });

  let n;
  while ((n = walker.nextNode())) nodes.push(n);
  return nodes;
}

// ─── Highlighting logic ───────────────────────────────────────────────────────

/**
 * Apply all rules to the current page and return the total match count.
 */
function applyHighlights(rules) {
  clearHighlights();

  const textNodes = collectTextNodes(document.body);
  let totalCount = 0;

  for (const textNode of textNodes) {
    const text = textNode.textContent;

    // Collect all matches across all rules for this text node
    const matches = [];
    for (const rule of rules) {
      const regex = buildRegex(rule);
      if (!regex) continue;

      let m;
      while ((m = regex.exec(text)) !== null && matches.length < MAX_MATCHES_PER_NODE) {
        // Guard against zero-length matches causing infinite loops
        if (m[0].length === 0) {
          regex.lastIndex++;
          continue;
        }
        matches.push({
          start: m.index,
          end:   m.index + m[0].length,
          text:  m[0],
          color: rule.color,
          name:  rule.name,
        });
      }
    }

    if (matches.length === 0) continue;

    // Sort by start position; resolve overlaps (first match wins)
    matches.sort((a, b) => a.start - b.start || b.end - a.end);
    const resolved = [];
    let lastEnd = 0;
    for (const m of matches) {
      if (m.start >= lastEnd) {
        resolved.push(m);
        lastEnd = m.end;
      }
    }

    totalCount += resolved.length;

    // Build a DocumentFragment replacing the text node
    const fragment = document.createDocumentFragment();
    let pos = 0;
    for (const m of resolved) {
      if (m.start > pos) {
        fragment.appendChild(document.createTextNode(text.slice(pos, m.start)));
      }
      const span = document.createElement('span');
      span.className = HIGHLIGHT_CLASS;
      span.style.backgroundColor = m.color;
      span.style.color = '#000';
      span.style.borderRadius = '2px';
      span.style.padding = '0 1px';
      span.style.outline = '1px solid rgba(0,0,0,0.15)';
      span.title    = `規則：${m.name}`;
      span.setAttribute('data-tl-rule', m.name);
      span.textContent = m.text;
      fragment.appendChild(span);
      pos = m.end;
    }
    if (pos < text.length) {
      fragment.appendChild(document.createTextNode(text.slice(pos)));
    }

    textNode.parentNode.replaceChild(fragment, textNode);
  }

  return totalCount;
}

// ─── Clear highlights ─────────────────────────────────────────────────────────

function clearHighlights() {
  const spans = document.querySelectorAll(`span.${HIGHLIGHT_CLASS}`);
  for (const span of spans) {
    const parent = span.parentNode;
    parent.replaceChild(document.createTextNode(span.textContent), span);
    parent.normalize(); // merge adjacent text nodes
  }
}

// ─── Message listener ─────────────────────────────────────────────────────────

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (sender.id !== chrome.runtime.id) return;
  if (message.action === 'run') {
    if (!Array.isArray(message.rules)) { sendResponse({ count: 0 }); return true; }
    const count = applyHighlights(message.rules);
    sendResponse({ count });
  } else if (message.action === 'clear') {
    clearHighlights();
    sendResponse({ ok: true });
  }
  // Return true to indicate we may respond asynchronously (though we don't here,
  // some browsers require this for reliable message passing).
  return true;
});

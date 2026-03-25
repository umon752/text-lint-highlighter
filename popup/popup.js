// ─── Constants ──────────────────────────────────────────────────────────────

const STORAGE_KEY = 'tl_rules';

const RULE_TYPE_LABELS = {
  'cjk-extra-space':   '中文間多餘空格',
  'cjk-missing-space': '中英文缺少空格',
  'keyword':           '關鍵字',
  'regex':             'Regex',
};

// Default rules shown on first install
const DEFAULT_RULES = [
  {
    id: 'builtin-extra-space',
    name: '中文間多餘空格',
    type: 'cjk-extra-space',
    pattern: '',
    color: '#F58F5F',
    enabled: true,
  },
  {
    id: 'builtin-missing-space',
    name: '中英文缺少空格',
    type: 'cjk-missing-space',
    pattern: '',
    color: '#ffe693',
    enabled: true,
  },
];

// ─── Storage ─────────────────────────────────────────────────────────────────

async function loadRules() {
  return new Promise((resolve) => {
    chrome.storage.sync.get(STORAGE_KEY, (data) => {
      if (data[STORAGE_KEY] === undefined) {
        // First launch: save and return defaults
        chrome.storage.sync.set({ [STORAGE_KEY]: DEFAULT_RULES });
        resolve([...DEFAULT_RULES]);
      } else {
        resolve(data[STORAGE_KEY]);
      }
    });
  });
}

async function saveRules(rules) {
  return new Promise((resolve) => {
    chrome.storage.sync.set({ [STORAGE_KEY]: rules }, resolve);
  });
}

// ─── Render ──────────────────────────────────────────────────────────────────

function renderRules(rules) {
  const list   = document.getElementById('rules-list');
  const hint   = document.getElementById('empty-hint');
  list.innerHTML = '';

  if (rules.length === 0) {
    hint.classList.remove('hidden');
    return;
  }
  hint.classList.add('hidden');

  rules.forEach((rule) => {
    const li = document.createElement('li');
    li.className = `rule-item${rule.enabled ? '' : ' disabled'}`;
    li.dataset.id = rule.id;

    li.innerHTML = `
      <span class="rule-color-dot" style="background:${rule.color}"></span>
      <div class="rule-info">
        <div class="rule-name">${escapeHtml(rule.name)}</div>
        <span class="rule-type-badge">${RULE_TYPE_LABELS[rule.type] ?? rule.type}</span>
      </div>
      <div class="rule-actions">
        <input type="checkbox" class="rule-toggle" title="啟用 / 停用" ${rule.enabled ? 'checked' : ''}>
        <button class="btn-icon btn-edit" title="編輯"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg></button>
        <button class="btn-icon danger btn-delete" title="刪除"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg></button>
      </div>
    `;

    li.querySelector('.rule-toggle').addEventListener('change', async (e) => {
      rule.enabled = e.target.checked;
      li.classList.toggle('disabled', !rule.enabled);
      await saveRules(rules);
    });

    li.querySelector('.btn-edit').addEventListener('click', () => openForm(rule, rules));
    li.querySelector('.btn-delete').addEventListener('click', async () => {
      if (confirm(`確定刪除規則「${rule.name}」？`)) {
        const idx = rules.findIndex((r) => r.id === rule.id);
        if (idx !== -1) rules.splice(idx, 1);
        await saveRules(rules);
        renderRules(rules);
      }
    });

    list.appendChild(li);
  });
}

// ─── Form ─────────────────────────────────────────────────────────────────────

function openForm(existing, rules) {
  const overlay    = document.getElementById('rule-form-overlay');
  const formTitle  = document.getElementById('form-title');
  const idInput    = document.getElementById('rule-id');
  const nameInput  = document.getElementById('rule-name');
  const typeSelect = document.getElementById('rule-type');
  const patternInput = document.getElementById('rule-pattern');
  const colorInput = document.getElementById('rule-color');

  formTitle.textContent = existing ? '編輯規則' : '新增規則';
  idInput.value      = existing?.id ?? '';
  nameInput.value    = existing?.name ?? '';
  typeSelect.value   = existing?.type ?? 'cjk-extra-space';
  patternInput.value = existing?.pattern ?? '';
  colorInput.value   = existing?.color ?? '#586BA5';

  updatePatternGroup(typeSelect.value);
  syncColorPresets(colorInput.value);
  clearFormErrors();

  overlay.classList.remove('hidden');
  nameInput.focus();
}

function closeForm() {
  document.getElementById('rule-form-overlay').classList.add('hidden');
  document.getElementById('rule-form').reset();
  clearFormErrors();
}

function updatePatternGroup(type) {
  const group   = document.getElementById('pattern-group');
  const label   = document.getElementById('pattern-label');
  const hint    = document.getElementById('pattern-hint');
  const input   = document.getElementById('rule-pattern');

  const needsPattern = type === 'keyword' || type === 'regex';
  group.classList.toggle('hidden', !needsPattern);

  if (type === 'regex') {
    label.textContent = '正規表達式（Regex）';
    hint.textContent  = '例如：\\d{4}-\\d{2}-\\d{2}（日期格式）';
    input.placeholder = '輸入正規表達式';
  } else {
    label.textContent = '比對文字';
    hint.textContent  = '完全相符的文字片段';
    input.placeholder = '輸入要比對的文字';
  }
}

function syncColorPresets(hex) {
  document.querySelectorAll('.color-preset').forEach((btn) => {
    btn.classList.toggle('selected', btn.dataset.color === hex);
  });
}

function clearFormErrors() {
  document.getElementById('rule-name').classList.remove('error');
  document.getElementById('rule-pattern').classList.remove('error');
  const hint = document.getElementById('pattern-hint');
  hint.classList.remove('error');
  hint.textContent = '';
}

function validateForm(name, type, pattern) {
  clearFormErrors();
  let valid = true;

  if (!name.trim()) {
    document.getElementById('rule-name').classList.add('error');
    valid = false;
  }

  if ((type === 'keyword' || type === 'regex') && !pattern.trim()) {
    document.getElementById('rule-pattern').classList.add('error');
    const hint = document.getElementById('pattern-hint');
    hint.textContent = '此欄位為必填';
    hint.classList.add('error');
    valid = false;
  }

  if (type === 'regex' && pattern.trim()) {
    try {
      new RegExp(pattern);
    } catch {
      document.getElementById('rule-pattern').classList.add('error');
      const hint = document.getElementById('pattern-hint');
      hint.textContent = 'Regex 格式錯誤，請重新確認';
      hint.classList.add('error');
      valid = false;
    }
  }

  return valid;
}

// ─── Utilities ────────────────────────────────────────────────────────────────

function escapeHtml(str) {
  return str.replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c]));
}

function generateId() {
  return `rule_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
}

// ─── Tab Communication ────────────────────────────────────────────────────────

async function getActiveTab() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  return tab;
}

async function sendToTab(tab, message) {
  return new Promise((resolve) => {
    chrome.tabs.sendMessage(tab.id, message, (response) => {
      if (chrome.runtime.lastError) {
        console.warn('Content script not ready:', chrome.runtime.lastError.message);
        resolve(null);
      } else {
        resolve(response);
      }
    });
  });
}

// ─── Main ─────────────────────────────────────────────────────────────────────

(async () => {
  let rules = await loadRules();
  renderRules(rules);

  // ── Header buttons ──
  document.getElementById('btn-run').addEventListener('click', async () => {
    const tab      = await getActiveTab();
    const enabled  = rules.filter((r) => r.enabled);
    const banner   = document.getElementById('result-banner');

    if (enabled.length === 0) {
      banner.textContent = '⚠️ 沒有啟用的規則，請先啟用至少一條規則';
      banner.className   = 'result-banner has-results';
      return;
    }

    const response = await sendToTab(tab, { action: 'run', rules: enabled });
    banner.classList.remove('hidden');

    if (response === null) {
      banner.textContent = '⚠️ 無法連線至頁面，請重新整理後再試';
      banner.className   = 'result-banner has-results';
    } else if (response.count === 0) {
      banner.textContent = '✅ 未發現符合規則的文案';
      banner.className   = 'result-banner no-results';
    } else {
      banner.textContent = `🔍 找到 ${response.count} 處符合規則的文案`;
      banner.className   = 'result-banner has-results';
    }
  });

  document.getElementById('btn-clear').addEventListener('click', async () => {
    const tab = await getActiveTab();
    await sendToTab(tab, { action: 'clear' });
    const banner = document.getElementById('result-banner');
    banner.classList.add('hidden');
  });

  // ── Add rule button ──
  document.getElementById('btn-add').addEventListener('click', () => {
    openForm(null, rules);
  });

  // ── Rule type change ──
  document.getElementById('rule-type').addEventListener('change', (e) => {
    updatePatternGroup(e.target.value);
  });

  // ── Color presets ──
  document.querySelectorAll('.color-preset').forEach((btn) => {
    btn.addEventListener('click', () => {
      const color = btn.dataset.color;
      document.getElementById('rule-color').value = color;
      syncColorPresets(color);
    });
  });

  document.getElementById('rule-color').addEventListener('input', (e) => {
    syncColorPresets(e.target.value);
  });

  // ── Form submit ──
  document.getElementById('rule-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const id      = document.getElementById('rule-id').value;
    const name    = document.getElementById('rule-name').value.trim();
    const type    = document.getElementById('rule-type').value;
    const pattern = document.getElementById('rule-pattern').value.trim();
    const color   = document.getElementById('rule-color').value;

    if (!validateForm(name, type, pattern)) return;

    if (id) {
      // Edit existing
      const rule = rules.find((r) => r.id === id);
      if (rule) Object.assign(rule, { name, type, pattern, color });
    } else {
      // Add new
      rules.push({ id: generateId(), name, type, pattern, color, enabled: true });
    }

    await saveRules(rules);
    renderRules(rules);
    closeForm();
  });

  // ── Cancel / close overlay ──
  document.getElementById('btn-cancel').addEventListener('click', closeForm);
  document.getElementById('rule-form-overlay').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closeForm();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeForm();
  });
})();

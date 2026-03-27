## 1. manifest.json

- [x] 1.1 將 `content_scripts[0].matches` 從 `["<all_urls>"]` 改為 `["http://*/*", "https://*/*"]`，確保 content script match scope is restricted to web pages

## 2. content/content.js — 以個別 style 屬性取代 cssText 字串拼接

- [x] 2.1 移除 `span.style.cssText` 字串拼接，改用個別屬性賦值（`span.style.backgroundColor`、`span.style.color`、`span.style.borderRadius`、`span.style.padding`、`span.style.outline`），確保 rule.color is applied via DOM property, not string interpolation

## 3. content/content.js — 以 MAX_MATCHES_PER_NODE 限制 Regex 執行量

- [x] 3.1 在檔案頂部新增常數 `const MAX_MATCHES_PER_NODE = 500`
- [x] 3.2 在 `while ((m = regex.exec(text)) !== null)` 迴圈條件加入 `&& matches.length < MAX_MATCHES_PER_NODE`，確保 regex match count per text node is capped

## 4. content/content.js — 驗證 onMessage sender

- [x] 4.1 將 `_sender` 參數改為 `sender`，並在 listener 開頭加入 `if (sender.id !== chrome.runtime.id) return;`
- [x] 4.2 在 `action === 'run'` 分支加入 `if (!Array.isArray(message.rules)) { sendResponse({ count: 0 }); return true; }`，確保 onMessage listener validates sender identity

## 5. content/content.js — buildRegex 錯誤記錄

- [x] 5.1 在 `default:` 分支加入 `console.warn('[TextLint] 未知規則類型:', rule.type)` 後 `return null`
- [x] 5.2 將 `catch {}` 改為 `catch (e) { console.warn('[TextLint] 規則 regex 編譯失敗:', e.message); return null; }`，確保 buildRegex failures are logged with console.warn

## 6. popup/popup.js — 顏色注入防禦

- [x] 6.1 移除 `li.innerHTML` 模板中 `<span class="rule-color-dot">` 的 `style="background:${rule.color}"` 屬性
- [x] 6.2 在 `li.innerHTML` 賦值後，以 `li.querySelector('.rule-color-dot').style.backgroundColor = rule.color` 設定顏色，確保 color dot in popup rule list is set via property

## 7. popup/popup.js — validateRule() 在載入時過濾不合法規則

- [x] 7.1 在 `STORAGE_KEY` 宣告後新增 `const VALID_TYPES = new Set([...])` 與 `const COLOR_HEX_RE = /^#[0-9a-f]{6}$/i`
- [x] 7.2 新增 `validateRule(rule)` 函式，驗證 `id`、`name`、`type`（白名單）、`color`（hex 格式）、`pattern`、`enabled` 六個欄位
- [x] 7.3 在 `loadRules()` 中，將 `resolve(data[STORAGE_KEY])` 改為先檢查是否為陣列，再以 `filter(validateRule)` 過濾，確保 rules loaded from storage are schema-validated

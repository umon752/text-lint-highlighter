## Why

Extension 的多處程式碼直接信任來自 Storage、Content Script 訊息的未驗證輸入，並將資料不當地注入 CSS 或 DOM，造成潛在的 CSS Injection、ReDoS、及靜默失敗等資安風險。本次修改在不改動任何功能的前提下，補足這些防禦層。

## What Changes

- `manifest.json`：將 content script 注入範圍從 `<all_urls>` 縮限為 `http://*/*` 與 `https://*/*`，排除 `file://`、`about:` 等敏感頁面
- `content/content.js`：
  - 新增 `MAX_MATCHES_PER_NODE = 500` 上限，防止惡意或複雜 Regex 造成瀏覽器凍結（ReDoS）
  - 以個別 `style` 屬性設定取代 `span.style.cssText` 字串拼接，避免 CSS Injection
  - `onMessage` listener 加入 `sender.id` 驗證，以及 `Array.isArray(message.rules)` 型別檢查
  - `buildRegex()` 的 `catch` 區塊補上 `console.warn`，未知 `rule.type` 同樣警告
- `popup/popup.js`：
  - 新增 `validateRule()` schema 驗證函式（欄位型別、`type` 白名單、color hex 格式）
  - `loadRules()` 載入後過濾不合法規則，並處理 Storage 回傳非陣列的邊界情況
  - 移除 `li.innerHTML` 模板中的 `style="background:${rule.color}"`，改用 `.style.backgroundColor` 屬性賦值

## Non-Goals

- 不引入第三方套件或建置工具
- 不修改任何 UI 行為、視覺樣式或使用者流程
- 不對 `keyword` / `regex` 規則執行語意層面的內容審查

## Capabilities

### New Capabilities

- `extension-input-validation`: Extension 對 Storage 載入資料與 Content Script 訊息進行 schema 驗證與型別防衛

### Modified Capabilities

（無 spec 層級的行為變更）

## Impact

- 受影響程式碼：`manifest.json`、`content/content.js`、`popup/popup.js`

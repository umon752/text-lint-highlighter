## Context

Extension 在多個位置直接信任外部來源（chrome.storage.sync、chrome.runtime.onMessage）的資料，並將資料未驗證地注入 CSS 或 DOM。此次修改不變動任何功能，僅在現有流程中加入防禦層。

受影響模組：`manifest.json`、`content/content.js`、`popup/popup.js`。

## Goals / Non-Goals

**Goals:**

- 消除 CSS Injection 向量（rule.color 注入 style）
- 限制使用者自訂 Regex 造成的 ReDoS 風險
- 驗證 chrome.storage.sync 回傳資料的 schema
- 驗證 onMessage sender 身份與訊息結構

**Non-Goals:**

- 不引入任何建置工具或第三方套件
- 不修改 UI 行為或視覺樣式
- 不對 regex 做語意安全性分析（例如禁止特定模式）

## Decisions

### 以個別 style 屬性取代 cssText 字串拼接

在 `content.js` 中，以 `span.style.backgroundColor = m.color` 等個別屬性賦值取代 `` `background-color:${m.color}` `` 字串拼接到 `cssText`。

**替代方案**：對 color 字串做 escape。  
**選擇理由**：直接使用 DOM property 賦值，瀏覽器引擎會自行處理值的合法性，不需依賴手動 escape 的正確性。

同理，在 `popup.js` 中以 `.style.backgroundColor` 取代 `innerHTML` 模板中的 `style="background:${rule.color}"`。

### 以 MAX_MATCHES_PER_NODE 限制 Regex 執行量

在 `content.js` 中新增常數 `MAX_MATCHES_PER_NODE = 500`，在每個 text node 的 match 累積數量達上限時中止迴圈。

**替代方案**：使用 Web Worker 加 timeout 做沙盒執行。  
**選擇理由**：Extension 環境中啟動 Worker 需要額外的 manifest 配置與複雜度，而單 node 500 個 match 已大幅超過正常使用情境，足以防止凍結，實作成本最低。

### validateRule() 在載入時過濾不合法規則

在 `popup.js` 新增 `validateRule()` 函式，對每筆從 Storage 載入的規則進行：欄位型別檢查、`type` 白名單（4 個合法值）、`color` hex 格式（`/^#[0-9a-f]{6}$/i`）。

**替代方案**：使用 JSON Schema 驗證套件。  
**選擇理由**：規則結構簡單固定，手寫驗證無需引入依賴。

### 驗證 onMessage sender

在 `content.js` 的 `onMessage` listener 加入 `sender.id !== chrome.runtime.id` 檢查，確保訊息僅來自本 extension。同時檢查 `Array.isArray(message.rules)`，防止非預期型別造成迭代錯誤。

**替代方案**：信任 MV3 架構本身的隔離。  
**選擇理由**：Defence-in-depth 原則，明確拒絕非預期 sender 比依賴隱性保護更可靠。

## Risks / Trade-offs

- **`MAX_MATCHES_PER_NODE = 500`**：極少數頁面若在單一 text node 內有超過 500 個命中，結果會被截斷但不報錯。→ 接受此 trade-off，正常使用情境下不會觸發。
- **`validateRule()` 過濾**：Storage 資料若因版本差異而格式不符，規則會被靜默丟棄。→ 目前無版本遷移需求，可接受；未來版本升級時需補遷移邏輯。

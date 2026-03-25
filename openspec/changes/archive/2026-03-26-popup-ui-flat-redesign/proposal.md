## Why

Neumorphism 風格在多次迭代後確認不適合此 Chrome Extension 的實際使用情境（陰影過重、可讀性不足），最終採用以 Shopify Polaris 為靈感的扁平簡潔風格。既有的 neumorphism 相關規格已不反映現況，需以新規格取代。

## What Changes

- **BREAKING** 移除 `neumorphism-design-tokens`：雙層陰影設計標記系統全數廢棄
- **BREAKING** 移除 `popup-neumorphism-style`：所有 Neumorphism 互動狀態規格廢棄
- 新增 `flat-design-tokens`：以純白底、淺灰表面、橘色 accent 為核心的扁平設計標記系統
- 新增 `popup-flat-style`：Popup 所有元件改為扁平 Shopify 風格，包含卡片、按鈕、Toggle、輸入框、Modal
- 字體統一改為 Noto Sans TC，移除 Fraunces 與 DM Sans
- `body` `min-height` 固定為 `384px`

## Capabilities

### New Capabilities

- `flat-design-tokens`：定義扁平風格所需的 CSS 自訂屬性，包含背景色、表面色、邊框色、accent（橘色）、字色層級、圓角、陰影層級
- `popup-flat-style`：Popup 所有可視元件（規則列表項目、按鈕、Toggle、輸入框、Select、Modal、Icon Button）套用扁平 Shopify 風格，以及字體與 body 尺寸規格

### Modified Capabilities

- `neumorphism-design-tokens`：**完全取代** → 雙層陰影系統廢棄，改由 `flat-design-tokens` 提供設計標記
- `popup-neumorphism-style`：**完全取代** → Neumorphism 互動狀態廢棄，改由 `popup-flat-style` 定義元件行為

## Impact

- Affected specs: `flat-design-tokens`（新）、`popup-flat-style`（新）、`neumorphism-design-tokens`（廢棄）、`popup-neumorphism-style`（廢棄）
- Affected code:
  - `popup/popup.css`（主要修改：全設計標記、全元件樣式）
  - `popup/popup.html`（Google Fonts import 改為 Noto Sans TC）
  - `popup/popup.js`（edit/delete icon 由 emoji 換為 SVG 線條）

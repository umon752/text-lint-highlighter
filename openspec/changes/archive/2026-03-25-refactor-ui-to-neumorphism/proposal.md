## Why

目前 Popup 介面採用傳統平面（Flat）設計風格，視覺層次依賴邊框與背景色差。為提升整體質感與一致的觸覺互動感，將 UI 重構為 Neumorphism（軟擬物）風格——以雙層陰影（亮面＋暗面）替代邊框，hover 呈現微浮起、active 呈現內凹（pressed），維持白色系基調，確保可讀性與可維護性。

## What Changes

- 以 CSS 自訂屬性（Custom Properties）集中管理 Neumorphism 陰影、背景與互動狀態的設計標記
- 移除所有元件上的 `border: 1px solid` 邊框，改用雙層 `box-shadow`（外凸陰影）
- 按鈕 hover 狀態：陰影加深，呈現微浮起效果
- 按鈕 active / pressed 狀態：改用內凹陰影（`inset box-shadow`）
- 輸入框、select、modal 卡片、規則項目一律套用統一的 Neumorphism 陰影規則
- 禁止使用純黑（`#000`）或過高對比陰影；陰影色值需從主背景色衍生
- 整體背景維持白色系（接近 `#e8e8e8` 的淺灰白），確保陰影效果清晰可見

## Capabilities

### New Capabilities

- `neumorphism-design-tokens`：定義 Neumorphism 所需的 CSS 自訂屬性，包含背景基準色、亮面陰影色、暗面陰影色，以及外凸（raised）、內凹（inset）陰影的共用公式
- `popup-neumorphism-style`：將 Popup 所有可視元件（按鈕、規則列表項目、輸入框、select、modal 卡片、切換開關）重構為 Neumorphism 視覺風格，套用統一的互動狀態（hover 浮起、active 內凹）

### Modified Capabilities

(none)

## Impact

- Affected specs: `neumorphism-design-tokens`、`popup-neumorphism-style`（皆為新規格）
- Affected code:
  - `popup/popup.css`（主要修改：Design Tokens、所有元件樣式）
  - `popup/popup.html`（若需調整 class 名稱或 DOM 結構）

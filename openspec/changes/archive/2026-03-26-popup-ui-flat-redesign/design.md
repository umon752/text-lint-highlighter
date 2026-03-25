## Context

Text Lint Highlighter 是 Chrome Extension（Manifest V3），UI 完全由 `popup/popup.css` 定義。前一次變更（`refactor-ui-to-neumorphism`）將介面改為 Neumorphism 風格，但在實際使用測試後發現：陰影過重導致可讀性下降、白色系底色在低亮度螢幕上陰影幾乎不可見、與一般使用者預期的「擴充功能介面」視覺語彙不符。

因此進行第二次 UI 重構，改以 Shopify Polaris 設計系統為靈感，採用純白背景、淺灰卡片、清晰邊框的扁平現代風格，並統一字體為 Noto Sans TC。

## Goals / Non-Goals

**Goals:**

- 以 `--bg: #ffffff`（純白）為背景基準，以 `--surface: #f6f6f7`（淺灰）為元件表面
- 移除所有 neumorphism 相關 CSS 自訂屬性（`--neu-*`）
- 建立輕量陰影體系（`--shadow-xs/sm/lg`）取代雙層陰影
- 統一字體為 Noto Sans TC，移除 Fraunces 與 DM Sans 的 Google Fonts import
- `body` `min-height` 設定為 `384px`
- 以 Inline SVG 取代 emoji icon，確保跨平台顯示一致性
- 不修改任何 JavaScript 邏輯

**Non-Goals:**

- 暗色模式
- 動畫系統重構
- Content Script highlight 樣式調整
- 響應式排版（Popup 固定寬度 380px）

## Decisions

### 設計標記系統由 Neumorphism 改為扁平（flat-design-tokens）

**決策**：移除所有 `--neu-*` 自訂屬性，改以語意化命名的扁平設計標記取代：
- `--bg`（純白背景）、`--surface`（淺灰元件底）、`--surface-2`（更深灰，用於 hover）
- `--border`（低透明度黑，用於細線）、`--border-strong`（稍強邊框）
- `--shadow-xs/sm/lg`（單層 drop-shadow，替代雙層 neumorphism）

替代方案：保留部分 neumorphism 陰影變數 → 捨棄，混用兩套系統會造成維護負擔。

### 圓角系統縮小（radius 語意保留）

**決策**：維持 `--radius-sm/radius/radius-lg` 命名，但數值改為 `8px / 10px / 12px`，符合 Shopify Polaris 的視覺比例，不再使用 99px pill 形狀（僅 Toggle 保留 99px）。

### 字體全換為 Noto Sans TC

**決策**：HTML 中 Google Fonts import 由 Fraunces + DM Sans 改為 Noto Sans TC（400/500/600/700）。CSS 中所有 `font-family` 一律改為 `'Noto Sans TC', -apple-system, sans-serif`。

### Icon 由 emoji 改為 Inline SVG

**決策**：`popup.js` 中的 ✏️ 和 🗑 emoji 改為 Feather 風格的 Inline SVG（stroke 線條，`stroke-width: 1.8`），確保在所有作業系統上顯示一致且符合設計風格。

### Toggle 選中態改為深色（near-black）

**決策**：Toggle 選中時背景改為 `--surface-active: #1a1a1a`，而非橘色 accent，以符合 Shopify 風格的中性操作元素規範。

## Risks / Trade-offs

- **[Risk] Google Fonts 網路請求** → Noto Sans TC 是大型字體，首次載入需要網路。緩解：`display=swap` 確保字體載入失敗時降級為系統字體，不影響功能。
- **[Risk] Inline SVG 長度增加 HTML 字串** → `renderRules` 中每個規則項目都包含兩個 SVG，可能使 DOM 稍大。緩解：SVG 路徑短，對 DOM 大小影響可忽略。

## Migration Plan

1. 更新 `popup/popup.html`：替換 Google Fonts import
2. 全量替換 `popup/popup.css`：移除舊標記，寫入新設計標記與元件樣式
3. 更新 `popup/popup.js`：替換 emoji icon 為 Inline SVG
4. Chrome Extension 開發者模式重新整理，目視驗證所有狀態
5. Rollback：Git revert 即可還原

## Open Questions

（無，實作已完成）

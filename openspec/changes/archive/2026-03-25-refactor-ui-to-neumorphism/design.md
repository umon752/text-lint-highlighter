## Context

Text Lint Highlighter 是一個 Chrome Extension（Manifest V3），主要 UI 為 `popup/popup.css` 所定義的 Popup 介面。目前採用 Flat 設計風格：以 OKLCH 色彩空間定義 Design Tokens、邊框線（`border: 1px solid`）劃分元件、淺色背景搭配少量陰影。

本次重構目標是在不修改任何 JavaScript 邏輯的前提下，將 CSS 改為 Neumorphism 風格。Neumorphism 的核心是：元件與背景同色，以雙層陰影（一亮一暗）模擬凸起或凹陷的立體感。

## Goals / Non-Goals

**Goals:**

- 以雙層 `box-shadow`（亮面 + 暗面）取代所有元件邊框
- 定義集中式 CSS 自訂屬性，管理背景基準色、陰影偏移量與模糊半徑
- 實作三種互動狀態：預設（raised）、hover（微浮起）、active/pressed（inset 內凹）
- 保持白色系基調（背景 `#e0e5ec` 左右的淺灰白）
- 不改動任何 `popup.js` 或 `content.js` 邏輯
- 不變更任何 HTML 結構與 class 命名（或僅最小程度調整）

**Non-Goals:**

- 暗色模式（Dark Mode）支援
- 動畫大幅改寫（僅調整現有 transition 時間）
- Content Script 高亮樣式調整
- Icons 替換

## Decisions

### 背景基準色與陰影色衍生策略

Neumorphism 的陰影必須從背景色衍生，不可使用純黑或純白。

**決策**：採用固定 OKLCH 數值定義背景（`--neu-bg: oklch(91% 0.008 55)`），亮面陰影取更亮的同色（`--neu-shadow-light`），暗面陰影取更暗的同色（--neu-shadow-dark`）。所有元件的 `box-shadow` 均引用這兩個變數，確保換色時只需修改三個根變數即可全局更新。

替代方案：使用 `color-mix()` 動態衍生——被捨棄，原因是部分 Chromium 版本對 `color-mix()` 在 `box-shadow` 中的支援度仍需確認。

### 陰影公式標準化

**決策**：定義三組 CSS 自訂屬性代表三種陰影層級：

- `--neu-shadow-raised`：元件預設凸起（外部雙層陰影）
- `--neu-shadow-raised-hover`：hover 凸起更強
- `--neu-shadow-inset`：active/pressed 內凹（inset 雙層陰影）

所有元件直接套用這些變數，避免重複撰寫 `box-shadow` 數值。

### 移除邊框的方式

**決策**：將所有 `border: 1px solid var(--border)` 設為 `border: none`，改由 `box-shadow` 提供視覺輪廓。Focus 狀態的 ring 保留 `outline` 或外層 `box-shadow` 擴展，確保可及性。

### Toggle Switch 的 Neumorphism 處理

Toggle Switch 因為本身就是「凹槽 + 圓形把手」的形式，天然適合 Neumorphism：軌道使用 `inset` 陰影，圓形把手（`::after`）使用 `raised` 陰影。

### Modal Overlay 與背景模糊保留

Modal 的半透明 overlay 與 `backdrop-filter: blur` 保留不變，因為這是使用者聚焦體驗的一部分，與 Neumorphism 設計原則不衝突。

## Risks / Trade-offs

- **[Risk] Chrome Extension Popup 寬度限制（380px）** → Neumorphism 陰影在小尺寸元件上可能顯得擁擠。緩解：縮短陰影偏移量（`4–6px` 而非 `8–12px`），採用較小的模糊半徑。
- **[Risk] 低對比度問題** → Neumorphism 的白色系可能在低亮度螢幕上難以辨識陰影。緩解：確保 `--neu-shadow-dark` 的 OKLCH 明度不高於 `72%`，亮面不低於 `98%`。
- **[Risk] 現有 OKLCH 顏色系統替換成本** → 現有 Design Tokens 已相當完善，改為 Neumorphism 需要大幅替換 `--bg`、`--surface`、`--border` 等變數的用途。緩解：保留舊變數名稱作為別名過渡，或一次性全量替換並透過 PR review 確認無遺漏。

## Migration Plan

1. 在 `:root` 新增 Neumorphism 專用自訂屬性（`--neu-*`）
2. 移除或覆寫舊的 `--bg`、`--surface`、`--border` 變數定義，統一指向新背景色
3. 逐元件替換：Header → Buttons → Rule Items → Form Inputs → Modal → Toggle
4. 在 Chrome Extension 的開發者模式下載入、目視驗證所有互動狀態
5. 無 rollback 機制需求（純 CSS 變更，Git revert 即可）

## Open Questions

- 是否需要為 `.btn-primary`（accent 色按鈕）保留彩色背景，或改為 Neumorphism 的純灰白加 accent 色文字？（建議保留彩色背景，以維持操作主按鈕的視覺優先度）

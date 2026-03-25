## 1. 設計標記（Design Tokens）

- [x] 1.1 定義 `--neu-bg` 作為 Neumorphism 背景基準色（Define Neumorphism base background color），於 `:root` 中集中宣告以完成 Centralize all shadow tokens in :root
- [x] 1.2 依照「背景基準色與陰影色衍生策略」定義 `--neu-shadow-light` 與 `--neu-shadow-dark`（Define Neumorphism shadow color tokens），確保不使用純黑或純白
- [x] 1.3 依照「陰影公式標準化」定義 `--neu-shadow-raised`（Define raised shadow token），偏移量 4–8px，模糊半徑 8–16px
- [x] 1.4 定義 `--neu-shadow-raised-hover`（Define raised hover shadow token），強度大於 `--neu-shadow-raised`
- [x] 1.5 定義 `--neu-shadow-inset`（Define inset (pressed) shadow token），使用 `inset` 關鍵字雙層陰影

## 2. 全局邊框移除

- [x] 2.1 依照「移除邊框的方式」，將 `.btn`、`.rule-item`、`.modal`、`input[type="text"]`、`select` 的 `border` 屬性設為 `none`（Remove all component borders in favor of shadows）

## 3. 按鈕元件

- [x] 3.1 `.btn` 預設狀態套用 `--neu-shadow-raised`（Apply raised shadow to resting components）
- [x] 3.2 `.btn:hover` 套用 `--neu-shadow-raised-hover`（Apply intensified raised shadow on hover），加入 `box-shadow` 的 CSS transition（Maintain shadow transitions）
- [x] 3.3 `.btn:active` 套用 `--neu-shadow-inset`（Apply inset shadow on active/pressed state），移除舊有 `transform: scale(0.96)`
- [x] 3.4 依照「Preserve accent color on primary button background」，保留 `.btn-primary` 的 accent 背景色，hover/active 套用可見的陰影效果

## 4. 規則列表項目

- [x] 4.1 `.rule-item` 預設狀態套用 `--neu-shadow-raised`（Apply raised shadow to resting components）
- [x] 4.2 `.rule-item:hover` 套用 `--neu-shadow-raised-hover`（Apply intensified raised shadow on hover），確保 transition 平滑（Maintain shadow transitions）

## 5. Toggle Switch

- [x] 5.1 依照「Toggle Switch 的 Neumorphism 處理」，`.rule-toggle` 軌道套用 `--neu-shadow-inset`（Toggle switch uses inset track and raised knob）
- [x] 5.2 `.rule-toggle::after` 圓形把手套用小尺寸 `--neu-shadow-raised`（Toggle switch uses inset track and raised knob）

## 6. 表單輸入元件

- [x] 6.1 `input[type="text"]` 與 `select` 預設狀態套用 `--neu-shadow-raised`（Apply raised shadow to resting components）
- [x] 6.2 `input[type="text"]:focus` 與 `select:focus` 改用 `--neu-shadow-inset`（Form inputs use inset shadow on focus），移除舊有 accent 色 `box-shadow` focus ring

## 7. Modal 卡片

- [x] 7.1 `.modal` 套用較強的 `--neu-shadow-raised`（Apply raised shadow to resting components）
- [x] 7.2 依照「Modal Overlay 與背景模糊保留」，`.overlay` 的半透明背景與 `backdrop-filter: blur` 保持不變

## 8. 圖示按鈕（Icon Button）與顏色預設按鈕

- [x] 8.1 `.btn-icon:active` 套用 `--neu-shadow-inset`（Apply inset shadow on active/pressed state）
- [x] 8.2 `.color-preset:active` 套用 `--neu-shadow-inset`（Apply inset shadow on active/pressed state）

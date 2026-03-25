## 1. 設計標記（flat-design-tokens）

- [x] 1.1 在 `:root` 定義 `--bg: #ffffff`（Define white base background token）並移除所有 `--neu-*` 自訂屬性；替換 neumorphism 的 Define Neumorphism base background color、Centralize all shadow tokens in :root（Centralize all design tokens in :root）
- [x] 1.2 定義 `--surface: #f6f6f7`、`--surface-2`、`--surface-hover`、`--surface-active: #1a1a1a`（Define light gray surface token）
- [x] 1.3 定義 `--accent: oklch(70% 0.20 47)` 橘色 accent 及相關 tint/hover（Define orange accent token）
- [x] 1.4 定義 `--ink` / `--ink-2` / `--ink-3` / `--ink-4` 四層字色（Define typographic ink tokens）
- [x] 1.5 定義 `--shadow-xs`、`--shadow-sm`、`--shadow-lg` 單層陰影（Define flat shadow tokens）；移除 Define raised shadow token、Define raised hover shadow token、Define inset (pressed) shadow token、Define Neumorphism shadow color tokens
- [x] 1.6 定義 `--radius-sm: 8px`、`--radius: 10px`、`--radius-lg: 12px`，圓角系統縮小（radius 語意保留）（Define border radius tokens）

## 2. HTML 字體與尺寸（popup-flat-style）

- [x] 2.1 更新 `popup/popup.html` Google Fonts import，字體全換為 Noto Sans TC（Font is Noto Sans TC throughout all components）
- [x] 2.2 設定 `body` `font-family: 'Noto Sans TC'`、`min-height: 384px`（Popup body uses Noto Sans TC and fixed min-height）

## 3. 元件樣式（popup-flat-style）

- [x] 3.1 Rule item 改為扁平淺灰卡片，hover 顯示邊框；移除 Apply raised shadow to resting components、Apply intensified raised shadow on hover、Remove all component borders in favor of shadows（Rule item renders as flat gray card）
- [x] 3.2 按鈕改為 8px 圓角，`.btn-primary` 使用 `--accent` 橘色背景；保留 Preserve accent color on primary button background（Buttons are rounded rectangles with orange primary）
- [x] 3.3 Toggle 選中態改為深色（near-black）`--surface-active`；移除 Toggle switch uses inset track and raised knob（Toggle switch uses dark selected state）
- [x] 3.4 輸入框 focus 改為橘色邊框＋focus ring；移除 Form inputs use inset shadow on focus；調整 Maintain shadow transitions 為 background/border 過渡（Form inputs use pill shape with focus ring）
- [x] 3.5 Modal 改為白底 + 細邊框 + `--shadow-lg`；移除 Apply inset shadow on active/pressed state（Modal uses white background with border and shadow）
- [x] 3.6 設計標記系統由 Neumorphism 改為扁平（flat-design-tokens），全面移除 `box-shadow` inset 互動狀態

## 4. Icon 更新（popup-flat-style）

- [x] 4.1 在 `popup/popup.js` 將 ✏️ 換為 SVG 鉛筆 icon（icon 由 emoji 改為 inline svg）（Edit and delete icons are SVG line icons）
- [x] 4.2 在 `popup/popup.js` 將 🗑 換為 SVG 垃圾桶 icon（icon 由 emoji 改為 inline svg）（Edit and delete icons are SVG line icons）


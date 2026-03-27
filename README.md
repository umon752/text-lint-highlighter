# 📝 Text Lint Highlighter

> 在任意網頁上根據自訂規則，即時 highlight 格式錯誤的文案。

---

## 檔案結構

```
text-lint-highlighter/
├── manifest.json          # MV3 設定，含 storage / activeTab 權限
├── popup/
│   ├── popup.html         # 規則列表 + 新增/編輯表單 UI
│   ├── popup.css          # 完整樣式（含 Modal 動畫、color preset、toggle switch）
│   └── popup.js           # CRUD 規則管理、chrome.storage.sync 儲存、觸發 content script
├── content/
│   └── content.js         # DOM TreeWalker 遍歷文字節點、多規則比對、highlight/清除
└── icons/
    ├── icon16.png
    ├── icon48.png
    └── icon128.png
```

---

## 核心功能

- **預載兩條內建規則**（中文間多餘空格、中英文缺少空格），各有獨立顏色
- **支援 4 種規則類型**：
  | 類型 | 說明 |
  |------|------|
  | 中文間多餘半形空格 | 偵測兩個漢字之間夾雜的半形空格 |
  | 中英文／數字間缺少空格 | 偵測漢字與英文字母或數字相鄰但無空格的位置（符號不在此列）|
  | 關鍵字比對 | 完全符合的文字片段 |
  | 自訂 Regex | 任意正規表達式 |
- **每條規則可獨立設定 highlight 顏色**（含快速色板 5 色）
- **執行檢查**後顯示命中數量；**清除**鍵一鍵移除所有 highlight
- **規則開關**：每條規則可單獨啟用／停用，不需刪除
- **規則以 `chrome.storage.sync` 儲存**，跨裝置同步

---

## 安裝方式

1. 打開 Chrome，前往 `chrome://extensions/`
2. 右上角開啟 **開發人員模式**
3. 點擊 **載入未封裝項目**
4. 選擇 `text-lint-highlighter/` 資料夾
5. 完成！點擊工具列上的擴充圖示即可開始使用

# 📊 ออกแบบระบบรองรับหลาย Sheets

## 🎯 วัตถุประสงค์

สร้างระบบที่:
1. **ดึงรายชื่อ sheets ทั้งหมด** จาก Google Spreadsheet อัตโนมัติ
2. **แสดง tab navigation** ให้เลือกดู sheet ต่างๆ
3. **Auto-detect columns** ในแต่ละ sheet
4. **แสดงข้อมูลแบบ dynamic** ตามโครงสร้างของแต่ละ sheet

---

## 📋 โครงสร้างที่คาดการณ์

จากไฟล์ Excel "งานทะเบียน.xlsx" น่าจะมีหลาย sheets เช่น:

### ตัวอย่าง Sheets ที่อาจมี:
1. **ทะเบียนหลัก** - รายการทะเบียนทั้งหมด
2. **ขาดอายุ** - ทะเบียนที่หมดอายุแล้ว
3. **วิกฤติ** - ทะเบียนที่ใกล้หมดอายุ (0-30 วัน)
4. **รายเดือน** - สรุปรายเดือน
5. **รายปี** - สรุปรายปี
6. **สถิติ** - ข้อมูลสถิติ
7. **หน่วยงาน** - แยกตามหน่วยงาน

---

## 🏗️ สถาปัตยกรรมระบบ

### 1. Service Layer

```javascript
// sheetMetadataService.js
- getAllSheets() → ดึงรายชื่อ sheets ทั้งหมด
- getSheetData(sheetName) → ดึงข้อมูลจาก sheet ที่ระบุ
- detectSheetType(sheetName, headers) → ตรวจสอบประเภทของ sheet
```

### 2. Components

```
App.jsx
├── Header
├── SheetSelector (Tab Navigation)
│   ├── Tab 1: ทะเบียนหลัก
│   ├── Tab 2: ขาดอายุ
│   ├── Tab 3: วิกฤติ
│   └── Tab N: ...
├── CurrentSheetView
│   ├── Dashboard (ถ้าเป็น sheet หลัก)
│   ├── SearchBar
│   └── DataTable/DataGrid (auto-adapt)
└── Footer
```

### 3. State Management

```javascript
const [sheets, setSheets] = useState([]); // รายชื่อ sheets
const [currentSheet, setCurrentSheet] = useState(null); // sheet ที่เลือก
const [sheetData, setSheetData] = useState({}); // ข้อมูลแต่ละ sheet
const [columnMapping, setColumnMapping] = useState({}); // column mapping
```

---

## 🎨 UI/UX Design

### Tab Navigation (แบบ Material Design)

```
┌─────────────────────────────────────────────────────────────┐
│  📋 ระบบจัดการทะเบียนผลิตภัณฑ์              [รีเฟรช]     │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  [ทะเบียนหลัก]  [ขาดอายุ]  [วิกฤติ]  [รายเดือน]  [สถิติ]  │
│   ──────────                                                  │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Dashboard / Content ของ Sheet ที่เลือก            │   │
│  │                                                        │   │
│  │  [ข้อมูลจาก Sheet นั้นๆ]                           │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### Responsive Design

**Desktop:**
- Tabs แนวนอน (Horizontal)
- Dashboard + Table แบบเต็ม

**Mobile:**
- Tabs แบบ Dropdown / Hamburger Menu
- Stacked layout

---

## 🔧 Features ของแต่ละ Sheet Type

### Type 1: Registration List (รายการทะเบียน)

**ลักษณะ:**
- มี columns: วันเหลือ, เลขทะเบียน, ชื่อการค้า, ฯลฯ
- มีข้อมูลหลายแถว

**แสดงผล:**
- Dashboard (สถิติ 5 การ์ด)
- Search bar
- Pagination table

**ตัวอย่าง Sheets:**
- ทะเบียนหลัก
- ขาดอายุ
- วิกฤติ
- ระวัง
- ปกติ

---

### Type 2: Summary Sheet (สรุปข้อมูล)

**ลักษณะ:**
- มี columns: เดือน/ปี, จำนวน, ยอดรวม
- ข้อมูลสรุปแบบกลุ่ม

**แสดงผล:**
- Chart/Graph (Bar chart, Line chart)
- Summary cards
- Table

**ตัวอย่าง Sheets:**
- รายเดือน
- รายปี
- สถิติ

---

### Type 3: Grouped Sheet (แยกกลุ่ม)

**ลักษณะ:**
- แยกตามหน่วยงาน/ประเภท
- มี sections หรือ categories

**แสดงผล:**
- Accordion/Collapsible sections
- Filter by group
- Grouped table

**ตัวอย่าง Sheets:**
- หน่วยงาน
- ประเภททะเบียน

---

### Type 4: Dashboard Sheet (ภาพรวม)

**ลักษณะ:**
- ข้อมูลสรุปภาพรวม
- KPIs, Metrics

**แสดงผล:**
- Large stat cards
- Mini charts
- Quick overview

---

## 🔄 การทำงานของระบบ

```
1. App Load
   ↓
2. Fetch Sheet Metadata (getAllSheets)
   → ได้รายชื่อ sheets: ["ทะเบียนหลัก", "ขาดอายุ", "วิกฤติ", ...]
   ↓
3. แสดง Tab Navigation
   ↓
4. User เลือก Tab (เช่น "ทะเบียนหลัก")
   ↓
5. Fetch Sheet Data (getSheetData("ทะเบียนหลัก"))
   ↓
6. Auto-detect Columns
   ↓
7. Detect Sheet Type
   ↓
8. แสดงผล Component ที่เหมาะสม
   ↓
9. User สามารถ:
   - Search
   - Filter
   - Export
   - Switch tabs
```

---

## 📦 ตัวอย่าง Code Structure

### 1. sheetMetadataService.js

```javascript
export const getAllSheets = async () => {
  const url = `${API_BASE_URL}/${SHEET_ID}?fields=sheets.properties&key=${API_KEY}`;
  const response = await axios.get(url);
  return response.data.sheets.map(s => ({
    id: s.properties.sheetId,
    name: s.properties.title,
    index: s.properties.index,
  }));
};

export const getSheetData = async (sheetName) => {
  const url = `${API_BASE_URL}/${SHEET_ID}/values/${sheetName}!A:Z?key=${API_KEY}`;
  const response = await axios.get(url);
  return response.data.values;
};
```

### 2. SheetSelector.jsx

```javascript
const SheetSelector = ({ sheets, current, onChange }) => {
  return (
    <div className="tabs">
      {sheets.map(sheet => (
        <button
          key={sheet.id}
          className={current === sheet.name ? 'active' : ''}
          onClick={() => onChange(sheet.name)}
        >
          {sheet.name}
        </button>
      ))}
    </div>
  );
};
```

### 3. DynamicSheetView.jsx

```javascript
const DynamicSheetView = ({ sheetName, data }) => {
  const type = detectSheetType(sheetName, data[0]);

  switch (type) {
    case 'registration':
      return <RegistrationTable data={data} />;
    case 'summary':
      return <SummaryView data={data} />;
    case 'dashboard':
      return <DashboardView data={data} />;
    default:
      return <GenericTable data={data} />;
  }
};
```

---

## 🎯 Sheet Type Detection

```javascript
const detectSheetType = (sheetName, headers) => {
  const name = sheetName.toLowerCase();

  // Registration sheets
  if (name.includes('ทะเบียน') || name.includes('reg')) {
    return 'registration';
  }

  // Summary sheets
  if (name.includes('สรุป') || name.includes('รายเดือน') || name.includes('รายปี')) {
    return 'summary';
  }

  // Stat sheets
  if (name.includes('สถิติ') || name.includes('stat')) {
    return 'statistics';
  }

  // Check columns
  if (headers.some(h => h.includes('วันเหลือ') || h.includes('เลขทะเบียน'))) {
    return 'registration';
  }

  return 'generic';
};
```

---

## 🎨 Color Coding แต่ละ Sheet

```javascript
const SHEET_COLORS = {
  'ทะเบียนหลัก': 'blue',
  'ขาดอายุ': 'red',
  'วิกฤติ': 'orange',
  'ระวัง': 'yellow',
  'ปกติ': 'green',
  'สถิติ': 'purple',
  'รายเดือน': 'indigo',
};
```

---

## 📱 Responsive Tabs

### Desktop:
```
[ทะเบียนหลัก] [ขาดอายุ] [วิกฤติ] [ระวัง] [ปกติ] [สถิติ]
```

### Tablet:
```
[ทะเบียนหลัก] [ขาดอายุ] [...More ▼]
```

### Mobile:
```
[ทะเบียนหลัก ▼]
  ├─ ขาดอายุ
  ├─ วิกฤติ
  ├─ ระวัง
  └─ ...
```

---

## 🔧 Configuration

### Environment Variables

```env
# Required
VITE_GOOGLE_SHEETS_API_KEY=AIzaSyCckaOEU3wxiebvoLey2yZhjmOrO0A9jcI
VITE_GOOGLE_SHEETS_SHEET_ID=1BvX6lFsf3HrDvlopXt7PiyccVNM6-G1fNTIge3A_u6Y

# Optional
VITE_DEFAULT_SHEET=ทะเบียนหลัก
VITE_ENABLE_SHEET_SELECTOR=true
VITE_MAX_SHEETS_DISPLAY=10
```

---

## 🚀 Implementation Plan

### Phase 1: Multi-Sheet Support (Core)
- [ ] Create sheetMetadataService
- [ ] Implement getAllSheets()
- [ ] Create SheetSelector component
- [ ] Update App.jsx for multi-sheet

### Phase 2: Dynamic Views
- [ ] Create DynamicSheetView component
- [ ] Implement sheet type detection
- [ ] Create view for each type
- [ ] Add transitions

### Phase 3: Enhanced Features
- [ ] Add sheet-level search
- [ ] Add export per sheet
- [ ] Add favorite sheets
- [ ] Add recent sheets history

### Phase 4: Advanced
- [ ] Add cross-sheet analytics
- [ ] Add sheet comparison
- [ ] Add data visualization
- [ ] Add custom dashboards

---

## ✅ Success Criteria

ระบบถือว่าสำเร็จเมื่อ:
- [ ] แสดง tabs ของทุก sheets
- [ ] สลับ tab ได้ราบรื่น
- [ ] Auto-detect columns ในทุก sheet
- [ ] แสดงข้อมูลถูกต้องในทุก sheet
- [ ] Responsive บนทุกอุปกรณ์
- [ ] Performance ดี (< 2s per sheet)

---

## 🔄 API Optimization

### Caching Strategy

```javascript
// Cache sheet metadata (1 hour)
const cachedSheets = {
  data: null,
  timestamp: null,
  ttl: 3600000, // 1 hour
};

// Cache sheet data (5 minutes per sheet)
const cachedSheetData = {
  'ทะเบียนหลัก': { data: null, timestamp: null },
  // ...
};
```

### Batch Loading

```javascript
// Load first sheet immediately
// Load other sheets in background
const loadSheets = async () => {
  const sheets = await getAllSheets();

  // Load first sheet
  await loadSheetData(sheets[0].name);

  // Background load others
  sheets.slice(1).forEach(sheet => {
    loadSheetData(sheet.name); // Don't await
  });
};
```

---

## 📊 Metrics to Track

- Time to first sheet load
- Time to switch sheets
- Number of API calls
- Cache hit rate
- User engagement per sheet

---

**ออกแบบโดย:** Claude Code
**วันที่:** 22 ตุลาคม 2025
**Version:** Multi-Sheet v1.0

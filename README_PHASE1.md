# FMGS Registration Management System - Phase 1

## ระบบจัดการทะเบียนผลิตภัณฑ์ครบวงจร

---

## 🎉 Phase 1 Complete! (Read-Only Version)

Version 2.0 - เปลี่ยนแปลงใหม่ทั้งหมด พร้อมระบบที่ทรงพลังกว่าเดิม!

### ✨ Features ที่ใช้งานได้แล้ว

#### 1. **Multi-Sheet Navigation** 📑
- แสดงข้อมูลจาก **14 sheets** พร้อมกัน
- **3,082 รายการ** ทั้งหมด
- สลับดู sheet ต่างๆ ได้ง่าย ด้วย tab navigation
- แสดงจำนวนรายการในแต่ละ sheet

#### 2. **Dashboard แบบ Real-time** 📊
- แสดงสถิติภาพรวม 5 กลุ่ม:
  - ✅ ทะเบียนทั้งหมด
  - 🔴 ขาดอายุ (Expired)
  - 🟠 วิกฤติ (0-30 วัน)
  - 🟡 ระวัง (31-90 วัน)
  - 🟢 ปกติ (>90 วัน)
- อัพเดทอัตโนมัติตามข้อมูล

#### 3. **Dynamic Table with TanStack Table** 📋
- ✅ Sorting (คลิกหัวตารางเพื่อเรียงลำดับ)
- ✅ Pagination (แบ่งหน้า 20 รายการต่อหน้า)
- ✅ Status Badge (แสดงสีตามสถานะ)
- ✅ Document Links (คลิกดูเอกสาร Google Drive)
- ✅ Auto-detect columns (รองรับทุก sheet แม้โครงสร้างต่างกัน)

#### 4. **Global Search** 🔍
- ค้นหาข้ามทุก sheet พร้อมกัน
- ค้นหาทุกฟิลด์ (เลขทะเบียน, ชื่อผลิตภัณฑ์, หน่วยงาน, ฯลฯ)
- แสดงผลลัพธ์พร้อม sheet ต้นทาง
- ไฮไลท์สถานะด้วยสี

#### 5. **Responsive Design** 📱
- ใช้งานได้ทุกอุปกรณ์
- Mobile / Tablet / Desktop
- UI สวยงาม ใช้งานง่าย

#### 6. **Smart Status Detection** 🎯
- วิเคราะห์วันหมดอายุอัตโนมัติ
- จัดกลุ่มตามความเร่งด่วน
- แสดงสีเตือนที่ชัดเจน

---

## 🛠️ Tech Stack

### Frontend
- **React 18.3** - UI Library
- **Vite 5** - Lightning-fast build tool
- **Tailwind CSS 3** - Utility-first CSS
- **React Router 6** - Client-side routing

### Data Management
- **TanStack Table v8** - Powerful data grid
- **TanStack Query v5** - Data fetching & caching
- **Zustand 4** - State management
- **Lucide React** - Beautiful icons

### Data Source
- **JSON Files** (converted from Excel)
- **3,082 records** across **14 sheets**
- Ready for Google Sheets API integration

---

## 📦 Data Structure

### Sheets Available

| Sheet Name | Records | Description |
|------------|---------|-------------|
| ทะเบียนหลัก | 546 | Main Registry |
| เครื่องหมายการค้า | 769 | Trademarks |
| กรมวิชาการเกษตร | 546 | Dept. of Agriculture |
| crop ของ เกษตร | 282 | Crop Data |
| ทะเบียนที่ได้รับแล้ว | 270 | Approved Registrations |
| กรมปศุสัตว์ | 262 | Livestock |
| ทะเบียนที่ได้รับแล้วO | 137 | Approved (Old) |
| อย | 130 | FDA |
| ปุ๋ย | 72 | Fertilizers |
| กรมประมง | 56 | Fisheries |
| รายชื่อกรม | 8 | Departments |
| อุตสาหกรรม | 4 | Industrial |

**Total: 3,082 records**

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone repository
git clone https://github.com/consdevs/fmgs-registration-doc-gov.git
cd fmgs-registration-doc-gov

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Development

```bash
# Start dev server
npm run dev
# Open http://localhost:5173/fmgs-registration-doc-gov/

# Build
npm run build

# Deploy to GitHub Pages
npm run deploy
```

---

## 📖 User Guide

### หน้าหลัก (Dashboard)
1. เห็นภาพรวมสถิติทั้งหมด
2. เลือก sheet ที่ต้องการดูจาก tabs
3. ดูข้อมูลในตารางด้านล่าง

### การค้นหา (Search)
1. พิมพ์คำค้นหาใน search bar ด้านบน
2. กด Enter หรือคลิกไอคอน search
3. ดูผลลัพธ์ที่พบจากทุก sheet

### การเรียงลำดับ (Sorting)
1. คลิกที่หัวตารางคอลัมน์ที่ต้องการเรียง
2. คลิกอีกครั้งเพื่อกลับลำดับ (asc/desc)

### การเปิดเอกสาร
1. คลิกลิงก์ "ดูเอกสาร" ในคอลัมน์ PCT
2. เปิดไฟล์ Google Drive ใน tab ใหม่

---

## 🎨 Status Colors

| สถานะ | สี | วันเหลือ | ความหมาย |
|-------|-----|----------|----------|
| 🔴 ขาดอายุ | Red | < 0 | หมดอายุแล้ว - ต้องดำเนินการด่วน |
| 🟠 วิกฤติ | Orange | 0-30 | ใกล้หมดอายุมาก - เตรียมต่ออายุ |
| 🟡 ระวัง | Yellow | 31-90 | ควรเตรียมการ |
| 🔵 ใกล้หมด | Blue | 91-180 | เริ่มติดตาม |
| 🟢 ปกติ | Green | >180 | ยังไม่ต้องดำเนินการ |

---

## 📂 Project Structure

```
fmgs-registration-doc-gov/
├── data/                    # JSON data (source)
│   ├── all-data.json        # All sheets combined
│   ├── metadata.json        # Sheet metadata
│   └── sheets/              # Individual sheet files
├── public/
│   └── data/                # Public JSON files (for app)
├── src/
│   ├── components/
│   │   ├── dashboard/       # Dashboard components
│   │   ├── layout/          # Layout components
│   │   └── sheets/          # Sheet-related components
│   ├── config/              # Configuration files
│   ├── pages/               # Page components
│   ├── services/            # Data services
│   ├── store/               # Zustand stores
│   ├── App.jsx              # Main app
│   └── main.jsx             # Entry point
├── docs/
│   ├── ARCHITECTURE_DESIGN.md
│   ├── GOOGLE_SHEETS_SHARING.md
│   └── TROUBLESHOOTING.md
└── package.json
```

---

## 🔄 Phase 2 Preview (Coming Soon)

Phase 2 จะเพิ่มความสามารถ:

### CRUD Operations
- ✅ Create - เพิ่มรายการใหม่
- ✅ Read - ดูข้อมูล (Phase 1 ✅ เสร็จแล้ว)
- ✅ Update - แก้ไขข้อมูล
- ✅ Delete - ลบข้อมูล

### Database Integration
- **Supabase** (PostgreSQL)
- Real-time sync
- Offline support (IndexedDB)
- Conflict resolution

### Advanced Features
- User authentication
- Role-based access control
- Data export (Excel, CSV, PDF)
- Advanced filters
- Bulk operations
- File attachments
- Email notifications

---

## 🐛 Known Issues & Limitations (Phase 1)

### Current Limitations:
1. **Read-Only** - ไม่สามารถแก้ไขข้อมูลได้ (รอ Phase 2)
2. **Static Data** - ใช้ JSON files (ไม่ได้เชื่อม Google Sheets API จริง)
3. **No Authentication** - เข้าถึงได้ทุกคน
4. **Limited Filters** - ยังไม่มี advanced filters

### Will be Fixed in Phase 2:
- ✅ CRUD operations
- ✅ Real-time sync with Supabase
- ✅ User authentication
- ✅ Advanced filters

---

## 📝 Changelog

### Version 2.0.0 (Phase 1) - 2025-10-22

#### 🎉 Complete Redesign
- ✅ Multi-sheet support (14 sheets, 3,082 records)
- ✅ Dynamic table with TanStack Table
- ✅ Global search
- ✅ Dashboard with statistics
- ✅ Responsive design
- ✅ Status-based color coding

#### 🛠️ Technical Improvements
- ✅ Upgraded to React 18
- ✅ Migrated to Vite 5
- ✅ Added TanStack Table & Query
- ✅ Added Zustand for state management
- ✅ Excel to JSON conversion
- ✅ Smart column detection

#### 📦 Data
- ✅ Processed 14 Excel sheets
- ✅ 3,082 records total
- ✅ Auto-detect column mapping
- ✅ Status calculation

---

## 👥 For Developers

### Adding New Sheets
1. Add Excel file to repository
2. Run conversion script (see `data/README.md`)
3. Update `SHEET_NAMES` in `src/config/constants.js`
4. Add display name to `SHEET_DISPLAY_NAMES`

### Customizing Columns
Edit `src/components/sheets/SheetTable.jsx`:
- Modify column rendering logic
- Add custom cell renderers
- Change column visibility

### Changing Status Rules
Edit `src/config/statusConfig.js`:
- Modify `getStatusCategory()` function
- Update status thresholds
- Change colors in `statusConfig`

### API Integration (Phase 2)
1. Update `src/services/dataService.js`
2. Add Google Sheets API calls
3. Add Supabase integration
4. Implement sync logic

---

## 📄 License

MIT License - See LICENSE file for details

---

## 🙏 Acknowledgments

- **Vite** - Next generation frontend tooling
- **TanStack** - Headless UI libraries
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide** - Beautiful open-source icons

---

## 📧 Support

For issues and questions:
1. Check documentation in `docs/` folder
2. Read TROUBLESHOOTING.md
3. Open GitHub issue

---

**Phase 1 Status: ✅ Complete**
**Phase 2 Status: 📋 Planned**

**Built with ❤️ by Claude AI Assistant**

Last Updated: 2025-10-22

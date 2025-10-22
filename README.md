# 📋 ระบบจัดการทะเบียนผลิตภัณฑ์

ระบบจัดการและติดตามทะเบียนผลิตภัณฑ์แบบเรียลไทม์ เชื่อมต่อกับ Google Sheets API

![React](https://img.shields.io/badge/React-18.3.1-blue)
![Vite](https://img.shields.io/badge/Vite-5.2.0-purple)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.1-cyan)
![License](https://img.shields.io/badge/License-MIT-green)

---

## 🌟 Features

- ✅ **Dashboard สรุปภาพรวม** - แสดงสถิติทะเบียนแบบเรียลไทม์
- ✅ **ค้นหาและกรอง** - ค้นหาเลขทะเบียนและชื่อการค้าได้อย่างรวดเร็ว
- ✅ **การแจ้งเตือนสถานะ** - แบ่งสถานะเป็น 4 ระดับ (ขาดอายุ, วิกฤติ, ระวัง, ปกติ)
- ✅ **Responsive Design** - ใช้งานได้บนทุกอุปกรณ์
- ✅ **Real-time Data** - ดึงข้อมูลจาก Google Sheets แบบทันที
- ✅ **Pagination** - แสดงข้อมูล 20 รายการต่อหน้า
- ✅ **Modern UI** - สวยงามด้วย Tailwind CSS

---

## 🎯 การแบ่งสถานะ

| สถานะ | เงื่อนไข | สี | Emoji |
|-------|---------|-----|-------|
| **ขาดอายุ** | วันเหลือ < 0 | 🔴 Red | 🔴 |
| **วิกฤติ** | 0 ≤ วันเหลือ ≤ 30 | 🟠 Orange | 🟠 |
| **ระวัง** | 31 ≤ วันเหลือ ≤ 90 | 🟡 Yellow | 🟡 |
| **ปกติ** | วันเหลือ > 90 | 🟢 Green | 🟢 |

---

## 📦 Tech Stack

- **Frontend Framework**: React 18.3.1
- **Build Tool**: Vite 5.2.0
- **CSS Framework**: Tailwind CSS 3.4.1
- **HTTP Client**: Axios 1.6.0
- **API**: Google Sheets API v4

---

## 📁 โครงสร้างโปรเจค

```
fmgs-registration-doc-gov/
├── public/
│   └── vite.svg                    # Vite logo
├── src/
│   ├── components/                 # React Components
│   │   ├── Dashboard.jsx           # แสดงสถิติภาพรวม
│   │   ├── RegistrationList.jsx    # ตารางรายการทะเบียน
│   │   ├── SearchBar.jsx           # ค้นหาและกรอง
│   │   ├── StatCard.jsx            # การ์ดสถิติ
│   │   ├── LoadingSpinner.jsx      # Loading indicator
│   │   └── ErrorMessage.jsx        # แสดง Error
│   ├── services/
│   │   └── googleSheetsService.js  # Service เชื่อม Google Sheets API
│   ├── config/
│   │   └── constants.js            # Constants และ config
│   ├── App.jsx                     # Main component
│   ├── main.jsx                    # Entry point
│   └── index.css                   # Global styles + Tailwind
├── .env.example                    # ตัวอย่าง environment variables
├── .gitignore
├── package.json
├── vite.config.js                  # Vite config สำหรับ GitHub Pages
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

---

## 🚀 Prerequisites

ก่อนเริ่มต้น ต้องมีสิ่งเหล่านี้ติดตั้งอยู่แล้ว:

- **Node.js** >= 16.0.0 ([ดาวน์โหลด](https://nodejs.org/))
- **npm** >= 8.0.0 (มากับ Node.js)
- **Git** ([ดาวน์โหลด](https://git-scm.com/))
- **Google Account** (สำหรับใช้ Google Sheets API)

---

## 📝 Google Sheets Setup
url google sheet: https://docs.google.com/spreadsheets/d/1BvX6lFsf3HrDvlopXt7PiyccVNM6-G1fNTIge3A_u6Y/edit?gid=1324719925#gid=1324719925
### 1. เตรียม Google Sheets

ข้อมูลใน Google Sheets ต้องมีโครงสร้างดังนี้:

**Sheet Name**: `ทะเบียนหลัก`

| Column | ชื่อคอลัมน์ | ประเภทข้อมูล | ตัวอย่าง |
|--------|------------|-------------|---------|
| A | จำนวนวันเหลือ | Number | 45 |
| B | สถานะทะเบียน | Text | ปกติ |
| C | รหัสทะเบียน | Text | REG-001 |
| D | เลขทะเบียน | Text | 12-1-00123-4-0001 |
| E | ชื่อการค้า | Text | ผลิตภัณฑ์ A |
| F | ประเภททะเบียน | Text | อาหาร |
| G | หน่วยงาน | Text | อย. |
| H | วันหมดอายุทะเบียน | Date | 01/03/2026 |

**URL ตัวอย่าง**:
```
https://docs.google.com/spreadsheets/d/1BvX6lFsf3HrDvlopXt7PiyccVNM6-G1fNTIge3A_u6Y/edit
```

### 2. สร้าง Google Sheets API Key

#### ขั้นตอนที่ 1: เปิด Google Cloud Console
1. ไปที่ [Google Cloud Console](https://console.cloud.google.com/)
2. เข้าสู่ระบบด้วย Google Account

#### ขั้นตอนที่ 2: สร้างโปรเจค
1. คลิก **Select a project** → **New Project**
2. ตั้งชื่อโปรเจค เช่น `Registration Management`
3. คลิก **Create**

#### ขั้นตอนที่ 3: เปิดใช้งาน Google Sheets API
1. ไปที่ **APIs & Services** → **Library**
2. ค้นหา `Google Sheets API`
3. คลิก **Enable**

#### ขั้นตอนที่ 4: สร้าง API Key
1. ไปที่ **APIs & Services** → **Credentials**
2. คลิก **Create Credentials** → **API Key**
3. คัดลอก API Key ที่ได้

#### ขั้นตอนที่ 5: จำกัดสิทธิ์ API Key (แนะนำ)
1. คลิกที่ API Key ที่สร้าง
2. ใน **API restrictions** เลือก **Restrict key**
3. เลือก **Google Sheets API**
4. คลิก **Save**

### 3. แชร์ Google Sheets
1. เปิด Google Sheets ที่ต้องการใช้งาน
2. คลิก **Share** → **Anyone with the link can view**
3. คัดลอก **Sheet ID** จาก URL

```
https://docs.google.com/spreadsheets/d/[SHEET_ID]/edit
                                        ^^^^^^^^
                                        คัดลอกส่วนนี้
```

---

## ⚙️ Installation

### 1. Clone โปรเจค

```bash
git clone https://github.com/consdevs/fmgs-registration-doc-gov.git
cd fmgs-registration-doc-gov
```

### 2. ติดตั้ง Dependencies

```bash
npm install
```

### 3. ตั้งค่า Environment Variables

สร้างไฟล์ `.env` ที่ root directory:

```bash
cp .env.example .env
```

แก้ไขไฟล์ `.env`:

```env
VITE_GOOGLE_SHEETS_API_KEY=your_api_key_here
VITE_GOOGLE_SHEETS_SHEET_ID=1BvX6lFsf3HrDvlopXt7PiyccVNM6-G1fNTIge3A_u6Y
```

**⚠️ สำคัญ**: อย่าเปิดเผย API Key ต่อสาธารณะ!

### 4. ทดสอบการทำงาน

```bash
npm run dev
```

เปิดเบราว์เซอร์ไปที่: `http://localhost:5173`

---

## 🔨 Development

### รัน Development Server

```bash
npm run dev
```

Server จะรันที่ `http://localhost:5173` พร้อม Hot Module Replacement (HMR)

### Build สำหรับ Production

```bash
npm run build
```

ไฟล์ที่ build เสร็จจะอยู่ในโฟลเดอร์ `dist/`

### Preview Production Build

```bash
npm run preview
```

---

## 🚀 Deployment

### Deploy to GitHub Pages

#### 1. ติดตั้ง gh-pages

```bash
npm install --save-dev gh-pages
```

#### 2. แก้ไข vite.config.js

ตรวจสอบว่ามี `base` ตรงกับชื่อ repository:

```javascript
export default defineConfig({
  plugins: [react()],
  base: '/fmgs-registration-doc-gov/',
})
```

#### 3. Deploy

```bash
npm run deploy
```

เว็บไซต์จะถูก deploy ที่:
```
https://[your-username].github.io/fmgs-registration-doc-gov/
```

#### 4. ตั้งค่า GitHub Pages

1. ไปที่ Repository Settings
2. เลือก **Pages**
3. เลือก Branch: `gh-pages`
4. คลิก **Save**

รอ 2-3 นาที แล้วเว็บไซต์จะพร้อมใช้งาน!

---

## 📱 การใช้งาน

### 1. Dashboard
- แสดงสถิติทะเบียนทั้งหมด 5 หมวด
- อัพเดทแบบเรียลไทม์
- คลิก "รีเฟรช" เพื่อดึงข้อมูลล่าสุด

### 2. การค้นหา
- พิมพ์เลขทะเบียนหรือชื่อการค้าในช่องค้นหา
- ผลลัพธ์จะแสดงทันที
- คลิก "ล้าง" เพื่อรีเซ็ตการค้นหา

### 3. ตารางรายการ
- แสดงข้อมูลทะเบียนทั้งหมด
- เรียงลำดับจากวันเหลือน้อยไปมาก
- แบ่งหน้าละ 20 รายการ

### 4. Responsive Design
- **Desktop**: แสดงเป็นตาราง
- **Mobile/Tablet**: แสดงเป็นการ์ด

---

## 🎨 การปรับแต่ง

### เปลี่ยนจำนวนรายการต่อหน้า

แก้ไขใน `src/config/constants.js`:

```javascript
export const ITEMS_PER_PAGE = 20; // เปลี่ยนเป็นจำนวนที่ต้องการ
```

### เปลี่ยนเงื่อนไขสถานะ

แก้ไขใน `src/config/constants.js`:

```javascript
export const STATUS_RANGES = {
  EXPIRED: { min: -Infinity, max: -1 },
  CRITICAL: { min: 0, max: 30 },      // ปรับเป็น 0-30 วัน
  WARNING: { min: 31, max: 90 },      // ปรับเป็น 31-90 วัน
  NORMAL: { min: 91, max: Infinity },
};
```

### เปลี่ยนสี Theme

แก้ไขใน `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: '#3b82f6',    // เปลี่ยนสีหลัก
      expired: '#ef4444',    // เปลี่ยนสีขาดอายุ
      critical: '#f97316',   // เปลี่ยนสีวิกฤติ
      warning: '#eab308',    // เปลี่ยนสีระวัง
      normal: '#22c55e',     // เปลี่ยนสีปกติ
    },
  },
}
```

---

## 🐛 Troubleshooting

### ปัญหา: ไม่สามารถโหลดข้อมูลได้

**สาเหตุที่เป็นไปได้**:
1. API Key ไม่ถูกต้อง
2. Sheet ID ผิด
3. ไม่ได้แชร์ Google Sheets
4. ชื่อ Sheet ไม่ตรงกับที่ตั้งค่า (`ทะเบียนหลัก`)

**วิธีแก้**:
```bash
# 1. ตรวจสอบ .env
cat .env

# 2. ตรวจสอบ API Key ใน Google Cloud Console
# 3. ตรวจสอบว่า Sheet เป็น "Public" หรือ "Anyone with the link can view"
```

### ปัญหา: npm install ไม่สำเร็จ

**วิธีแก้**:
```bash
# ลบ node_modules และ lock file
rm -rf node_modules package-lock.json

# ติดตั้งใหม่
npm install
```

### ปัญหา: Build ไม่สำเร็จ

**วิธีแก้**:
```bash
# ตรวจสอบ Node.js version
node -v  # ต้อง >= 16.0.0

# ลบ cache
rm -rf node_modules/.vite

# Build ใหม่
npm run build
```

### ปัญหา: Deploy to GitHub Pages ไม่สำเร็จ

**วิธีแก้**:
1. ตรวจสอบว่า `base` ใน `vite.config.js` ตรงกับชื่อ repository
2. ตรวจสอบสิทธิ์ Push ไปยัง repository
3. ตรวจสอบ GitHub Pages settings

---

## 📊 โครงสร้างข้อมูล API

### Response จาก Google Sheets API

```json
{
  "range": "ทะเบียนหลัก!A2:H",
  "majorDimension": "ROWS",
  "values": [
    [
      "45",                        // A: จำนวนวันเหลือ
      "ปกติ",                      // B: สถานะ
      "REG-001",                   // C: รหัสทะเบียน
      "12-1-00123-4-0001",         // D: เลขทะเบียน
      "ผลิตภัณฑ์ A",               // E: ชื่อการค้า
      "อาหาร",                     // F: ประเภท
      "อย.",                       // G: หน่วยงาน
      "01/03/2026"                 // H: วันหมดอายุ
    ]
  ]
}
```

### Transformed Data Structure

```javascript
{
  id: 1,
  daysRemaining: 45,
  status: "ปกติ",
  regCode: "REG-001",
  regNumber: "12-1-00123-4-0001",
  tradeName: "ผลิตภัณฑ์ A",
  regType: "อาหาร",
  organization: "อย.",
  expiryDate: "01/03/2026",
  statusCategory: "normal"
}
```

---

## 🔐 Security Best Practices

### 1. ปกป้อง API Key
- ✅ ใช้ Environment Variables
- ✅ เพิ่ม `.env` ใน `.gitignore`
- ✅ จำกัดสิทธิ์ API Key ใน Google Cloud Console
- ❌ อย่า commit API Key ลง GitHub

### 2. CORS และ API Restrictions
- ตั้งค่า HTTP Referrer restrictions ใน Google Cloud Console
- จำกัดให้ใช้ได้เฉพาะ domain ของคุณ

### 3. Google Sheets Permissions
- แชร์เป็น "View only"
- อย่าให้สิทธิ์ Edit ผ่าน API Key

---

## 📚 เอกสารอ้างอิง

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Google Sheets API](https://developers.google.com/sheets/api)
- [Axios](https://axios-http.com/)

---

## 🤝 Contributing

หากต้องการพัฒนาโปรเจคนี้ต่อ:

1. Fork repository
2. สร้าง feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. เปิด Pull Request

---

## 📄 License

This project is licensed under the MIT License

---

## 👨‍💻 Author

**Development Team**

- GitHub: [@consdevs](https://github.com/consdevs)
- Repository: [fmgs-registration-doc-gov](https://github.com/consdevs/fmgs-registration-doc-gov)

---

## 🎉 Acknowledgments

- ขอบคุณ Google Sheets API
- ขอบคุณ React, Vite, และ Tailwind CSS teams
- ขอบคุณทุกคนที่สนับสนุนโปรเจคนี้

---

## 📞 Support

หากพบปัญหาหรือมีคำถาม:

1. เปิด [Issue](https://github.com/consdevs/fmgs-registration-doc-gov/issues)
2. ดูเอกสารใน README นี้
3. ตรวจสอบ Troubleshooting section

---

## 🗺️ Roadmap

### Version 1.0 (Current)
- ✅ Dashboard และสถิติ
- ✅ ค้นหาและกรอง
- ✅ Pagination
- ✅ Responsive Design

### Version 1.1 (Planned)
- ⏳ Dark Mode
- ⏳ Export to CSV/Excel
- ⏳ Print View
- ⏳ Advanced Filters

### Version 2.0 (Future)
- ⏳ Charts และ Graphs
- ⏳ Email Notifications
- ⏳ User Authentication
- ⏳ Admin Dashboard

---

**สร้างด้วย ❤️ โดย Claude Code**

---

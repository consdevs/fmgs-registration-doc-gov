# ✅ ระบบ Auto-Detect Columns อัพเดทแล้ว!

## 🎯 ปัญหาที่แก้ไข

เดิม: ระบบคาดหวัง columns ต้องอยู่ที่ A-H ตายตัว
ตอนนี้: **ระบบอ่าน headers แล้ว map columns อัตโนมัติ!** 🎉

---

## 🚀 ฟีเจอร์ใหม่: Auto-Detection

### ระบบจะหา columns โดยอัตโนมัติจาก keywords:

| ข้อมูล | Keywords ที่ระบบจะหา |
|--------|---------------------|
| **จำนวนวันเหลือ** | วันเหลือ, จำนวนวัน, days, remaining |
| **สถานะ** | สถานะ, status |
| **รหัสทะเบียน** | รหัส, code |
| **เลขทะเบียน** | เลขทะเบียน, ทะเบียน, reg, number, registration |
| **ชื่อการค้า** | ชื่อการค้า, ชื่อ, trade, name, product |
| **ประเภท** | ประเภท, type, category |
| **หน่วยงาน** | หน่วยงาน, org, organization, department |
| **วันหมดอายุ** | วันหมดอายุ, หมดอายุ, expiry, expire, date |

---

## 📊 ตัวอย่าง Google Sheets ที่รองรับ

### ✅ ตัวอย่างที่ 1 (ภาษาไทย):
```
A: จำนวนวันเหลือ | B: สถานะทะเบียน | C: รหัส | D: เลขทะเบียน | E: ชื่อการค้า | F: ประเภท | G: หน่วยงาน | H: วันหมดอายุ
```

### ✅ ตัวอย่างที่ 2 (ภาษาอังกฤษ):
```
A: Days Remaining | B: Status | C: Code | D: Registration Number | E: Product Name | F: Type | G: Organization | H: Expiry Date
```

### ✅ ตัวอย่างที่ 3 (ผสม):
```
A: วันเหลือ | B: Status | C: รหัส | D: Reg Number | E: ชื่อผลิตภัณฑ์ | F: Category | G: Org | H: Expire Date
```

### ✅ ตัวอย่างที่ 4 (Columns ไม่เรียงตาม A-H):
```
C: วันเหลือ | A: สถานะ | E: รหัส | B: เลขทะเบียน | ...
```
**ระบบจะหาเจอและ map ให้ถูกต้องอัตโนมัติ!**

---

## 🔧 วิธีใช้งาน

### 1. Google Sheets ของคุณต้องมี:
- ✅ **แถวแรก (row 1)** = Headers (ชื่อคอลัมน์)
- ✅ **แถว 2+** = ข้อมูล
- ✅ **Headers มี keywords** ที่ระบบรู้จัก (ดูตารางด้านบน)

### 2. ไม่ต้องเรียง columns ตามลำดับ A-H
ระบบจะหาเองจาก headers!

### 3. ชื่อ columns ยืดหยุ่น
- "วันเหลือ" ✅
- "จำนวนวันเหลือ" ✅
- "Days Remaining" ✅
- "Remaining Days" ✅

---

## 🎨 ตัวอย่างที่ทำงานได้

### Google Sheets ของคุณ:
```
Row 1 (Headers):
  Column D: วันเหลือ
  Column A: เลขทะเบียน
  Column B: ชื่อผลิตภัณฑ์
  Column E: วันหมดอายุ
  Column C: สถานะ
  Column F: ประเภท
  Column G: หน่วยงาน
  Column H: รหัส
```

### ระบบจะ detect:
```
✓ DAYS_REMAINING = Column D (วันเหลือ)
✓ REG_NUMBER = Column A (เลขทะเบียน)
✓ TRADE_NAME = Column B (ชื่อผลิตภัณฑ์)
✓ EXPIRY_DATE = Column E (วันหมดอายุ)
✓ STATUS = Column C (สถานะ)
✓ REG_TYPE = Column F (ประเภท)
✓ ORGANIZATION = Column G (หน่วยงาน)
✓ REG_CODE = Column H (รหัส)
```

---

## 🐛 Debug & Logging

เปิด Browser Console (F12) จะเห็น:

```javascript
Detected column mapping: {
  DAYS_REMAINING: 3,
  REG_NUMBER: 0,
  TRADE_NAME: 1,
  EXPIRY_DATE: 4,
  STATUS: 2,
  ...
}

Loaded 125 registrations from Google Sheets
```

---

## ⚙️ Configuration

### Environment Variables (.env):
```bash
# Required
VITE_GOOGLE_SHEETS_API_KEY=your_api_key
VITE_GOOGLE_SHEETS_SHEET_ID=your_sheet_id

# Optional - ชื่อ Sheet (default: "ทะเบียนหลัก")
VITE_SHEET_NAME=ชื่อชีทของคุณ
```

---

## ⚠️ หมายเหตุสำคัญ

### ต้องมีข้อมูลครบ 8 fields:
1. วันเหลือ (จำนวนวัน) - **ต้องเป็นตัวเลข**
2. สถานะ
3. รหัสทะเบียน
4. เลขทะเบียน
5. ชื่อการค้า
6. ประเภท
7. หน่วยงาน
8. วันหมดอายุ

### ถ้า headers ไม่ตรงกับ keywords:
- ระบบจะใช้ default mapping (A-H)
- เช็ค Console เพื่อดู warnings

---

## 🔄 การทำงาน

```
1. เว็บโหลด
   ↓
2. ระบบอ่าน Row 1 (Headers) จาก Google Sheets
   ↓
3. ตรวจหา keywords ในแต่ละ column
   ↓
4. สร้าง column mapping
   ↓
5. อ่านข้อมูล Row 2+ ตาม mapping ที่สร้าง
   ↓
6. แสดงผลบนเว็บ ✅
```

---

## 🎉 ผลลัพธ์

- ✅ รองรับ Google Sheets ที่มี columns ไม่ตรง A-H
- ✅ รองรับชื่อ columns ทั้งภาษาไทยและอังกฤษ
- ✅ รองรับ columns ที่ไม่เรียงลำดับ
- ✅ Auto-detect และ cache (ไม่ต้องดึง headers ทุกครั้ง)
- ✅ Fallback เป็น default mapping ถ้า detect ไม่ได้

---

## 📞 ยังมีปัญหา?

ถ้าระบบยังหา columns ไม่เจอ:

1. เช็ค Browser Console (F12)
2. ดูว่า headers มี keywords ที่ระบบรู้จักหรือไม่
3. เพิ่ม keywords ใน `src/config/constants.js`
4. หรือเปลี่ยนชื่อ headers ใน Google Sheets ให้ตรงกับ keywords

---

**อัพเดทเมื่อ:** 22 ตุลาคม 2025
**Version:** 2.0 (Auto-Detection)

🎉 **ตอนนี้ระบบยืดหยุ่นกว่าเดิมมาก!**

# 🚀 คู่มือ Deploy ไปยัง GitHub Pages

URL ยังไม่สามารถเข้าถึงได้เนื่องจาก**ยังไม่ได้ทำการ Deploy** ให้ทำตามขั้นตอนด้านล่างนี้

---

## ⚠️ สาเหตุที่เข้าไม่ได้

- ❌ ยังไม่ได้ merge Pull Request
- ❌ ยังไม่ได้ตั้งค่า GitHub Pages
- ❌ ยังไม่ได้เพิ่ม API Key Secrets
- ❌ GitHub Actions ยังไม่ได้รัน

---

## ✅ ขั้นตอนการ Deploy (ต้องทำตามลำดับ)

### ขั้นตอนที่ 1: Merge Pull Request

1. เปิด GitHub Repository:
   ```
   https://github.com/consdevs/fmgs-registration-doc-gov
   ```

2. ไปที่ **Pull requests** tab

3. คลิกที่ PR: **"feat: Initialize React + Vite Registration Management System"**
   - Branch: `claude/update-spreadsheet-link-011CUNTbcfrghDqaKydXtdn9`

4. คลิกปุ่ม **"Merge pull request"**

5. คลิก **"Confirm merge"**

6. (Optional) คลิก **"Delete branch"** เพื่อลบ branch ที่ merge แล้ว

---

### ขั้นตอนที่ 2: ตั้งค่า GitHub Pages

1. ไปที่ **Settings** (บน repository)

2. เลื่อนลงหาเมนู **"Pages"** (ทางด้านซ้าย)

3. ในส่วน **"Build and deployment"**:
   - **Source**: เลือก **"GitHub Actions"**
   - ⚠️ ไม่ใช่ "Deploy from a branch"

4. คลิก **Save** (ถ้ามี)

5. คุณจะเห็นข้อความ:
   ```
   GitHub Pages is currently disabled. Select a source above to enable GitHub Pages.
   ```
   หลังจากเลือก GitHub Actions จะกลายเป็น:
   ```
   Your site is ready to be published at https://consdevs.github.io/fmgs-registration-doc-gov/
   ```

---

### ขั้นตอนที่ 3: สร้าง Google Sheets API Key

#### 3.1 เข้า Google Cloud Console

1. ไปที่: https://console.cloud.google.com/
2. ล็อกอินด้วย Google Account

#### 3.2 สร้างโปรเจค (ถ้ายังไม่มี)

1. คลิก **Select a project** (ด้านบน)
2. คลิก **New Project**
3. ตั้งชื่อ: `Registration Management`
4. คลิก **Create**
5. รอ 10-20 วินาที แล้วเลือกโปรเจคที่สร้าง

#### 3.3 เปิดใช้งาน Google Sheets API

1. ไปที่เมนู ☰ → **APIs & Services** → **Library**
2. ค้นหา: `Google Sheets API`
3. คลิกที่ผลลัพธ์
4. คลิก **Enable**
5. รอจนสถานะเป็น "API enabled"

#### 3.4 สร้าง API Key

1. ไปที่เมนู ☰ → **APIs & Services** → **Credentials**
2. คลิก **+ CREATE CREDENTIALS**
3. เลือก **API key**
4. คัดลอก API Key ที่ได้ (จะใช้ในขั้นตอนที่ 4)
   ```
   ตัวอย่าง: AIzaSyBxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```

#### 3.5 จำกัดสิทธิ์ API Key (แนะนำ - เพื่อความปลอดภัย)

1. คลิกที่ API Key ที่เพิ่งสร้าง
2. ในส่วน **API restrictions**:
   - เลือก **Restrict key**
   - เลือก **Google Sheets API**
3. ในส่วน **Application restrictions**:
   - เลือก **HTTP referrers (web sites)**
   - คลิก **Add an item**
   - ใส่: `https://consdevs.github.io/*`
   - (Optional) ใส่: `http://localhost:5173/*` สำหรับ dev
4. คลิก **Save**

---

### ขั้นตอนที่ 4: เพิ่ม Secrets ใน GitHub

1. กลับไปที่ GitHub Repository

2. ไปที่ **Settings** → **Secrets and variables** → **Actions**

3. คลิก **New repository secret**

#### Secret ที่ 1: API Key

- **Name**: `VITE_GOOGLE_SHEETS_API_KEY`
- **Secret**: (วาง API Key ที่คัดลอกจากขั้นตอนที่ 3.4)
- คลิก **Add secret**

#### Secret ที่ 2: Sheet ID

- คลิก **New repository secret** อีกครั้ง
- **Name**: `VITE_GOOGLE_SHEETS_SHEET_ID`
- **Secret**: `1BvX6lFsf3HrDvlopXt7PiyccVNM6-G1fNTIge3A_u6Y`
- คลิก **Add secret**

#### ตรวจสอบ Secrets

ควรมี 2 secrets:
- ✅ `VITE_GOOGLE_SHEETS_API_KEY`
- ✅ `VITE_GOOGLE_SHEETS_SHEET_ID`

---

### ขั้นตอนที่ 5: แชร์ Google Sheets

1. เปิด Google Sheets:
   ```
   https://docs.google.com/spreadsheets/d/1BvX6lFsf3HrDvlopXt7PiyccVNM6-G1fNTIge3A_u6Y/edit
   ```

2. คลิกปุ่ม **Share** (มุมบนขวา)

3. ในส่วน **General access**:
   - เลือก **Anyone with the link**
   - สิทธิ์: **Viewer**

4. คลิก **Copy link** (ถ้าต้องการ)

5. คลิก **Done**

6. ตรวจสอบว่าชื่อ Sheet เป็น **"ทะเบียนหลัก"** (ถ้าไม่ใช่ให้เปลี่ยน)

---

### ขั้นตอนที่ 6: Trigger GitHub Actions

หลังจาก merge PR แล้ว GitHub Actions จะรันอัตโนมัติ

**หรือ Trigger ด้วยตัวเอง:**

1. ไปที่ **Actions** tab

2. เลือก workflow: **"Deploy to GitHub Pages"**

3. คลิก **Run workflow** (ด้านขวา)

4. เลือก branch: **main** หรือ **master**

5. คลิก **Run workflow** (สีเขียว)

6. รอ 2-3 นาที

---

### ขั้นตอนที่ 7: ตรวจสอบสถานะ Deployment

1. ไปที่ **Actions** tab

2. ดู workflow ล่าสุด: **"Deploy to GitHub Pages"**

3. ถ้าเป็น:
   - ✅ **สีเขียว** = Deploy สำเร็จ
   - 🟡 **สีเหลือง** = กำลังรัน (รอต่อ)
   - ❌ **สีแดง** = มีปัญหา (คลิกเข้าไปดู logs)

4. ถ้าสีแดง ให้คลิกเข้าไปดูว่า step ไหนมีปัญหา:
   - **Build failed**: ตรวจสอบ code
   - **Deploy failed**: ตรวจสอบ GitHub Pages settings
   - **Missing secrets**: ตรวจสอบว่าเพิ่ม secrets ครบ 2 ตัว

---

### ขั้นตอนที่ 8: เข้าถึงเว็บไซต์

หลัง deploy สำเร็จ เข้าได้ที่:

```
https://consdevs.github.io/fmgs-registration-doc-gov/
```

หรือดู URL จาก:
- **Settings** → **Pages** → "Your site is live at..."

---

## 🐛 แก้ปัญหา

### ปัญหา 1: Actions ล้มเหลว - "Error: API key not valid"

**สาเหตุ**: API Key ผิดหรือไม่ได้เพิ่ม Secret

**วิธีแก้**:
1. ไปที่ Settings → Secrets and variables → Actions
2. ตรวจสอบว่ามี `VITE_GOOGLE_SHEETS_API_KEY`
3. ถ้าไม่มีหรือผิด ให้สร้างใหม่
4. ลอง Run workflow ใหม่

---

### ปัญหา 2: เว็บเปิดได้แต่แสดงข้อผิดพลาด "ไม่สามารถโหลดข้อมูลได้"

**สาเหตุ**:
- API Key ไม่ถูกต้อง
- Google Sheets ไม่เป็น Public
- ชื่อ Sheet ผิด

**วิธีแก้**:
1. เปิด Browser Console (กด F12)
2. ดู error message
3. ถ้าเป็น **403 Forbidden**:
   - ตรวจสอบว่า Sheets เป็น "Anyone with the link"
   - ตรวจสอบ API Key restrictions
4. ถ้าเป็น **404 Not Found**:
   - ตรวจสอบ Sheet ID ใน Secrets
5. ถ้าเป็น **"ไม่พบชีท"**:
   - ตรวจสอบชื่อ Sheet ว่าเป็น "ทะเบียนหลัก"

---

### ปัญหา 3: 404 Page Not Found

**สาเหตุ**:
- ยังไม่ได้ deploy
- GitHub Pages ยังไม่เปิดใช้งาน
- Base path ผิด

**วิธีแก้**:
1. ตรวจสอบ Settings → Pages ว่าเปิดใช้แล้ว
2. ตรวจสอบ Actions ว่า deploy สำเร็จแล้ว
3. รอ 2-3 นาที แล้วลอง refresh อีกครั้ง
4. Clear browser cache (Ctrl+Shift+R)

---

### ปัญหา 4: Actions ล้มเหลว - "Permission denied"

**สาเหตุ**: ไม่มีสิทธิ์ deploy ไป GitHub Pages

**วิธีแก้**:
1. ไปที่ Settings → Actions → General
2. ในส่วน **Workflow permissions**:
   - เลือก **Read and write permissions**
   - เปิด **Allow GitHub Actions to create and approve pull requests**
3. คลิก **Save**
4. ลอง Run workflow ใหม่

---

### ปัญหา 5: Dashboard แสดงแต่ไม่มีข้อมูล

**สาเหตุ**: ข้อมูลใน Google Sheets ไม่ถูกต้อง

**วิธีแก้**:
1. ตรวจสอบว่าชีทมีข้อมูลในคอลัมน์ A-H
2. ตรวจสอบว่าชื่อ Sheet เป็น "ทะเบียนหลัก"
3. ตรวจสอบว่าแถวแรกเป็น Header (ระบบจะข้ามแถวแรก)
4. ข้อมูลต้องเริ่มที่แถวที่ 2

---

## 📊 โครงสร้างข้อมูลที่ถูกต้อง

Google Sheets ต้องมีโครงสร้างแบบนี้:

| A | B | C | D | E | F | G | H |
|---|---|---|---|---|---|---|---|
| จำนวนวันเหลือ | สถานะทะเบียน | รหัสทะเบียน | เลขทะเบียน | ชื่อการค้า | ประเภททะเบียน | หน่วยงาน | วันหมดอายุทะเบียน |
| 45 | ปกติ | REG-001 | 12-1-00123-4-0001 | ผลิตภัณฑ์ A | อาหาร | อย. | 01/03/2026 |
| -5 | ขาดอายุ | REG-002 | 12-1-00124-4-0002 | ผลิตภัณฑ์ B | ยา | อย. | 15/09/2024 |

**หมายเหตุ**:
- แถว 1 = Headers (ระบบจะข้าม)
- แถว 2+ = ข้อมูล
- Column A ต้องเป็นตัวเลข (จำนวนวัน)

---

## ✅ Checklist สำหรับ Deployment

ก่อน deploy ตรวจสอบว่า:

- [ ] Merge PR เรียบร้อยแล้ว
- [ ] ตั้งค่า GitHub Pages เป็น "GitHub Actions"
- [ ] สร้าง Google Sheets API Key แล้ว
- [ ] เพิ่ม Secrets ครบ 2 ตัว
- [ ] Google Sheets เป็น "Anyone with the link"
- [ ] ชื่อ Sheet เป็น "ทะเบียนหลัก"
- [ ] GitHub Actions รันสำเร็จ (สีเขียว)
- [ ] เข้า URL ได้และเห็น Dashboard

---

## 🎯 หลัง Deploy สำเร็จ

เว็บไซต์จะแสดง:

### Dashboard (ด้านบน)
- 📊 **ทะเบียนทั้งหมด**: จำนวนทะเบียนทั้งหมด
- 🔴 **ขาดอายุ**: วันเหลือ < 0
- 🟠 **วิกฤติ**: 0-30 วัน
- 🟡 **ระวัง**: 31-90 วัน
- 🟢 **ปกติ**: > 90 วัน

### ฟีเจอร์
- 🔍 **ค้นหา**: ค้นหาเลขทะเบียนหรือชื่อการค้า
- 📄 **Pagination**: แสดง 20 รายการต่อหน้า
- 📱 **Responsive**: ใช้งานได้บนมือถือ
- 🔄 **Real-time**: ข้อมูลอัพเดททันที

---

## 📞 ต้องการความช่วยเหลือ?

ถ้ายังมีปัญหา:

1. เช็ค Browser Console (F12) ดู error message
2. เช็ค GitHub Actions logs
3. อ่าน README.md สำหรับข้อมูลเพิ่มเติม
4. เปิด Issue ที่ GitHub

---

## 🔗 Links ที่เกี่ยวข้อง

- **Repository**: https://github.com/consdevs/fmgs-registration-doc-gov
- **Website**: https://consdevs.github.io/fmgs-registration-doc-gov/
- **Google Sheets**: https://docs.google.com/spreadsheets/d/1BvX6lFsf3HrDvlopXt7PiyccVNM6-G1fNTIge3A_u6Y/edit
- **Google Cloud Console**: https://console.cloud.google.com/

---

**สร้างด้วย ❤️ โดย Claude Code**

หากทำตามขั้นตอนข้างต้นครบถ้วน เว็บไซต์จะพร้อมใช้งานภายใน 2-3 นาที! 🚀

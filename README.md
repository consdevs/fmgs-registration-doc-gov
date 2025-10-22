# 🎓 ระบบลงทะเบียน FMGS

ระบบจัดการข้อมูลการลงทะเบียนแบบออนไลน์ที่สวยงามและใช้งานง่าย

## ✨ คุณสมบัติ

- 📊 **แดชบอร์ดสถิติ** - แสดงจำนวนการลงทะเบียนทั้งหมด, วันนี้, และผู้ใช้งาน
- 🔍 **ค้นหาข้อมูล** - ค้นหาข้อมูลได้แบบเรียลไทม์
- 📱 **Responsive Design** - รองรับทุกขนาดหน้าจอ (Desktop, Tablet, Mobile)
- 🎨 **UI สวยงาม** - ใช้ Gradient สีม่วง-น้ำเงินที่ทันสมัย
- 📝 **ฟอร์มเพิ่มข้อมูล** - Modal สำหรับเพิ่มข้อมูลใหม่
- 🔄 **รีเฟรชข้อมูล** - อัพเดทข้อมูลจาก Google Sheets
- 📋 **แสดงข้อมูลแบบตาราง** - จัดระเบียบข้อมูลให้อ่านง่าย

## 🚀 การใช้งาน

### วิธีที่ 1: เปิดไฟล์ HTML โดยตรง
1. เปิดไฟล์ `index.html` ด้วยเว็บเบราว์เซอร์

### วิธีที่ 2: ใช้ HTTP Server
```bash
# ใช้ Python
python3 -m http.server 8000

# หรือใช้ Node.js
npx http-server

# เปิดเบราว์เซอร์ที่ http://localhost:8000
```

## 📊 การเชื่อมต่อ Google Sheets

แอปพลิเคชันนี้ใช้ Google Sheets เป็นฐานข้อมูล โดยดึงข้อมูลจาก:
- Spreadsheet ID: `1BvX6lFsf3HrDvlopXt7PiyccVNM6-G1fNTIge3A_u6Y`
- Sheet GID: `1835013087`

### การตั้งค่า Google Sheets ของคุณเอง
1. เปิด Google Sheets ของคุณ
2. ไปที่ File > Share > Publish to web
3. เลือก "Entire Document" หรือ "Sheet ที่ต้องการ"
4. กดปุ่ม "Publish"
5. คัดลอก Spreadsheet ID และ GID จาก URL
6. แก้ไขค่าในไฟล์ `index.html`:
```javascript
const SHEET_ID = 'YOUR_SHEET_ID';
const SHEET_GID = 'YOUR_SHEET_GID';
```

### รูปแบบข้อมูลที่แนะนำ
ใน Google Sheets ควรมีหัวคอลัมน์ดังนี้:
- Timestamp (วันที่และเวลา)
- ชื่อ-นามสกุล
- อีเมล
- เบอร์โทรศัพท์
- หน่วยงาน
- สถานะ

## 🎨 ฟีเจอร์หลัก

### 1. แดชบอร์ด
แสดงสถิติสำคัญ 3 ตัว:
- จำนวนการลงทะเบียนทั้งหมด
- ลงทะเบียนวันนี้
- จำนวนผู้ใช้งาน

### 2. ระบบค้นหา
- ค้นหาข้อมูลได้จากทุกฟิลด์
- แสดงผลแบบเรียลไทม์
- ไฮไลท์ผลการค้นหา

### 3. ฟอร์มเพิ่มข้อมูล
- Modal ที่สวยงาม
- Validation ฟอร์ม
- แจ้งเตือนเมื่อบันทึกสำเร็จ

### 4. Responsive Design
- รองรับ Desktop (1200px+)
- รองรับ Tablet (768px - 1199px)
- รองรับ Mobile (< 768px)

## 🛠️ เทคโนโลยีที่ใช้

- **HTML5** - โครงสร้างเว็บไซต์
- **CSS3** - การออกแบบและ Styling
  - Flexbox & Grid Layout
  - CSS Animations
  - Gradient Backgrounds
  - Responsive Design
- **JavaScript (Vanilla)** - การทำงานแบบ Dynamic
  - Fetch API
  - CSV Parsing
  - Event Handling
  - DOM Manipulation

## 📸 ภาพตัวอย่าง

### หน้าหลัก (Desktop)
![Desktop View](https://github.com/user-attachments/assets/cc38fe3d-6f09-4475-8a60-31e1b7385cbc)

### ระบบค้นหา
![Search Functionality](https://github.com/user-attachments/assets/dfe17a67-add1-4319-96ea-7cfe1f14e705)

### ฟอร์มเพิ่มข้อมูล
![Add Data Modal](https://github.com/user-attachments/assets/887b01fc-cd98-413a-8df1-e77f977125b0)

### มุมมอง Mobile
![Mobile View](https://github.com/user-attachments/assets/0e1d8f87-84c9-4836-b627-1740321820c2)

## 🔧 การปรับแต่ง

### เปลี่ยนสีธีม
แก้ไขค่าสีใน CSS:
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

### เพิ่มฟิลด์ในฟอร์ม
เพิ่ม HTML ในส่วน Modal:
```html
<div class="form-group">
    <label>ชื่อฟิลด์</label>
    <input type="text" id="fieldId" required>
</div>
```

## 📝 หมายเหตุ

- ฟีเจอร์การเพิ่มข้อมูลต้องการ Google Apps Script Web App เพื่อเขียนข้อมูลกลับไปยัง Sheets
- ข้อมูลตัวอย่างจะถูกแสดงหากไม่สามารถเชื่อมต่อกับ Google Sheets ได้
- แนะนำให้ใช้เบราว์เซอร์ที่ทันสมัย (Chrome, Firefox, Safari, Edge)

## 📄 License

MIT License - ใช้งานได้อย่างอิสระ

## 👨‍💻 ผู้พัฒนา

พัฒนาด้วย ❤️ สำหรับระบบลงทะเบียน FMGS
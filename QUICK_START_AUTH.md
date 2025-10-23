# 🚀 เริ่มใช้งานระบบ Authentication - คู่มือฉบับย่อ

## ✅ สิ่งที่ทำเสร็จแล้ว

- ✅ สร้าง Supabase project: `fmgs-registration` (ID: yypeqloojpuyemvvramz)
- ✅ ตั้งค่า `.env` ด้วย Supabase credentials แล้ว
- ✅ ระบบ Authentication พร้อมใช้งาน

---

## 🎯 ขั้นตอนถัดไป (ทำเลย 3 ขั้นตอน)

### ขั้นที่ 1: เปิดใช้งาน Email Authentication ใน Supabase

1. ไปที่ Supabase Dashboard: https://supabase.com/dashboard/project/yypeqloojpuyemvvramz

2. คลิก **Authentication** (🔐) ที่แถบซ้าย

3. คลิก **Providers** ในเมนูย่อย

4. เช็คว่า **Email** เปิดใช้งานอยู่หรือไม่:
   - ถ้ามี toggle สีเขียว = เปิดอยู่แล้ว ✅
   - ถ้ายังไม่เปิด = คลิก toggle เพื่อเปิด

5. **สำคัญ!** ตั้งค่า Email confirmation:
   - ในหน้า **Email** provider settings
   - หา option **"Confirm email"**
   - **เปิดใช้งาน** (toggle เป็นสีเขียว)
   - นี่จะทำให้ระบบส่งอีเมลยืนยัน (OTP) ไปหาผู้ใช้

6. คลิก **Save** ถ้ามีการเปลี่ยนแปลง

### ขั้นที่ 2: ตั้งค่า Redirect URLs (สำคัญ!)

1. ยังอยู่ในหน้า **Authentication**

2. คลิก **URL Configuration** ในเมนูย่อย

3. เพิ่ม URL ของเว็บไซต์ใน **Redirect URLs**:
   ```
   http://localhost:5173
   http://localhost:5173/**
   ```
   (สำหรับ development)

4. ถ้าจะ deploy บน GitHub Pages ให้เพิ่ม:
   ```
   https://consdevs.github.io/fmgs-registration-doc-gov
   https://consdevs.github.io/fmgs-registration-doc-gov/**
   ```

5. คลิก **Save**

### ขั้นที่ 3: ทดสอบระบบ Authentication

1. เปิด Terminal และรันคำสั่ง:
   ```bash
   npm run dev
   ```

2. เปิดเบราว์เซอร์ไปที่: **http://localhost:5173**

3. คุณจะเห็น **หน้า Login** (ถูกบังคับให้ login ก่อนดูข้อมูล)

4. **ทดสอบการสมัครสมาชิก:**
   - คลิก **"สมัครสมาชิก"**
   - กรอกข้อมูล:
     - **อีเมล**: ใช้อีเมลจริงที่เข้าถึงได้ (เช่น Gmail, Outlook)
     - **รหัสผ่าน**: อย่างน้อย 6 ตัวอักษร
     - **ยืนยันรหัสผ่าน**: ใส่รหัสเดียวกัน
     - **ชื่อที่แสดง**: ชื่อของคุณ
   - คลิก **"สมัครสมาชิก"**

5. **เช็คอีเมล:**
   - คุณจะเห็นหน้า **"ตรวจสอบอีเมลของคุณ"**
   - เปิดอีเมลของคุณ (เช็คในกล่องจดหมายหลักและ Spam/Junk)
   - หาอีเมลจาก **"noreply@mail.app.supabase.io"**
   - หัวข้อจะเป็น **"Confirm Your Signup"**

6. **คลิกลิงก์ยืนยัน:**
   - คลิกปุ่ม **"Confirm your mail"** ในอีเมล
   - บัญชีของคุณจะถูกยืนยันทันที
   - เบราว์เซอร์จะเปิดหน้ายืนยัน

7. **ล็อกอิน:**
   - กลับมาที่เว็บไซต์: http://localhost:5173/login
   - ใส่อีเมลและรหัสผ่านที่สมัครไว้
   - คลิก **"เข้าสู่ระบบ"**
   - **สำเร็จ!** คุณจะเห็น Dashboard พร้อมชื่อของคุณที่มุมขวาบน

---

## 📊 สิ่งที่คุณจะเห็นหลังล็อกอิน

✅ **Dashboard** - หน้าแรกพร้อมสถิติข้อมูลทะเบียน
✅ **User Menu** - มุมขวาบนแสดงชื่อและอีเมลของคุณ
✅ **ปุ่ม "ออกจากระบบ"** - คลิกที่ชื่อของคุณเพื่อ sign out
✅ **เมนูทะเบียน** - สามารถดูทะเบียนแต่ละประเภทได้
✅ **ค้นหา** - ค้นหาข้อมูลข้ามทุกทะเบียน

---

## 🔍 ตรวจสอบผู้ใช้ใน Supabase

ดูว่ามีผู้ใช้ที่สมัครหรือไม่:

1. ไปที่ Supabase Dashboard: https://supabase.com/dashboard/project/yypeqloojpuyemvvramz
2. คลิก **Authentication** > **Users**
3. คุณจะเห็นรายชื่อผู้ใช้ทั้งหมด พร้อมสถานะ:
   - **Email Confirmed**: ✅ = ยืนยันแล้ว
   - **Last Sign In**: เวลาล็อกอินล่าสุด

---

## ❓ แก้ปัญหา

### ปัญหา: อีเมลยืนยันไม่มา
**วิธีแก้:**
1. เช็คโฟลเดอร์ Spam/Junk
2. รอ 2-3 นาที (อาจส่งช้า)
3. ไปที่ Supabase **Authentication** > **Logs** เพื่อเช็ค error
4. ถ้ายังไม่มา ให้ลองสมัครใหม่ด้วยอีเมลอื่น

### ปัญหา: "Invalid login credentials"
**วิธีแก้:**
1. ตรวจสอบว่าคลิกลิงก์ยืนยันในอีเมลแล้วหรือยัง
2. เช็คว่าพิมพ์อีเมลและรหัสผ่านถูกต้อง
3. ลอง reset password ด้วยปุ่ม "ลืมรหัสผ่าน?"

### ปัญหา: หน้า Login ไม่แสดง
**วิธีแก้:**
1. ตรวจสอบว่ารัน `npm run dev` แล้ว
2. เช็คว่าไฟล์ `.env` มีอยู่และมี Supabase credentials
3. Restart dev server: กด Ctrl+C แล้วรัน `npm run dev` อีกครั้ง
4. เช็ค Console ในเบราว์เซอร์ (F12) ดู error

---

## 🎉 เสร็จแล้ว!

ระบบ Authentication ทำงานแล้ว คุณสามารถ:
- ✅ สมัครสมาชิกใหม่ (พร้อมยืนยันอีเมล OTP)
- ✅ ล็อกอิน/ล็อกเอาท์
- ✅ ดูข้อมูลทะเบียนได้เฉพาะผู้ที่ล็อกอินแล้ว
- ✅ Session จำการล็อกอิน (ไม่ต้องล็อกอินทุกครั้ง)

---

## 📚 เอกสารเพิ่มเติม

- **AUTHENTICATION_SETUP.md** - คู่มือละเอียดเกี่ยวกับ Authentication
- **PHASE2_SETUP.md** - ขั้นตอนถัดไป (Database, CRUD)
- **TROUBLESHOOTING.md** - แก้ปัญหาทั่วไป

---

**ถ้ามีปัญหาหรือคำถาม ถามได้เลยครับ! 🚀**

# Testing Guide - Phase 1
## คู่มือการทดสอบระบบ FMGS Registration Management

---

## 🎯 Testing Objectives

ทดสอบการทำงานของ Phase 1 ให้ครบทุก feature:
1. ✅ Dashboard แสดงสถิติถูกต้อง
2. ✅ Multi-sheet navigation ทำงาน
3. ✅ Table แสดงข้อมูลครบ
4. ✅ Sorting ทำงาน
5. ✅ Pagination ทำงาน
6. ✅ Search ค้นหาได้
7. ✅ Responsive design
8. ✅ Status badges แสดงสีถูกต้อง
9. ✅ Document links เปิดได้

---

## 🧪 Test Cases

### Test Case 1: Dashboard Statistics

**Objective:** ตรวจสอบว่า Dashboard แสดงสถิติถูกต้อง

**Steps:**
1. เปิดหน้าแรก `/`
2. ดู Dashboard cards ทั้ง 5 ใบ

**Expected Results:**
- ✅ แสดง "ทะเบียนทั้งหมด" = 3,082 (หรือตามจำนวนจริง)
- ✅ แสดงจำนวน "ขาดอายุ" (สีแดง)
- ✅ แสดงจำนวน "วิกฤติ" (สีส้ม)
- ✅ แสดงจำนวน "ระวัง" (สีเหลือง)
- ✅ แสดงจำนวน "ปกติ" (สีเขียว)
- ✅ ไอคอนแสดงถูกต้อง
- ✅ สีพื้นหลังตรงตาม status

**Pass Criteria:** สถิติถูกต้องและแสดงครบทั้ง 5 cards

---

### Test Case 2: Sheet Tabs Navigation

**Objective:** ตรวจสอบการสลับ sheet

**Steps:**
1. ดูที่ Sheet Tabs (ด้านล่าง Dashboard)
2. คลิกแต่ละ tab

**Expected Results:**
- ✅ แสดง tabs ทั้งหมด (ไม่รวม sheet ว่าง)
- ✅ แต่ละ tab แสดงชื่อ sheet และจำนวนรายการ
- ✅ คลิก tab แล้วสลับ sheet ได้
- ✅ Tab ที่ active มีสีน้ำเงิน
- ✅ Tab อื่นมีสีเทา
- ✅ Scroll tabs ได้ถ้าเยอะ

**Test Data:** คลิกทดสอบ tabs เหล่านี้
- ทะเบียนหลัก (546)
- เครื่องหมายการค้า (769)
- กรมวิชาการเกษตร (546)
- อย (130)

**Pass Criteria:** สลับ sheet ได้ถูกต้องทุก tab

---

### Test Case 3: Table Data Display

**Objective:** ตรวจสอบการแสดงข้อมูลในตาราง

**Steps:**
1. เลือก sheet "ทะเบียนหลัก"
2. ดูตารางข้อมูล

**Expected Results:**
- ✅ แสดงข้อมูลในตาราง
- ✅ Headers แสดงชื่อคอลัมน์ภาษาไทย
- ✅ แสดงข้อมูลไม่เกิน 20 รายการต่อหน้า (default)
- ✅ มี pagination ด้านล่าง
- ✅ แสดง "แสดง X จาก Y รายการ"
- ✅ Status badges แสดงสีถูกต้อง
- ✅ ข้อมูลไม่เป็น "undefined" หรือ "null"

**Pass Criteria:** ตารางแสดงข้อมูลครบถ้วนและถูกต้อง

---

### Test Case 4: Column Sorting

**Objective:** ตรวจสอบการเรียงลำดับคอลัมน์

**Steps:**
1. คลิกที่ header "สถานะทะเบียน"
2. คลิกอีกครั้ง
3. ทดสอบกับคอลัมน์อื่น

**Expected Results:**
- ✅ คลิกครั้งแรก: เรียง Ascending (A-Z)
- ✅ คลิกครั้งที่สอง: เรียง Descending (Z-A)
- ✅ แสดงไอคอนลูกศร ↑ หรือ ↓
- ✅ ข้อมูลเรียงลำดับถูกต้อง
- ✅ ทำงานกับทุกคอลัมน์

**Test Columns:**
- สถานะทะเบียน (text)
- เลขทะเบียน (text/number)
- วันหมดอายุทะเบียน (date)

**Pass Criteria:** เรียงลำดับได้ถูกต้องทุกคอลัมน์

---

### Test Case 5: Pagination

**Objective:** ตรวจสอบการแบ่งหน้า

**Steps:**
1. เลือก sheet ที่มีข้อมูลมากกว่า 20 รายการ
2. คลิกปุ่ม "ถัดไป"
3. คลิกปุ่ม "ก่อนหน้า"

**Expected Results:**
- ✅ แสดงไม่เกิน 20 รายการต่อหน้า
- ✅ แสดง "หน้า X / Y"
- ✅ คลิก "ถัดไป" ไปหน้าถัดไป
- ✅ คลิก "ก่อนหน้า" ย้อนกลับ
- ✅ ปุ่ม disabled เมื่ออยู่หน้าแรก/สุดท้าย
- ✅ แสดงข้อมูลต่อเนื่องถูกต้อง

**Test Sheet:** เครื่องหมายการค้า (769 rows = 39 pages)

**Pass Criteria:** Pagination ทำงานถูกต้อง

---

### Test Case 6: Global Search

**Objective:** ตรวจสอบการค้นหา

**Steps:**
1. พิมพ์ในช่อง search bar "อะบา"
2. กด Enter
3. ทดสอบคำค้นหาอื่น: "2026", "FACT"

**Expected Results:**
- ✅ พาไปหน้า `/search?q=อะบา`
- ✅ แสดงผลลัพธ์ที่พบ
- ✅ แสดงจำนวน "พบ X รายการ"
- ✅ แสดง sheet ต้นทาง
- ✅ แสดง status badge
- ✅ ค้นหาข้ามทุก sheet
- ✅ ถ้าไม่พบแสดง "ไม่พบข้อมูล"

**Test Queries:**
- "อะบา" → ควรพบหลายรายการ
- "FACT" → ควรพบในหลาย sheet
- "2026" → ควรพบวันหมดอายุ
- "xxxyyy" → ไม่ควรพบอะไร

**Pass Criteria:** ค้นหาได้ถูกต้องและครอบคลุมทุก sheet

---

### Test Case 7: Status Badge Colors

**Objective:** ตรวจสอบสีของ status badges

**Steps:**
1. เลือก sheet ที่มีหลาย status
2. ดู badge ในตาราง

**Expected Results:**
- ✅ "ขาด" → สีแดง (red badge)
- ✅ "วิกฤติ" → สีส้ม (orange badge)
- ✅ "ระวัง" → สีเหลือง (yellow badge)
- ✅ "ปกติ" → สีเขียว (green badge)
- ✅ Badge มีขอบมน
- ✅ ข้อความอ่านง่าย

**Test Sheet:** ทะเบียนหลัก (มีหลาย status)

**Pass Criteria:** สีถูกต้องตามสถานะ

---

### Test Case 8: Document Links

**Objective:** ตรวจสอบลิงก์เอกสาร Google Drive

**Steps:**
1. เลือก sheet ที่มีคอลัมน์ "PCT."
2. คลิกลิงก์ "ดูเอกสาร"

**Expected Results:**
- ✅ ลิงก์แสดงเป็นข้อความสีน้ำเงิน "ดูเอกสาร"
- ✅ คลิกแล้วเปิด tab ใหม่
- ✅ ไปที่ Google Drive
- ✅ ถ้าไม่มีลิงก์แสดง "-"

**Test Sheet:** กรมวิชาการเกษตร (มี Google Drive links)

**Pass Criteria:** เปิดลิงก์ได้ถูกต้อง

---

### Test Case 9: Responsive Design (Mobile)

**Objective:** ตรวจสอบการแสดงผลบนมือถือ

**Steps:**
1. เปิด Chrome DevTools (F12)
2. เลือก Device: iPhone 12 Pro
3. ทดสอบทุกหน้า

**Expected Results:**
- ✅ Dashboard cards เรียงเป็น 1-2 columns
- ✅ Sheet tabs scroll ได้
- ✅ ตารางมี horizontal scroll
- ✅ Search bar แสดงเต็มความกว้าง
- ✅ ปุ่มกดได้ง่าย (ไม่เล็กเกินไป)
- ✅ Text อ่านง่าย
- ✅ ไม่มี content ล้น

**Test Devices:**
- iPhone 12 Pro (390x844)
- iPad (768x1024)
- Samsung Galaxy S21 (360x800)

**Pass Criteria:** แสดงผลดีบนทุกอุปกรณ์

---

### Test Case 10: Performance

**Objective:** ตรวจสอบความเร็ว

**Steps:**
1. เปิด Chrome DevTools → Network tab
2. Reload หน้าเว็บ
3. ดูเวลา load

**Expected Results:**
- ✅ Initial load < 3 seconds
- ✅ Sheet switching < 500ms
- ✅ Search results < 500ms
- ✅ Sorting instant
- ✅ No console errors

**Pass Criteria:** ทำงานเร็วและไม่มี error

---

### Test Case 11: Error Handling

**Objective:** ตรวจสอบการจัดการ error

**Steps:**
1. ลบไฟล์ JSON ทดสอบ error
2. ทดสอบ search ว่าง
3. ทดสอบคลิก sheet ว่าง

**Expected Results:**
- ✅ แสดง error message ที่เข้าใจง่าย
- ✅ ไม่ crash
- ✅ แสดง "กำลังโหลด..." ขณะโหลด
- ✅ แสดง "ไม่มีข้อมูล" ถ้าว่าง

**Pass Criteria:** จัดการ error ได้ดี ไม่ crash

---

### Test Case 12: Data Accuracy

**Objective:** ตรวจสอบความถูกต้องของข้อมูล

**Steps:**
1. นับจำนวนรายการใน Dashboard
2. เทียบกับ Excel file ต้นทาง
3. ตรวจสอบข้อมูลบางรายการ

**Expected Results:**
- ✅ จำนวนรายการตรงกับ Excel
- ✅ ข้อมูลถูกต้องไม่ผิดเพี้ยน
- ✅ วันที่แสดงถูกต้อง
- ✅ ภาษาไทยแสดงถูกต้อง (ไม่เพี้ยน)
- ✅ Status คำนวณถูกต้อง

**Test Data:**
- ทะเบียนหลัก: 546 rows
- เครื่องหมายการค้า: 769 rows
- Total: 3,082 rows

**Pass Criteria:** ข้อมูลตรงกับต้นฉบับ 100%

---

## 🐛 Bug Report Template

ถ้าพบ bug ให้บันทึกแบบนี้:

```markdown
### Bug: [ชื่อ bug]

**Severity:** Critical / High / Medium / Low

**Test Case:** TC-X

**Steps to Reproduce:**
1.
2.
3.

**Expected Result:**
-

**Actual Result:**
-

**Screenshots:**
[แนบภาพ]

**Environment:**
- Browser: Chrome 120
- OS: Windows 11
- Screen: 1920x1080
```

---

## ✅ Test Checklist

### Phase 1 Features

- [ ] **TC-1:** Dashboard Statistics
- [ ] **TC-2:** Sheet Tabs Navigation
- [ ] **TC-3:** Table Data Display
- [ ] **TC-4:** Column Sorting
- [ ] **TC-5:** Pagination
- [ ] **TC-6:** Global Search
- [ ] **TC-7:** Status Badge Colors
- [ ] **TC-8:** Document Links
- [ ] **TC-9:** Responsive Design (Mobile)
- [ ] **TC-10:** Performance
- [ ] **TC-11:** Error Handling
- [ ] **TC-12:** Data Accuracy

### Browser Compatibility

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Chrome Mobile
- [ ] Safari iOS

### Device Testing

- [ ] Desktop (1920x1080)
- [ ] Laptop (1366x768)
- [ ] Tablet (768x1024)
- [ ] Mobile (375x667)

---

## 📊 Test Results Template

```markdown
## Test Execution Report

**Date:** YYYY-MM-DD
**Tester:** [Name]
**Version:** Phase 1 v2.0.0

### Summary
- Total Test Cases: 12
- Passed: X
- Failed: Y
- Blocked: Z

### Test Results

| TC | Name | Status | Notes |
|----|------|--------|-------|
| TC-1 | Dashboard Statistics | ✅ PASS | |
| TC-2 | Sheet Tabs | ✅ PASS | |
| TC-3 | Table Display | ✅ PASS | |
| TC-4 | Sorting | ⚠️ FAIL | Bug: sorting dates |
| ... | ... | ... | ... |

### Bugs Found
1. [BUG-001] Date sorting incorrect
2. [BUG-002] Mobile menu overlap

### Recommendations
- Fix critical bugs before deployment
- Add loading indicators
```

---

## 🚀 Pre-Deployment Checklist

ก่อน deploy ต้องผ่านเงื่อนไขนี้:

- [ ] ทุก Test Case ผ่าน (PASS)
- [ ] ไม่มี Critical/High bugs
- [ ] Build สำเร็จ (`npm run build`)
- [ ] ทดสอบ production build (`npm run preview`)
- [ ] ไม่มี Console Errors
- [ ] ไม่มี Console Warnings (ที่สำคัญ)
- [ ] ทดสอบบน 3+ browsers
- [ ] ทดสอบบน mobile
- [ ] README อัพเดท
- [ ] Documentation ครบ

---

## 📝 Testing Notes

### Known Limitations (Phase 1)
1. Read-only - ไม่สามารถแก้ไขข้อมูล
2. Static data - ใช้ JSON ไม่ได้ real-time
3. No authentication
4. No advanced filters

### Future Testing (Phase 2)
- CRUD operations testing
- Authentication testing
- Data sync testing
- Offline mode testing
- Conflict resolution testing

---

**สร้างโดย:** Claude AI
**อัพเดท:** 2025-10-22
**Version:** 1.0

# Architecture Design: ระบบจัดการทะเบียนแบบครบวงจร
## Registration Management System - Complete Redesign

---

## 📊 ภาพรวมข้อมูล

### สรุปจากการวิเคราะห์ Excel File

**จำนวน Sheets ทั้งหมด:** 14 sheets
**จำนวนข้อมูลทั้งหมด:** 3,014+ รายการ

#### 1️⃣ **Main Data Sheets** (10 sheets - 2,246 รายการ)
| Sheet Name | จำนวนแถว | ประเภทข้อมูล |
|------------|-----------|-------------|
| เครื่องหมายการค้า | 769 | Trademarks |
| ทะเบียนหลัก | 546 | Main Registry |
| กรมวิชาการเกษตร | 546 | Department of Agriculture |
| ทะเบียนที่ได้รับแล้ว | 270 | Approved Registrations |
| กรมปศุสัตว์ | 262 | Livestock |
| ทะเบียนที่ได้รับแล้วO | 137 | Old Approved |
| อย | 130 | FDA |
| ปุ๋ย | 72 | Fertilizers |
| กรมประมง | 56 | Fisheries |
| อุตสาหกรรม | 4 | Industrial |

#### 2️⃣ **Reference/Lookup Sheets** (4 sheets)
- `crop ของ เกษตร` - ข้อมูลพืช (282 rows)
- `ประเภททะเบียน` - ประเภททะเบียน
- `ชื่อบรษัทและยี่ห้อที่ขอยื่น` - บริษัทและยี่ห้อ
- `รายชื่อกรม` - รายชื่อหน่วยงาน

---

## 🏗️ สถาปัตยกรรมระบบใหม่

### 1. Technology Stack

```
Frontend:
├── React 18.3+ (UI Library)
├── Vite 5+ (Build Tool)
├── Tailwind CSS 3+ (Styling)
├── React Router 6 (Navigation)
├── TanStack Table v8 (Advanced Data Table)
├── React Query v4 (Data Fetching & Caching)
├── Zustand (State Management)
├── React Hook Form (Form Management)
├── Zod (Validation)
└── Axios (HTTP Client)

Backend/Data:
├── Google Sheets API v4 (Primary Data Source)
├── IndexedDB (Local Offline Storage)
└── LocalStorage (Settings & Preferences)

Deployment:
├── GitHub Pages (Hosting)
└── GitHub Actions (CI/CD)
```

### 2. Application Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     User Interface Layer                     │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  Dashboard   │  │   Search     │  │  Settings    │      │
│  │   (Stats)    │  │  (Global)    │  │  (Config)    │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│                                                               │
│  ┌─────────────────────────────────────────────────────┐    │
│  │         Multi-Sheet Navigation (Tabs)                │    │
│  ├─────────────────────────────────────────────────────┤    │
│  │ ทะเบียนหลัก │ อย │ เกษตร │ ปศุ │ ประมง │ ... (14) │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                               │
│  ┌─────────────────────────────────────────────────────┐    │
│  │         Dynamic Table Component                      │    │
│  ├─────────────────────────────────────────────────────┤    │
│  │ - Auto-detect columns                                │    │
│  │ - Sortable, Filterable                               │    │
│  │ - Pagination                                          │    │
│  │ - Inline Edit                                         │    │
│  │ - Bulk Actions                                        │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                               │
│  ┌─────────────────────────────────────────────────────┐    │
│  │         Detail View / Edit Form                      │    │
│  │         (Modal or Side Panel)                        │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                               │
├─────────────────────────────────────────────────────────────┤
│                   Business Logic Layer                       │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Sheet      │  │   Search     │  │   Data       │      │
│  │   Manager    │  │   Engine     │  │   Validator  │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│                                                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Status     │  │   Date       │  │   Export     │      │
│  │   Calculator │  │   Calculator │  │   Manager    │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│                                                               │
├─────────────────────────────────────────────────────────────┤
│                    Data Access Layer                         │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌─────────────────────────────────────────────────────┐    │
│  │         Data Sync Manager                            │    │
│  ├─────────────────────────────────────────────────────┤    │
│  │ - Google Sheets ↔ IndexedDB Sync                    │    │
│  │ - Offline Support                                    │    │
│  │ - Conflict Resolution                                │    │
│  │ - Auto Sync on Network Reconnect                     │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Google     │  │  IndexedDB   │  │    Cache     │      │
│  │   Sheets     │  │   (Offline)  │  │   Manager    │      │
│  │   Service    │  │              │  │              │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

---

## 📦 Database Schema Design

### 1. Unified Data Model

```typescript
// Base Registration Model (ทุก sheet จะ extend จากนี้)
interface BaseRegistration {
  id: string; // Auto-generated UUID
  sheetName: string; // Which sheet this belongs to

  // Core Fields (present in most sheets)
  daysRemaining?: string; // "ทะเบียนจำนวนวันขาด / เหลืออีก"
  status?: string; // "สถานะทะเบียน"
  registrationNumber?: string; // "เลขทะเบียน"
  expiryDate?: Date; // "วันหมดอายุทะเบียน"
  tradeName?: string; // "ชื่อการค้า"
  registrationType?: string; // "ประเภททะเบียน"
  department?: string; // "หน่วยงานที่ขึ้นทะเบียน"
  applicant?: string; // "ผู้ขอขึ้นทะเบียน"
  distributor?: string; // "ผู้จัดจำหน่าย"
  documentLink?: string; // "PCT." - Google Drive link
  processStatus?: string; // "ขั้นดำเนินการ"

  // Dynamic Fields (specific to each sheet)
  dynamicFields?: Record<string, any>;

  // Metadata
  createdAt?: Date;
  updatedAt?: Date;
  syncedAt?: Date;
  isLocal?: boolean; // True if created locally, not synced yet
}

// Sheet-specific Models extend BaseRegistration

interface AgricultureRegistration extends BaseRegistration {
  chemicalName?: string; // "ชื่อสารเคมีที่ขอ"
  usageType?: string; // "ประเภทการใช้"
  renewalDate?: Date; // "วันที่ต่ออายุ"
  crop?: string; // For "crop ของ เกษตร" sheet
}

interface ProductionLicenseRegistration extends BaseRegistration {
  productionDaysRemaining?: string; // "ใบอนุญาตผลิตจำนวนวันขาด / เหลืออีก"
  productionStatus?: string; // "สถานะเลขผลิต"
  productionNumber?: string; // "เลขผลิต"
  productionExpiryDate?: Date; // "วันหมดอายุผลิต"
  productionReceiveDate?: Date; // "วันที่ได้รับผลิต"
  registrationReceiveDate?: Date; // "วันที่ได้รับทะเบียน"
  company?: string; // "บริษัท"
  importLicense?: string; // "ใบอนุญาตนำเข้า"
}

interface TrademarkRegistration extends BaseRegistration {
  trademarkNumber?: string; // "ทะเบียนเลขที่"
  applicationNumber?: string; // "คำขอเลขที่"
  ownerName?: string; // "ชื่อเจ้าของเครื่องหมายการค้า"
  brandName?: string; // "ตราสินค้า"
  productCategory?: string; // "จำพวกสินค้า"
  usage?: string; // "ใช้กับ"
}

interface FertilizerRegistration extends BaseRegistration {
  formula?: string; // "สูตรปุ๋ย"
}

interface IndustrialRegistration extends BaseRegistration {
  factoryType?: string; // Type of factory
  image?: string; // Image link
}
```

### 2. IndexedDB Structure

```typescript
// Database: registrationDB
// Version: 1

interface DBSchema {
  // Table: registrations
  registrations: {
    key: string; // UUID
    indexes: {
      sheetName: string;
      status: string;
      department: string;
      expiryDate: Date;
      isLocal: boolean;
    };
    value: BaseRegistration;
  };

  // Table: sheets (metadata about each sheet)
  sheets: {
    key: string; // sheet name
    value: {
      name: string;
      displayName: string;
      rowCount: number;
      columnMapping: Record<string, number>;
      lastSynced: Date;
      isEnabled: boolean;
    };
  };

  // Table: syncQueue (for offline changes)
  syncQueue: {
    key: string; // UUID
    value: {
      id: string;
      action: 'create' | 'update' | 'delete';
      data: BaseRegistration;
      timestamp: Date;
      synced: boolean;
    };
  };
}
```

---

## 🎨 UI/UX Design

### 1. Layout Structure

```
┌─────────────────────────────────────────────────────────────┐
│ Header                                                       │
│ ┌─────────────────────┐  ┌──────────────┐  ┌─────────────┐ │
│ │ 🏠 FMGS Registry   │  │ 🔍 Search    │  │ ⚙️ Settings │ │
│ └─────────────────────┘  └──────────────┘  └─────────────┘ │
├─────────────────────────────────────────────────────────────┤
│ Dashboard (Stats Overview)                                   │
│ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐    │
│ │Total │ │Expired│ │Critical│ │Warning│ │Normal │ │Offline││
│ │3,014 │ │ 456  │ │ 123   │ │ 234   │ │2,201 │ │  12  ││
│ └──────┘ └──────┘ └──────┘ └──────┘ └──────┘ └──────┘    │
├─────────────────────────────────────────────────────────────┤
│ Sheet Navigation (Horizontal Tabs with Counter)             │
│ ┌──────────────────────────────────────────────────────┐   │
│ │ ทั้งหมด(3014) │ ทะเบียนหลัก(546) │ อย(130) │ ...  │   │
│ └──────────────────────────────────────────────────────┘   │
├─────────────────────────────────────────────────────────────┤
│ Filters & Actions Bar                                       │
│ ┌───────────┐ ┌──────────┐ ┌────────┐ ┌────────────────┐  │
│ │ Filter ▼  │ │ Sort ▼   │ │Export ⬇│ │ + Add New      │  │
│ └───────────┘ └──────────┘ └────────┘ └────────────────┘  │
├─────────────────────────────────────────────────────────────┤
│ Data Table (Dynamic Columns based on Sheet)                 │
│ ┌─────────────────────────────────────────────────────┐    │
│ │☑ │สถานะ│เลขทะเบียน│ชื่อการค้า│หมดอายุ│หน่วยงาน│⋮│    │
│ ├─────────────────────────────────────────────────────┤    │
│ │☐ │ขาด  │903/2554  │วีเซนด์ 5 │31/12/16│อย.     │✏│    │
│ │☐ │ปกติ │643-2558  │ฟอร์ล่าร์ │05/08/27│เกษตร  │✏│    │
│ │...                                                   │    │
│ └─────────────────────────────────────────────────────┘    │
│                                                              │
│ Pagination: ◀ 1 2 3 ... 10 ▶  (20/50/100 per page)        │
└─────────────────────────────────────────────────────────────┘
```

### 2. Color Scheme & Status System

```typescript
// Status-based color coding
const statusColors = {
  // Days remaining categories
  expired: {
    bg: 'bg-red-50',
    text: 'text-red-700',
    border: 'border-red-300',
    badge: 'bg-red-100 text-red-800',
    label: 'ขาดอายุ'
  },
  critical: { // 0-30 days
    bg: 'bg-orange-50',
    text: 'text-orange-700',
    border: 'border-orange-300',
    badge: 'bg-orange-100 text-orange-800',
    label: 'วิกฤติ'
  },
  warning: { // 31-90 days
    bg: 'bg-yellow-50',
    text: 'text-yellow-700',
    border: 'border-yellow-300',
    badge: 'bg-yellow-100 text-yellow-800',
    label: 'ระวัง'
  },
  nearExpiry: { // 91-180 days
    bg: 'bg-blue-50',
    text: 'text-blue-700',
    border: 'border-blue-300',
    badge: 'bg-blue-100 text-blue-800',
    label: 'ใกล้หมด'
  },
  normal: { // >180 days
    bg: 'bg-green-50',
    text: 'text-green-700',
    border: 'border-green-300',
    badge: 'bg-green-100 text-green-800',
    label: 'ปกติ'
  },
  offline: { // Unsynchronized data
    bg: 'bg-gray-50',
    text: 'text-gray-700',
    border: 'border-gray-300',
    badge: 'bg-gray-100 text-gray-800',
    label: 'ออฟไลน์'
  }
};
```

---

## 🔍 Features & Functionality

### 1. ✅ Core Features

#### A. Multi-Sheet Support
- [x] Auto-detect all sheets from Google Sheets
- [x] Display tabs for each sheet
- [x] Show row count on each tab
- [x] Lazy-load data when switching sheets
- [x] Cache sheet data for performance

#### B. Dynamic Table
- [x] Auto-detect columns from headers
- [x] Render different columns for each sheet
- [x] Sortable columns (click header)
- [x] Resizable columns (drag border)
- [x] Sticky header on scroll
- [x] Virtual scrolling for large datasets
- [x] Responsive design (mobile-friendly)

#### C. Advanced Search
```typescript
interface SearchConfig {
  // Global search across all sheets
  globalSearch: boolean;

  // Search fields
  searchIn: string[]; // Which fields to search

  // Search operators
  operators: {
    contains: boolean; // Default
    exact: boolean;
    startsWith: boolean;
    endsWith: boolean;
    regex: boolean;
  };

  // Filters
  filters: {
    department?: string[];
    status?: string[];
    registrationType?: string[];
    dateRange?: {
      field: 'expiryDate' | 'createdAt' | 'updatedAt';
      from?: Date;
      to?: Date;
    };
  };
}
```

#### D. CRUD Operations
```typescript
interface CRUDOperations {
  // Create
  create: (sheetName: string, data: BaseRegistration) => Promise<void>;

  // Read
  getAll: (sheetName: string, filters?: Filters) => Promise<BaseRegistration[]>;
  getById: (id: string) => Promise<BaseRegistration>;

  // Update
  update: (id: string, data: Partial<BaseRegistration>) => Promise<void>;

  // Delete
  delete: (id: string) => Promise<void>;

  // Bulk operations
  bulkCreate: (sheetName: string, data: BaseRegistration[]) => Promise<void>;
  bulkUpdate: (updates: Array<{id: string, data: Partial<BaseRegistration>}>) => Promise<void>;
  bulkDelete: (ids: string[]) => Promise<void>;
}
```

#### E. Data Synchronization
```typescript
interface SyncStrategy {
  // Sync modes
  mode: 'auto' | 'manual' | 'scheduled';

  // Auto sync interval (milliseconds)
  interval?: number; // e.g., 60000 = 1 minute

  // Conflict resolution
  conflictResolution: 'server-wins' | 'client-wins' | 'manual';

  // Sync operations
  syncFromGoogleSheets: () => Promise<void>;
  syncToGoogleSheets: () => Promise<void>;
  syncBidirectional: () => Promise<void>;

  // Offline queue
  queueLocalChanges: (changes: Change[]) => void;
  syncQueuedChanges: () => Promise<void>;
}
```

#### F. Export/Import
```typescript
interface ExportOptions {
  format: 'xlsx' | 'csv' | 'json' | 'pdf';
  sheets: string[]; // Which sheets to export
  filters?: Filters; // Export filtered data
  includeMetadata: boolean;
}

interface ImportOptions {
  source: 'file' | 'google-sheets' | 'url';
  format: 'xlsx' | 'csv' | 'json';
  sheetMapping: Record<string, string>; // Map imported sheets to existing
  duplicateHandling: 'skip' | 'overwrite' | 'merge';
}
```

### 2. 🎯 Advanced Features

#### A. Dashboard Analytics
- Total registrations count
- Status breakdown (expired, critical, warning, normal)
- Department-wise distribution
- Expiry timeline (upcoming expirations)
- Recent activities
- Offline pending changes count

#### B. Smart Notifications
```typescript
interface NotificationSystem {
  // Notification types
  types: {
    expiryReminder: {
      enabled: boolean;
      daysBeforeExpiry: number[]; // [30, 60, 90, 180]
    };
    syncStatus: boolean;
    errorAlerts: boolean;
  };

  // Delivery channels
  channels: {
    inApp: boolean; // Browser notifications
    email?: string; // Future: email notifications
  };
}
```

#### C. Batch Operations
- Select multiple rows
- Bulk update status
- Bulk delete
- Bulk export selected
- Bulk change department/applicant

#### D. Column Customization
- Show/hide columns
- Reorder columns (drag & drop)
- Save column preferences per sheet
- Reset to default

#### E. Data Validation
```typescript
interface ValidationRules {
  // Field validations
  registrationNumber: {
    required: boolean;
    pattern?: RegExp;
    unique: boolean;
  };

  expiryDate: {
    required: boolean;
    futureDate?: boolean;
    minDate?: Date;
  };

  // Custom validations per sheet
  sheetValidations: Record<string, FieldValidation[]>;
}
```

---

## 🔧 Technical Implementation Plan

### Phase 1: Foundation (Week 1)
1. Setup new project structure
2. Install dependencies
3. Setup Google Sheets API integration
4. Implement IndexedDB wrapper
5. Create base data models
6. Setup routing

### Phase 2: Core UI (Week 2)
1. Create layout components
2. Implement multi-sheet navigation
3. Build dynamic table component
4. Create dashboard with stats
5. Implement search UI

### Phase 3: Data Layer (Week 3)
1. Implement CRUD operations
2. Setup data synchronization
3. Implement offline support
4. Add conflict resolution
5. Create sync queue manager

### Phase 4: Advanced Features (Week 4)
1. Implement export/import
2. Add batch operations
3. Create notification system
4. Implement column customization
5. Add data validation

### Phase 5: Polish & Deploy (Week 5)
1. Responsive design optimization
2. Performance optimization
3. Error handling & logging
4. Documentation
5. Testing
6. GitHub Pages deployment

---

## 📁 Project Structure

```
fmgs-registration-doc-gov/
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Button.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── Modal.jsx
│   │   │   ├── Badge.jsx
│   │   │   └── LoadingSpinner.jsx
│   │   ├── layout/
│   │   │   ├── Header.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── Footer.jsx
│   │   ├── dashboard/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── StatCard.jsx
│   │   │   └── ChartCard.jsx
│   │   ├── sheets/
│   │   │   ├── SheetTabs.jsx
│   │   │   ├── SheetTable.jsx
│   │   │   ├── SheetRow.jsx
│   │   │   └── ColumnSettings.jsx
│   │   ├── search/
│   │   │   ├── GlobalSearch.jsx
│   │   │   ├── AdvancedFilters.jsx
│   │   │   └── SearchResults.jsx
│   │   └── forms/
│   │       ├── RegistrationForm.jsx
│   │       ├── FormField.jsx
│   │       └── FormValidation.jsx
│   ├── services/
│   │   ├── googleSheets.service.js
│   │   ├── indexedDB.service.js
│   │   ├── sync.service.js
│   │   ├── search.service.js
│   │   ├── export.service.js
│   │   └── validation.service.js
│   ├── store/
│   │   ├── useSheetStore.js
│   │   ├── useAuthStore.js
│   │   ├── useSearchStore.js
│   │   └── useSyncStore.js
│   ├── hooks/
│   │   ├── useRegistrations.js
│   │   ├── useSheets.js
│   │   ├── useSearch.js
│   │   ├── useSync.js
│   │   └── useOffline.js
│   ├── utils/
│   │   ├── dateUtils.js
│   │   ├── statusUtils.js
│   │   ├── columnDetection.js
│   │   ├── exportUtils.js
│   │   └── validators.js
│   ├── config/
│   │   ├── constants.js
│   │   ├── sheetMappings.js
│   │   ├── statusConfig.js
│   │   └── tableConfig.js
│   ├── types/
│   │   ├── registration.types.ts
│   │   ├── sheet.types.ts
│   │   └── sync.types.ts
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── SheetViewPage.jsx
│   │   ├── SearchPage.jsx
│   │   └── SettingsPage.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── public/
│   └── favicon.ico
├── docs/
│   ├── ARCHITECTURE_DESIGN.md (this file)
│   ├── API_DOCUMENTATION.md
│   ├── USER_GUIDE.md
│   └── DEPLOYMENT.md
├── .env.example
├── .gitignore
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

---

## 🚀 Deployment Strategy

### 1. Build Configuration

```javascript
// vite.config.js
export default defineConfig({
  plugins: [react()],
  base: '/fmgs-registration-doc-gov/',
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom', 'react-router-dom'],
          'table': ['@tanstack/react-table'],
          'utils': ['axios', 'date-fns', 'zod']
        }
      }
    }
  },
  optimizeDeps: {
    include: ['react', 'react-dom']
  }
});
```

### 2. GitHub Actions Workflow

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main, master]
  workflow_dispatch:

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build
        env:
          VITE_GOOGLE_SHEETS_API_KEY: ${{ secrets.VITE_GOOGLE_SHEETS_API_KEY }}
          VITE_GOOGLE_SHEETS_SHEET_ID: ${{ secrets.VITE_GOOGLE_SHEETS_SHEET_ID }}

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

### 3. Environment Variables

```bash
# .env
VITE_GOOGLE_SHEETS_API_KEY=AIzaSyCckaOEU3wxiebvoLey2yZhjmOrO0A9jcI
VITE_GOOGLE_SHEETS_SHEET_ID=1BvX6lFsf3HrDvlopXt7PiyccVNM6-G1fNTIge3A_u6Y
VITE_APP_NAME=FMGS Registration System
VITE_SYNC_INTERVAL=60000
VITE_ITEMS_PER_PAGE=20
```

---

## 🎓 Key Technical Decisions

### 1. Why TanStack Table?
- Best-in-class table library for React
- Built-in sorting, filtering, pagination
- Virtual scrolling for performance
- Highly customizable
- TypeScript support

### 2. Why Zustand over Redux?
- Simpler API, less boilerplate
- Better TypeScript support
- Smaller bundle size
- Middleware support for persistence

### 3. Why IndexedDB over LocalStorage?
- Can store much larger amounts of data
- Better performance for complex queries
- Supports indexes for fast lookups
- Can store binary data (future: attachments)

### 4. Why React Query?
- Automatic caching and background refetching
- Built-in loading/error states
- Optimistic updates
- Offline support via persister

### 5. Google Sheets as Database?
**Pros:**
- Easy to use, familiar interface
- Real-time collaboration
- Free (within API limits)
- Version history
- No backend needed

**Cons:**
- API rate limits (100 requests per 100 seconds per user)
- Not ideal for high-frequency writes
- Limited query capabilities

**Solution:**
- Use IndexedDB for local cache
- Batch updates to reduce API calls
- Implement optimistic UI updates
- Fallback to offline mode if API fails

---

## 📊 Performance Optimizations

### 1. Data Loading
- Lazy load sheets (only load when viewed)
- Virtual scrolling for large tables
- Pagination with adjustable page size
- Cache sheet metadata
- Debounce search input

### 2. API Calls
- Batch API requests
- Cache responses with React Query
- Use `fields` parameter to reduce payload
- Implement request deduplication
- Retry failed requests with exponential backoff

### 3. Rendering
- React.memo for expensive components
- useMemo for computed values
- useCallback for event handlers
- Code splitting with React.lazy
- Optimize re-renders with Zustand selectors

### 4. Bundle Size
- Tree-shaking with Vite
- Dynamic imports for routes
- Compress images and assets
- Use lightweight alternatives where possible
- Analyze bundle with rollup-plugin-visualizer

---

## 🔒 Security Considerations

### 1. API Key Protection
- Store API key in GitHub Secrets
- Inject at build time (not runtime)
- Never commit .env to git
- Use environment variables

### 2. Data Validation
- Validate all user inputs
- Sanitize data before display
- Use Zod for runtime validation
- Prevent XSS attacks

### 3. Google Sheets Permissions
- Set sheets to "Anyone with link can view"
- Use API key (not OAuth) for simplicity
- Monitor API usage
- Implement rate limiting on client side

---

## 📈 Future Enhancements

### Phase 2 Features (Optional)
1. **User Authentication**
   - Login system
   - Role-based access control
   - User-specific preferences

2. **Real Backend**
   - Move from Google Sheets to PostgreSQL/MongoDB
   - REST API or GraphQL
   - File uploads for attachments

3. **Advanced Analytics**
   - Charts and graphs
   - Custom reports
   - Data export templates

4. **Notifications**
   - Email reminders for expiring registrations
   - SMS notifications
   - Push notifications

5. **Mobile App**
   - React Native app
   - Offline-first architecture
   - Camera integration for document scanning

---

## 🎯 Success Metrics

1. **Performance**
   - Initial load < 3 seconds
   - Table render < 500ms for 1000 rows
   - Search results < 200ms

2. **Reliability**
   - 99.9% uptime
   - Offline mode works seamlessly
   - Data sync success rate > 99%

3. **Usability**
   - Mobile responsive (works on all devices)
   - Accessible (WCAG 2.1 AA)
   - Intuitive UI (minimal training needed)

---

**Document Version:** 1.0
**Last Updated:** 2025-10-22
**Author:** Claude (AI Assistant)
**Status:** Design Complete - Ready for Implementation

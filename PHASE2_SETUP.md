# Phase 2 Setup Guide
## CRUD Operations with Supabase

---

## 🎯 Phase 2 Goals

### Core Features:
1. ✅ **CRUD Operations** - Create, Read, Update, Delete
2. ✅ **Supabase Integration** - PostgreSQL database
3. ✅ **Authentication** - User login system
4. ✅ **Offline Support** - IndexedDB + Sync
5. ✅ **Advanced Features** - Filters, Export, Bulk operations

---

## 📋 Prerequisites

### 1. Supabase Account

Create free account at: https://supabase.com

**Features included (Free tier):**
- 500 MB database
- 1 GB file storage
- 50 MB bandwidth/month
- Unlimited API requests
- Real-time subscriptions
- Row Level Security

### 2. Required Tools

```bash
# Already installed:
- Node.js 18+
- npm
- Git

# Will install:
- @supabase/supabase-js (already in package.json)
```

---

## 🗄️ Database Schema Design

### Tables to Create

#### 1. `registrations` (Main table)

```sql
CREATE TABLE registrations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sheet_name TEXT NOT NULL,

  -- Core fields
  days_remaining_text TEXT,
  days_remaining INTEGER,
  status TEXT,
  registration_number TEXT,
  expiry_date DATE,
  trade_name TEXT,
  chemical_name TEXT,
  registration_type TEXT,
  department TEXT,
  applicant TEXT,
  distributor TEXT,
  document_link TEXT,
  process_status TEXT,

  -- Dynamic fields (JSONB for flexibility)
  dynamic_fields JSONB,

  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id),
  updated_by UUID REFERENCES auth.users(id),

  -- Search optimization
  search_vector TSVECTOR
);

-- Indexes for performance
CREATE INDEX idx_registrations_sheet ON registrations(sheet_name);
CREATE INDEX idx_registrations_status ON registrations(status);
CREATE INDEX idx_registrations_department ON registrations(department);
CREATE INDEX idx_registrations_expiry ON registrations(expiry_date);
CREATE INDEX idx_registrations_search ON registrations USING GIN(search_vector);

-- Full-text search trigger
CREATE TRIGGER registrations_search_update
BEFORE INSERT OR UPDATE ON registrations
FOR EACH ROW EXECUTE FUNCTION
tsvector_update_trigger(search_vector, 'pg_catalog.thai',
  trade_name, chemical_name, registration_number);
```

#### 2. `sheets_metadata` (Sheet information)

```sql
CREATE TABLE sheets_metadata (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT UNIQUE NOT NULL,
  display_name TEXT,
  row_count INTEGER DEFAULT 0,
  column_count INTEGER DEFAULT 0,
  column_mapping JSONB,
  is_enabled BOOLEAN DEFAULT true,
  last_synced TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### 3. `sync_queue` (For offline support)

```sql
CREATE TABLE sync_queue (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  action TEXT NOT NULL, -- 'create', 'update', 'delete'
  table_name TEXT NOT NULL,
  record_id UUID,
  data JSONB,
  user_id UUID REFERENCES auth.users(id),
  synced BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  synced_at TIMESTAMPTZ
);

CREATE INDEX idx_sync_queue_synced ON sync_queue(synced);
CREATE INDEX idx_sync_queue_user ON sync_queue(user_id);
```

#### 4. `user_preferences` (User settings)

```sql
CREATE TABLE user_preferences (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id),
  column_visibility JSONB,
  items_per_page INTEGER DEFAULT 20,
  theme TEXT DEFAULT 'light',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### 5. `audit_log` (Track changes)

```sql
CREATE TABLE audit_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  table_name TEXT NOT NULL,
  record_id UUID,
  action TEXT NOT NULL,
  old_data JSONB,
  new_data JSONB,
  user_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_audit_log_table ON audit_log(table_name, record_id);
CREATE INDEX idx_audit_log_user ON audit_log(user_id);
```

---

## 🔐 Row Level Security (RLS)

### Enable RLS:

```sql
-- Enable RLS on all tables
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE sheets_metadata ENABLE ROW LEVEL SECURITY;
ALTER TABLE sync_queue ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_log ENABLE ROW LEVEL SECURITY;
```

### Policies:

```sql
-- Registrations: All authenticated users can read
CREATE POLICY "Public read access" ON registrations
  FOR SELECT
  USING (true);

-- Registrations: Only authenticated users can insert/update/delete
CREATE POLICY "Authenticated users can insert" ON registrations
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update" ON registrations
  FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete" ON registrations
  FOR DELETE
  USING (auth.role() = 'authenticated');

-- User preferences: Users can only access their own
CREATE POLICY "Users can read own preferences" ON user_preferences
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own preferences" ON user_preferences
  FOR UPDATE
  USING (auth.uid() = user_id);
```

---

## 📦 Data Migration

### Import Existing Data to Supabase

```javascript
// scripts/migrate-to-supabase.js
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY // Use service key for migration
);

async function migrateData() {
  // Load all data
  const allData = JSON.parse(
    fs.readFileSync('./data/all-data.json', 'utf-8')
  );

  for (const [sheetName, records] of Object.entries(allData)) {
    console.log(`Migrating ${sheetName}: ${records.length} records...`);

    // Transform to Supabase format
    const transformed = records.map(record => ({
      sheet_name: sheetName,
      days_remaining_text: record['ทะเบียนจำนวนวันขาด / เหลืออีก'],
      status: record['สถานะทะเบียน'],
      registration_number: record['เลขทะเบียน'],
      expiry_date: record['วันหมดอายุทะเบียน'],
      trade_name: record['ชื่อการค้า'],
      chemical_name: record['ชื่อสารเคมีที่ขอ'],
      registration_type: record['ประเภททะเบียน'],
      department: record['หน่วยงานที่ขึ้นทะเบียน'],
      applicant: record['ผู้ขอขึ้นทะเบียน'],
      distributor: record['ผู้จัดจำหน่าย'],
      document_link: record['PCT.'],
      process_status: record['ขั้นดำเนินการ'],
      dynamic_fields: record, // Store full record
    }));

    // Batch insert (1000 at a time)
    const batchSize = 1000;
    for (let i = 0; i < transformed.length; i += batchSize) {
      const batch = transformed.slice(i, i + batchSize);
      const { error } = await supabase
        .from('registrations')
        .insert(batch);

      if (error) {
        console.error(`Error in batch ${i / batchSize + 1}:`, error);
      } else {
        console.log(`  Batch ${i / batchSize + 1} done`);
      }
    }
  }

  console.log('✅ Migration complete!');
}

migrateData();
```

---

## 🔧 Supabase Configuration

### 1. Create Project

1. Go to https://supabase.com/dashboard
2. Click "New Project"
3. Name: `fmgs-registration`
4. Database Password: (generate strong password)
5. Region: Southeast Asia (Singapore)
6. Click "Create new project"
7. Wait ~2 minutes

### 2. Get API Keys

Settings → API → Project API keys:
- `anon` key - for client-side
- `service_role` key - for server-side (keep secret!)

### 3. Update `.env`

```bash
# .env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key

# .env.local (for migration script, DO NOT commit)
SUPABASE_SERVICE_KEY=your-service-role-key
```

### 4. Add to GitHub Secrets

Settings → Secrets and variables → Actions:
```
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
```

---

## 🔌 Supabase Client Setup

### Create Supabase Client

```javascript
// src/services/supabase.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
  db: {
    schema: 'public',
  },
  realtime: {
    enabled: true,
  },
});

// Auth helpers
export const auth = {
  signUp: (email, password) =>
    supabase.auth.signUp({ email, password }),

  signIn: (email, password) =>
    supabase.auth.signInWithPassword({ email, password }),

  signOut: () =>
    supabase.auth.signOut(),

  getSession: () =>
    supabase.auth.getSession(),

  onAuthStateChange: (callback) =>
    supabase.auth.onAuthStateChange(callback),
};

// Database helpers
export const db = {
  registrations: () => supabase.from('registrations'),
  sheetsMetadata: () => supabase.from('sheets_metadata'),
  syncQueue: () => supabase.from('sync_queue'),
  userPreferences: () => supabase.from('user_preferences'),
  auditLog: () => supabase.from('audit_log'),
};
```

---

## 📝 Implementation Plan

### Week 1: Supabase Setup & CRUD
- [ ] Create Supabase project
- [ ] Create database tables
- [ ] Set up RLS policies
- [ ] Migrate existing data
- [ ] Create Supabase service
- [ ] Implement CRUD operations
- [ ] Add form for Create/Update
- [ ] Add delete confirmation

### Week 2: Authentication
- [ ] Implement sign up/sign in
- [ ] Add protected routes
- [ ] Add user profile
- [ ] Add logout
- [ ] Test authentication flow

### Week 3: Offline Support
- [ ] Implement IndexedDB wrapper
- [ ] Add sync queue
- [ ] Implement conflict resolution
- [ ] Add online/offline detection
- [ ] Test offline functionality

### Week 4: Advanced Features
- [ ] Add advanced filters
- [ ] Implement bulk operations
- [ ] Add export functionality
- [ ] Add file attachments
- [ ] Performance optimization

### Week 5: Testing & Polish
- [ ] Write tests
- [ ] Bug fixes
- [ ] Documentation
- [ ] Deployment
- [ ] User acceptance testing

---

## ✅ Phase 2 Checklist

### Setup
- [ ] Create Supabase account
- [ ] Create project
- [ ] Get API keys
- [ ] Update `.env`
- [ ] Add GitHub secrets

### Database
- [ ] Create tables
- [ ] Set up RLS
- [ ] Create indexes
- [ ] Migrate data
- [ ] Test queries

### Code
- [ ] Install dependencies
- [ ] Create Supabase client
- [ ] Implement CRUD service
- [ ] Update components
- [ ] Add forms
- [ ] Add authentication UI

### Testing
- [ ] Test CRUD operations
- [ ] Test authentication
- [ ] Test offline mode
- [ ] Test performance
- [ ] Fix bugs

### Deployment
- [ ] Update build scripts
- [ ] Test production build
- [ ] Deploy to GitHub Pages
- [ ] Verify live site

---

## 📚 Resources

- [Supabase Docs](https://supabase.com/docs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
- [Real-time](https://supabase.com/docs/guides/realtime)

---

**Ready to start Phase 2!** 🚀

Let's implement CRUD operations with Supabase! 💪

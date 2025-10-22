# 🔐 Authentication Setup Guide

## Overview

The system now requires authentication to view data. Users must create an account and verify their email via OTP (One-Time Password) before accessing the application.

## Features Implemented

✅ **Email/Password Authentication** - Secure login system
✅ **Email Verification (OTP)** - Supabase sends verification link to email
✅ **User Signup Flow** - Two-step process with email confirmation
✅ **Protected Routes** - All main pages require authentication
✅ **User Profile Menu** - Sign out functionality in header
✅ **Session Persistence** - Stay logged in across browser sessions
✅ **Password Reset** - Forgot password functionality (ready to use)

---

## Quick Start

### 1. Create Supabase Project

1. Go to https://supabase.com and sign up/login
2. Click "New Project"
3. Fill in:
   - **Project name**: `fmgs-registration`
   - **Database password**: (choose a strong password)
   - **Region**: Choose closest to Thailand (e.g., Singapore)
4. Click "Create new project" and wait 2-3 minutes

### 2. Get Your Supabase Credentials

1. In your Supabase project dashboard, click the **Settings** (⚙️) icon in the sidebar
2. Navigate to **API** section
3. Copy these values:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **anon/public key** → `VITE_SUPABASE_ANON_KEY`

### 3. Configure Environment Variables

1. Create a `.env` file in the project root:
```bash
cp .env.example .env
```

2. Edit `.env` and add your Supabase credentials:
```bash
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### 4. Enable Email Authentication in Supabase

1. In Supabase dashboard, go to **Authentication** → **Providers**
2. Make sure **Email** is enabled (it's enabled by default)
3. Scroll down to **Email Templates**
4. Customize the verification email template (optional):
   - Click "Confirm signup"
   - Edit the subject and body to be in Thai if desired

### 5. Configure Email Settings (Optional but Recommended)

By default, Supabase sends emails from their domain. For production, you should use your own SMTP:

1. Go to **Authentication** → **Email Templates** → **SMTP Settings**
2. Configure your email provider (Gmail, SendGrid, etc.)

For development, the default Supabase email works fine.

### 6. Test the Authentication Flow

1. Start the development server:
```bash
npm run dev
```

2. Open http://localhost:5173

3. You should be redirected to the login page since routes are now protected

4. Click "สมัครสมาชิก" (Sign up) to create an account

5. Fill in the form:
   - Email: Use a real email address you can access
   - Password: At least 6 characters
   - Display Name: Your name

6. Click submit - you'll see a "Check your email" screen

7. Open your email inbox and look for an email from Supabase

8. Click the verification link in the email

9. Return to the app and click "กลับไปล็อกอิน" (Back to login)

10. Login with your email and password

11. You should now see the dashboard with your user menu in the header

---

## User Flow

### Signup Process
```
1. User fills signup form (email, password, display name)
   ↓
2. System sends verification email with OTP link
   ↓
3. User clicks link in email
   ↓
4. Account is verified
   ↓
5. User can now login
```

### Login Process
```
1. User enters email and password
   ↓
2. System validates credentials
   ↓
3. User is redirected to dashboard
   ↓
4. Session is saved (stays logged in)
```

### Protected Routes
All main routes require authentication:
- `/` - Dashboard (HomePage)
- `/sheet/:sheetName` - Sheet view
- `/search` - Search page

Public routes (no authentication required):
- `/login` - Login page
- `/signup` - Signup page

---

## Troubleshooting

### "Email not confirmed" error
**Problem:** User tries to login before clicking the verification link
**Solution:**
1. Check your email inbox (and spam folder)
2. Click the verification link
3. Wait a few seconds for verification to process
4. Try logging in again

### "Invalid credentials" error
**Problem:** Wrong email or password
**Solution:**
1. Double-check email address
2. Make sure password is correct
3. Use "ลืมรหัสผ่าน?" (Forgot password) to reset if needed

### "Supabase not configured" message
**Problem:** Environment variables not set correctly
**Solution:**
1. Make sure `.env` file exists in project root
2. Verify `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are set
3. Restart the dev server: `npm run dev`

### Verification email not received
**Problem:** Email not arriving
**Solution:**
1. Check spam/junk folder
2. Wait a few minutes (can take up to 5 minutes)
3. In Supabase dashboard, go to **Authentication** → **Users** to verify the user was created
4. Check Supabase **Logs** for any errors

### Development vs Production
**Development:**
- Supabase emails work out of the box
- Email goes to your test inbox

**Production (GitHub Pages):**
- Configure custom SMTP in Supabase
- Set up a custom email domain
- Update redirect URLs in Supabase:
  - Go to **Authentication** → **URL Configuration**
  - Add your GitHub Pages URL to "Redirect URLs"
  - Example: `https://yourusername.github.io/fmgs-registration-doc-gov`

---

## Advanced Configuration

### Password Reset Flow

The password reset functionality is already implemented. Users can:

1. Click "ลืมรหัสผ่าน?" on login page
2. Enter their email
3. Receive a password reset link via email
4. Click the link to set a new password

### Custom Email Templates

To customize email templates in Thai:

1. Go to Supabase **Authentication** → **Email Templates**
2. Edit templates:
   - **Confirm signup** - Verification email
   - **Reset password** - Password reset email
   - **Change email** - Email change confirmation

Example Thai template for "Confirm signup":
```
Subject: ยืนยันอีเมลของคุณ - FMGS Registration System

Body:
สวัสดีครับ/ค่ะ,

กรุณาคลิกลิงก์ด้านล่างเพื่อยืนยันอีเมลและเปิดใช้งานบัญชีของคุณ:

{{ .ConfirmationURL }}

ขอบคุณครับ/ค่ะ,
FMGS Registration Team
```

### Session Management

Sessions are configured to:
- Persist across browser restarts (localStorage)
- Auto-refresh before expiration
- Logout automatically after 7 days of inactivity

To customize session duration:
1. Go to Supabase **Authentication** → **Settings**
2. Adjust **JWT expiry** (default: 3600 seconds = 1 hour)
3. Adjust **Refresh token expiry** (default: 604800 seconds = 7 days)

---

## File Structure

```
src/
├── components/
│   ├── auth/
│   │   └── ProtectedRoute.jsx       # Route protection wrapper
│   └── layout/
│       └── Header.jsx                # Updated with user menu
├── pages/
│   ├── LoginPage.jsx                 # Login interface
│   └── SignupPage.jsx                # Signup interface
├── store/
│   └── useAuthStore.js              # Authentication state management
├── services/
│   └── supabase.js                  # Supabase client and API
└── App.jsx                          # Route configuration with protection
```

---

## Next Steps

After authentication is working:

1. **Create Admin Users** - Manually add admin role in Supabase database
2. **Add Role-Based Access Control** - Restrict certain features to admins
3. **Enable Multi-Factor Authentication** - Add SMS or TOTP for extra security
4. **Monitor Usage** - Use Supabase dashboard to track user signups and logins
5. **Backup User Data** - Regularly export user list from Supabase

---

## Security Best Practices

✅ **Environment Variables** - Never commit `.env` to Git (already in `.gitignore`)
✅ **HTTPS Only** - Supabase requires HTTPS in production
✅ **Strong Passwords** - Minimum 6 characters enforced
✅ **Email Verification** - Required before login
✅ **Row Level Security** - Enable RLS in Supabase database (Phase 2)
✅ **Session Timeout** - Automatic logout after inactivity

---

## Support

For issues or questions:
1. Check Supabase documentation: https://supabase.com/docs/guides/auth
2. Review `TROUBLESHOOTING.md` in this project
3. Check browser console for error messages
4. Review Supabase dashboard logs

---

**Note:** This guide assumes you're using the free tier of Supabase. The free tier includes:
- 50,000 monthly active users
- 500 MB database space
- Unlimited API requests
- Social OAuth providers
- Row Level Security

This is more than sufficient for most use cases.

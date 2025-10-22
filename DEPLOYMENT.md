# Deployment Guide - GitHub Pages

## 🚀 How to Deploy Phase 1

### Option 1: Automatic via GitHub Actions (Recommended)

#### Step 1: Merge to Main Branch

```bash
# Create Pull Request (via GitHub UI)
# 1. Go to: https://github.com/consdevs/fmgs-registration-doc-gov/pulls
# 2. Click "New Pull Request"
# 3. Choose: base: main <- compare: claude/add-troubleshooting-guide-011CUNTbcfrghDqaKydXtdn9
# 4. Title: "Phase 1: Complete Redesign with Multi-Sheet Support"
# 5. Click "Create Pull Request"
# 6. Review and click "Merge Pull Request"
```

#### Step 2: GitHub Actions Auto-Deploy

Once merged to `main`, GitHub Actions will automatically:
1. Build the project (`npm run build`)
2. Deploy to GitHub Pages
3. Available at: https://consdevs.github.io/fmgs-registration-doc-gov/

**Timeline:** ~2-3 minutes after merge

---

### Option 2: Manual Deployment

If you prefer manual control:

```bash
# 1. Checkout main branch
git checkout main

# 2. Pull latest changes
git pull origin main

# 3. Install dependencies
npm install

# 4. Build
npm run build

# 5. Deploy
npm run deploy
```

This will:
- Build to `dist/` folder
- Push to `gh-pages` branch
- Deploy automatically

---

## 🔧 GitHub Pages Settings

### Enable GitHub Pages

1. Go to repository Settings
2. Navigate to "Pages" (left sidebar)
3. Source: Deploy from a branch
4. Branch: `gh-pages` (root)
5. Click "Save"

### Add Environment Secrets (for Phase 2)

Settings → Secrets and variables → Actions → New repository secret

Add these secrets:
```
VITE_GOOGLE_SHEETS_API_KEY = AIzaSyCckaOEU3wxiebvoLey2yZhjmOrO0A9jcI
VITE_GOOGLE_SHEETS_SHEET_ID = 1BvX6lFsf3HrDvlopXt7PiyccVNM6-G1fNTIge3A_u6Y
VITE_SUPABASE_URL = (your Supabase URL)
VITE_SUPABASE_ANON_KEY = (your Supabase anon key)
```

---

## ✅ Post-Deployment Checklist

After deployment, verify:

- [ ] Site loads: https://consdevs.github.io/fmgs-registration-doc-gov/
- [ ] Dashboard shows statistics
- [ ] All 14 sheet tabs visible
- [ ] Can switch between sheets
- [ ] Table displays data
- [ ] Sorting works
- [ ] Pagination works
- [ ] Search works
- [ ] No console errors
- [ ] Mobile responsive

---

## 🐛 Troubleshooting Deployment

### Issue: 404 Error

**Cause:** Base path incorrect

**Fix:** Check `vite.config.js`:
```javascript
export default defineConfig({
  plugins: [react()],
  base: '/fmgs-registration-doc-gov/', // Must match repo name
})
```

### Issue: Blank Page

**Cause:** Asset paths incorrect

**Fix:**
1. Check browser console for errors
2. Verify `base` in `vite.config.js`
3. Ensure `BrowserRouter basename` matches:
```javascript
<BrowserRouter basename="/fmgs-registration-doc-gov">
```

### Issue: Data Not Loading

**Cause:** JSON files not in public folder

**Fix:**
```bash
# Ensure data is in public/
cp -r data public/
git add public/data
git commit -m "fix: Add data to public folder"
git push
```

### Issue: GitHub Actions Failed

**Check:**
1. Go to Actions tab
2. Click on failed workflow
3. Check error logs
4. Common fixes:
   - Add missing secrets
   - Check Node version (should be 18+)
   - Verify package.json scripts

---

## 🔄 Update Deployment

To update the live site:

```bash
# 1. Make changes
# 2. Commit
git add .
git commit -m "your message"

# 3. Push to main
git push origin main

# GitHub Actions will auto-deploy
```

Or manual:
```bash
npm run build
npm run deploy
```

---

## 📊 Monitoring

### View Deployment Status

**GitHub Actions:**
- Go to: Actions tab
- See: Build and Deploy status
- Logs: Click on workflow run

**GitHub Pages:**
- Go to: Settings → Pages
- See: "Your site is live at..."
- Click to visit

### Analytics (Future)

Add Google Analytics:
1. Get tracking ID
2. Add to `index.html`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
```

---

## 🔐 Security

### Environment Variables

**Never commit:**
- `.env` file
- API keys
- Secrets

**Always use:**
- GitHub Secrets for CI/CD
- `.env.example` for documentation

### HTTPS

GitHub Pages automatically provides HTTPS:
- `https://consdevs.github.io/fmgs-registration-doc-gov/`
- SSL certificate auto-managed

---

## 🌐 Custom Domain (Optional)

To use custom domain:

1. Buy domain (e.g., fmgs-registry.com)
2. Add DNS records:
   ```
   Type: CNAME
   Name: www
   Value: consdevs.github.io
   ```
3. GitHub Settings → Pages → Custom domain
4. Enter: www.fmgs-registry.com
5. Enable "Enforce HTTPS"

---

## 📈 Performance Optimization

### Already Optimized:

✅ Vite production build (minified)
✅ Code splitting
✅ Gzip compression (88KB bundle)
✅ Asset optimization

### Further Optimization:

For even better performance:

```javascript
// vite.config.js
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom'],
          'table': ['@tanstack/react-table'],
        }
      }
    }
  }
})
```

---

## 📝 Deployment Commands Reference

```bash
# Development
npm run dev              # Start dev server (localhost:5173)

# Production Build
npm run build            # Build to dist/
npm run preview          # Preview production build

# Deployment
npm run deploy           # Build + Deploy to gh-pages

# Git Operations
git add .
git commit -m "message"
git push origin main     # Trigger auto-deploy
```

---

## 🎯 Next Steps After Deployment

1. ✅ **Verify deployment** - Check all features work
2. ✅ **Share URL** - Send to stakeholders
3. ✅ **Monitor** - Watch for issues
4. 📋 **Phase 2** - Start CRUD implementation
5. 🔄 **Iterate** - Gather feedback, improve

---

## 📞 Support

### Deployment Issues?

1. Check GitHub Actions logs
2. Review this guide
3. Check TROUBLESHOOTING.md
4. Open GitHub Issue

### Resources:

- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [GitHub Pages Docs](https://docs.github.com/en/pages)
- [GitHub Actions Docs](https://docs.github.com/en/actions)

---

**Last Updated:** 2025-10-22
**Phase:** 1 (Read-Only)
**Status:** Ready for Deployment ✅

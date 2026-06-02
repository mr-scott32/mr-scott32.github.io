# Deploy to GitHub Pages - Step by Step

## Quick Deploy (5 minutes)

### 1. Create a GitHub Repository
```bash
# In your project folder
git init
git add index.html
git commit -m "Initial commit: HSC Python Practice App"
```

### 2. Push to GitHub
```bash
# Create a new repository on GitHub first, then:
git remote add origin https://github.com/YOUR-USERNAME/hsc-python-practice.git
git branch -M main
git push -u origin main
```

### 3. Enable GitHub Pages
1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under "Source", select **main** branch
4. Click **Save**
5. Your app will be live at: `https://YOUR-USERNAME.github.io/hsc-python-practice/`

## That's it! 🎉

The app works perfectly on GitHub Pages because:
- ✅ No backend server needed
- ✅ No build process required
- ✅ Pyodide loads from CDN
- ✅ All code is client-side
- ✅ Works offline after first load

## Custom Domain (Optional)
You can add a custom domain in the same Settings → Pages section.

## Updates
To update your app:
```bash
git add index.html
git commit -m "Update questions/features"
git push
```

Changes go live in 1-2 minutes automatically!

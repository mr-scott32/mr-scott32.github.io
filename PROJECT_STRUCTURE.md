# Project Structure

This HSC Python Practice app has been refactored into a clean, maintainable structure following web development best practices.

## 📁 Main Application Files

### `index.html` (Clean HTML structure)
- **Purpose**: Main HTML structure and layout
- **Size**: ~60 lines (vs 700+ in the old version!)
- **Contains**: Only markup, no styling or logic
- **Links to**: `styles.css`, `questions.js`, `app.js`

### `styles.css` (All styling)
- **Purpose**: Complete visual styling
- **Size**: ~180 lines
- **Contains**: 
  - Layout (grid, flexbox)
  - Colors and themes
  - Button styles
  - Responsive design
  - Dark mode code editor styling

### `questions.js` (Question bank)
- **Purpose**: All 11 HSC-style questions
- **Size**: ~250 lines
- **Structure**: Array of question objects
- **Easy to**: Add, edit, or remove questions
- **Each question has**:
  - title
  - marks (3-6)
  - description (full HSC format)
  - starterCode
  - keywords (for feedback)

### `app.js` (Application logic)
- **Purpose**: All JavaScript functionality
- **Size**: ~180 lines
- **Functions**:
  - `initPyodide()` - Load Python environment
  - `loadRandomQuestion()` - Display random question
  - `runCode()` - Execute Python code
  - `submitCode()` - Analyze and score code
  - `setupTabHandler()` - Tab key indentation
  - `setupEventListeners()` - Button handlers

## 📦 Deployment Files

- `index.html`, `styles.css`, `questions.js`, `app.js` - Main app (deploy these 4)
- `DEPLOY_TO_GITHUB.md` - GitHub Pages deployment guide
- `HOW_TO_USE.md` - User instructions

## 🗄️ Reference/Backup Files

- `index_old.html` - Original single-file version (backup)
- `requirements.md` - Original requirements and examples
- `SOLUTION_SUMMARY.md` - Solution documentation
- `PROJECT_STRUCTURE.md` - This file
- `questions.json` - Old JSON format (not used)
- `build_app.py` - Failed build script (not used)

## ✅ Advantages of This Structure

### 1. **Maintainability**
- Want to add a question? Edit `questions.js` only
- Want to change colors? Edit `styles.css` only
- Want to fix a bug? Edit `app.js` only
- No need to search through 700 lines!

### 2. **Collaboration**
- Multiple people can work on different files
- Less merge conflicts in git
- Clear separation of concerns

### 3. **Reusability**
- Use `questions.js` in other projects
- Reuse `styles.css` theme elsewhere
- Extract `app.js` functions for other tools

### 4. **Performance**
- Browser can cache files separately
- Update one file, other 3 stay cached
- Faster load times on repeat visits

### 5. **Professional**
- Industry standard structure
- Easy for other developers to understand
- Scalable for future features

## 🚀 How to Deploy

All 4 files work together - just deploy them all to the same directory:

```
your-website/
  ├── index.html
  ├── styles.css
  ├── questions.js
  └── app.js
```

### GitHub Pages:
```bash
git add index.html styles.css questions.js app.js
git commit -m "HSC Python Practice App"
git push
```

### Netlify/Vercel:
Just drag and drop the 4 files!

## 📝 Adding New Questions

Open `questions.js` and add to the array:

```javascript
{
    title: "Your Question Title (X marks)",
    marks: 4,
    description: `Full HSC-style description here...`,
    starterCode: `# Starter code here\n`,
    keywords: ["keyword1", "keyword2", "keyword3"]
}
```

That's it! No other files need changing.

## 🎨 Customizing Colors

Open `styles.css` and change these main colors:

```css
/* Primary gradient */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* Button colors */
#run-btn { background: #28a745; }    /* Green */
#submit-btn { background: #667eea; }  /* Purple */
#generate-btn { background: #ff6b6b; } /* Red */
```

## 🐛 Debugging

- **HTML issues**: Check `index.html`
- **Layout/styling issues**: Check `styles.css`
- **Question problems**: Check `questions.js`
- **Code execution issues**: Check `app.js`
- **Browser console**: Press F12 to see errors

## 📊 File Comparison

| Aspect | Old (Single File) | New (Multi-File) |
|--------|------------------|------------------|
| Total Lines | ~700 | ~670 (split across 4) |
| HTML File | 700 lines | 60 lines |
| Maintainability | Hard | Easy |
| Collaboration | Difficult | Simple |
| Caching | All or nothing | Individual files |
| Professional | No | Yes |

The total code is roughly the same, but **organization** makes all the difference!

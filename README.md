# HSC Python Practice Platform

A browser-based application for students to practice HSC-style Python exam questions with AI-generated content and real-time feedback.

## Features

- 4 built-in HSC-style Python questions
- **Generate new questions** - Click "Generate New" to create unlimited unique questions powered by Claude AI
- Live Python code editor with syntax highlighting
- Run code directly in the browser using Pyodide
- Instant feedback on submitted code
- Responsive design works on desktop and tablets

## Setup

### Option 1: Simple Static Hosting (No Question Generation)

If you just want to use the 4 built-in questions:

1. Simply open `index.html` in any modern web browser
2. No server required!

### Option 2: With Question Generation (Recommended)

To enable the question generation feature:

#### Prerequisites
- Node.js installed (download from https://nodejs.org/)
- Claude API key (get from https://console.anthropic.com/)

#### Steps

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm start
```

3. Open http://localhost:3000 in your browser

4. When you click "Generate New", you'll be prompted for your Claude API key
   - Get it from https://console.anthropic.com/
   - It will be stored in your browser's local storage

## Usage

1. **Select a Question** - Choose from the list on the left
2. **Write Code** - Edit Python code in the editor
3. **Run Code** - Click "▶ Run Code" to execute and see output
4. **Submit for Feedback** - Click "✓ Submit for Feedback" to get suggestions
5. **Generate New** - Click "🔄 Generate New" to create a practice question

## Deployment

### Free Hosting Options

1. **GitHub Pages** - Deploy the `index.html` (no generation feature)
   - Push to GitHub, enable GitHub Pages in settings

2. **Netlify** - Deploy with question generation
   - Connect repo to Netlify, set build command: `npm install`
   - Set start command: `npm start`

3. **Vercel** - Similar to Netlify
   - Import project and deploy

4. **Heroku** (free tier ending)
   - Push project to Heroku

## How Question Generation Works

- Uses Claude AI to generate HSC-appropriate Python questions
- Generates questions covering various topics: control structures, functions, data types, classes, file handling, modules
- Questions are 3-6 marks each (matching HSC specification)
- Each question includes keywords for feedback analysis

## Architecture

- **Frontend**: HTML5, CSS3, JavaScript
- **Python Execution**: Pyodide (Python running in the browser)
- **Question Generation**: Claude API via Express backend
- **No database required** - everything runs in memory

## File Structure

```
├── index.html           # Main application
├── server.js           # Backend API (question generation)
├── package.json        # Dependencies
└── README.md          # This file
```

## Troubleshooting

### "Generate New button doesn't work"
- Make sure you're running `npm start` to start the server
- Check that the server is accessible at http://localhost:3000
- Verify you have a valid Claude API key

### "API key errors"
- Get a key from https://console.anthropic.com/
- Make sure it's not expired or revoked
- Keys stored in localStorage - clear browser data to reset

### "Code execution errors"
- Check your Python syntax
- Make sure imports are supported by Pyodide
- Some modules may not be available in the browser environment

## Features Coming Soon

- User accounts and progress tracking
- Question difficulty levels
- Solution hints
- More comprehensive code analysis for feedback
- Support for custom test cases

## License

MIT

## Questions?

This platform is designed for HSC Python students. For questions or suggestions, please provide feedback!

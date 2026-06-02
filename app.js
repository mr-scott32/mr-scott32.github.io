/**
 * HSC Python Practice - Main Application Logic
 */

let pyodide;
let currentQuestion = null;

/**
 * Initialize Pyodide (Python in the browser)
 */
async function initPyodide() {
    try {
        pyodide = await loadPyodide();
        document.getElementById('loading').style.display = 'none';
        document.getElementById('main-content').style.display = 'block';
        loadRandomQuestion();
    } catch (error) {
        document.getElementById('loading').innerHTML = 
            '❌ Error loading Python environment. Please refresh the page.<br>' + error.message;
    }
}

/**
 * Load a random question from the question bank
 */
function loadRandomQuestion() {
    const randomIndex = Math.floor(Math.random() * questions.length);
    currentQuestion = questions[randomIndex];
    
    document.getElementById('question-title').textContent = currentQuestion.title;
    document.getElementById('marks-badge').textContent = `${currentQuestion.marks} marks`;
    document.getElementById('question-description').textContent = currentQuestion.description;
    document.getElementById('code-editor').value = currentQuestion.starterCode;
    
    // Clear output and feedback
    document.getElementById('output').textContent = '';
    document.getElementById('feedback-section').classList.remove('show');
}

/**
 * Run the student's Python code and display output
 */
async function runCode() {
    const code = document.getElementById('code-editor').value;
    const outputDiv = document.getElementById('output');
    
    if (!code.trim()) {
        outputDiv.textContent = '⚠ Please write some code first.';
        return;
    }
    
    outputDiv.textContent = 'Running...\n';
    
    try {
        // Redirect stdout to capture print statements
        pyodide.runPython(`
import sys
from io import StringIO
sys.stdout = StringIO()
sys.stderr = StringIO()
`);
        
        // Run the user's code
        await pyodide.runPythonAsync(code);
        
        // Get the captured output
        const stdout = pyodide.runPython('sys.stdout.getvalue()');
        const stderr = pyodide.runPython('sys.stderr.getvalue()');
        
        // Display output
        if (stdout || stderr) {
            outputDiv.textContent = stdout + (stderr ? '\nErrors:\n' + stderr : '');
        } else {
            outputDiv.textContent = '✓ Code executed successfully (no output)';
        }
    } catch (error) {
        outputDiv.textContent = '❌ Error:\n' + error.message;
    }
}

/**
 * Submit code for automated feedback with scoring
 */
async function submitCode() {
    const code = document.getElementById('code-editor').value;
    const feedbackSection = document.getElementById('feedback-section');
    const feedbackContent = document.getElementById('feedback-content');
    
    if (!code.trim() || code === currentQuestion.starterCode) {
        feedbackContent.textContent = 
            "You haven't written any code yet! Give it a try - remember, making mistakes is part of learning. 💪\n\nEstimated Mark: 0/" + currentQuestion.marks;
        feedbackSection.classList.add('show');
        return;
    }
    
    feedbackContent.textContent = 'Analyzing your code...';
    feedbackSection.classList.add('show');
    
    // Analyze the code and calculate score
    let feedback = [];
    let score = 0;
    const maxMarks = currentQuestion.marks;
    
    // Check for keywords based on question type
    const usedKeywords = currentQuestion.keywords.filter(kw => 
        code.toLowerCase().includes(kw.toLowerCase())
    );
    
    // Score based on keyword usage (40% of marks)
    const keywordScore = (usedKeywords.length / currentQuestion.keywords.length) * (maxMarks * 0.4);
    score += keywordScore;
    
    if (usedKeywords.length === 0) {
        feedback.push("📌 You might want to consider using some of these concepts: " + 
            currentQuestion.keywords.join(', '));
    } else if (usedKeywords.length < currentQuestion.keywords.length / 2) {
        feedback.push("👍 Good start! You're using some relevant concepts.");
        feedback.push("💡 Consider exploring: " + 
            currentQuestion.keywords.filter(kw => !usedKeywords.includes(kw)).join(', '));
    } else {
        feedback.push("🌟 Excellent! You're using most of the key concepts for this question.");
        score += maxMarks * 0.1; // Bonus for comprehensive approach
    }
    
    // Check code quality indicators
    const lines = code.split('\n').filter(line => line.trim() && !line.trim().startsWith('#'));
    
    if (lines.length < 3) {
        feedback.push("\n📝 Your solution seems quite short. Make sure you've addressed all parts of the question.");
    } else {
        score += maxMarks * 0.1; // 10% for reasonable code length
    }
    
    // Check for common good practices (10% of marks)
    const goodPractices = [];
    if (code.includes('#') || code.includes('"""')) {
        goodPractices.push("Nice comments!");
        score += maxMarks * 0.05;
    }
    if (code.includes('def ')) {
        goodPractices.push("Good use of functions!");
        score += maxMarks * 0.05;
    }
    if (code.includes('try:') || code.includes('except')) {
        goodPractices.push("Great error handling!");
        score += maxMarks * 0.05;
    }
    
    if (goodPractices.length > 0) {
        feedback.push("\n✨ " + goodPractices.join(' '));
    }
    
    // Try to run the code and check for errors (40% of marks)
    try {
        // Reset stdout/stderr
        pyodide.runPython(`
import sys
from io import StringIO
sys.stdout = StringIO()
sys.stderr = StringIO()
`);
        await pyodide.runPythonAsync(code);
        const stdout = pyodide.runPython('sys.stdout.getvalue()');
        
        score += maxMarks * 0.3; // 30% for running without errors
        
        if (stdout && stdout.length > 10) {
            score += maxMarks * 0.1; // 10% for producing meaningful output
            feedback.push("\n✓ Your code runs without errors and produces output - excellent work!");
        } else {
            feedback.push("\n✓ Your code runs without syntax errors - that's a great foundation!");
            feedback.push("💡 Make sure your code produces the expected output.");
        }
    } catch (error) {
        feedback.push("\n⚠ There's a syntax error in your code. Try running it to see the specific error message, then work on fixing it. Don't worry - debugging is an essential skill!");
    }
    
    // Cap score at maximum marks
    score = Math.min(Math.round(score * 10) / 10, maxMarks);
    
    // Determine performance level
    const percentage = (score / maxMarks) * 100;
    let performanceMsg = "";
    
    if (percentage >= 85) {
        performanceMsg = "🏆 Outstanding work!";
    } else if (percentage >= 70) {
        performanceMsg = "🎯 Great effort!";
    } else if (percentage >= 50) {
        performanceMsg = "👍 Good progress!";
    } else {
        performanceMsg = "💪 Keep practicing!";
    }
    
    feedback.push("\n🎯 Keep practicing! Try running your code to see if the output matches the expected results.");
    feedback.push("\n💭 Remember: In the HSC, markers look for correct logic, appropriate use of Python features, and clear code structure.");
    feedback.push("\n" + "=".repeat(50));
    feedback.push("\n" + performanceMsg);
    feedback.push(`📊 ESTIMATED MARK: ${score}/${maxMarks} (${percentage.toFixed(0)}%)`);
    feedback.push("\n⚠️  Note: This is an automated estimate. Actual HSC marking considers correctness of logic, output accuracy, and code efficiency.");
    
    feedbackContent.textContent = feedback.join('\n');
}

/**
 * Handle Tab key in textarea for proper indentation
 */
function setupTabHandler() {
    document.getElementById('code-editor').addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            e.preventDefault();
            const start = this.selectionStart;
            const end = this.selectionEnd;
            const value = this.value;
            
            // Insert 4 spaces
            this.value = value.substring(0, start) + '    ' + value.substring(end);
            
            // Move cursor
            this.selectionStart = this.selectionEnd = start + 4;
        }
    });
}

/**
 * Setup event listeners for buttons
 */
function setupEventListeners() {
    document.getElementById('run-btn').addEventListener('click', runCode);
    document.getElementById('submit-btn').addEventListener('click', submitCode);
    document.getElementById('generate-btn').addEventListener('click', loadRandomQuestion);
    document.getElementById('clear-btn').addEventListener('click', () => {
        document.getElementById('output').textContent = '';
    });
}

/**
 * Initialize the application
 */
function init() {
    setupTabHandler();
    setupEventListeners();
    initPyodide();
}

// Start the app when page loads
window.addEventListener('DOMContentLoaded', init);

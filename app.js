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
 * Submit code for automated feedback with scoring based on HSC rubrics
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
    
    try {
        // Analyze the code using question-specific rubric
        const result = await analyzeCodeByRubric(code, currentQuestion);
        
        feedbackContent.textContent = result.feedback.join('\n');
    } catch (error) {
        console.error('Error in submitCode:', error);
        feedbackContent.textContent = '❌ Error analyzing code: ' + error.message + '\n\nPlease check the browser console for details.';
    }
}

/**
 * Analyze code based on question-specific rubric criteria
 */
async function analyzeCodeByRubric(code, question) {
    let feedback = [];
    let score = 0;
    const maxMarks = question.marks;
    let criteriaCount = 0;
    let criteriaMet = 0;
    
    // Question-specific rubric checks
    const rubricChecks = getRubricChecks(question.title, question);
    
    // Execute rubric checks
    let codeRuns = false;
    let hasOutput = false;
    let output = '';
    
    try {
        // Reset stdout/stderr
        pyodide.runPython(`
import sys
from io import StringIO
sys.stdout = StringIO()
sys.stderr = StringIO()
`);
        await pyodide.runPythonAsync(code);
        output = pyodide.runPython('sys.stdout.getvalue()');
        codeRuns = true;
        hasOutput = output && output.trim().length > 0;
    } catch (error) {
        feedback.push("⚠️  Syntax/Runtime Error: Your code has errors that prevent it from running.");
        feedback.push("   Try running the code to see the specific error and fix it first.");
        feedback.push("");
    }
    
    // Analyze based on rubric
    for (const check of rubricChecks) {
        criteriaCount++;
        if (check.test(code, codeRuns, output)) {
            criteriaMet++;
            if (check.feedback) {
                feedback.push("✓ " + check.feedback);
            }
        } else {
            if (check.missingFeedback) {
                feedback.push("✗ " + check.missingFeedback);
            }
        }
    }
    
    // Calculate score based on criteria met
    const criteriaRatio = criteriaCount > 0 ? criteriaMet / criteriaCount : 0;
    
    // Map criteria met to HSC rubric levels
    if (criteriaRatio >= 0.95 && codeRuns && hasOutput) {
        // Full marks - all requirements met
        score = maxMarks;
    } else if (criteriaRatio >= 0.75 && codeRuns) {
        // Substantial - most requirements met
        score = maxMarks === 6 ? 5 : maxMarks === 5 ? 4 : maxMarks === 4 ? 3 : 2;
    } else if (criteriaRatio >= 0.5) {
        // Some requirements met
        score = maxMarks === 6 ? 3.5 : maxMarks === 5 ? 3 : maxMarks === 4 ? 2 : maxMarks === 3 ? 2 : 1.5;
    } else if (criteriaRatio >= 0.25) {
        // One or few requirements met
        score = maxMarks === 6 ? 2 : maxMarks >= 4 ? 2 : 1;
    } else {
        // Shows some understanding
        score = 1;
    }
    
    // Round score
    score = Math.round(score * 2) / 2; // Round to nearest 0.5
    
    // Add summary
    feedback.push("");
    feedback.push("=".repeat(50));
    feedback.push(`📊 Criteria Met: ${criteriaMet}/${criteriaCount}`);
    
    const percentage = (score / maxMarks) * 100;
    let performanceMsg = "";
    
    if (percentage >= 90) {
        performanceMsg = "🏆 Outstanding! Your solution addresses all requirements.";
    } else if (percentage >= 70) {
        performanceMsg = "🎯 Great work! You've met most of the requirements.";
    } else if (percentage >= 50) {
        performanceMsg = "👍 Good progress! Keep working on the remaining requirements.";
    } else {
        performanceMsg = "💪 Keep practicing! Review the question requirements carefully.";
    }
    
    feedback.push(performanceMsg);
    feedback.push(`📝 ESTIMATED MARK: ${score}/${maxMarks} (${percentage.toFixed(0)}%)`);
    feedback.push("");
    feedback.push("⚠️  Note: This is an automated estimate based on HSC rubric criteria.");
    feedback.push("   Actual marking considers correctness of logic, output accuracy, and code quality.");
    
    return { feedback, score };
}

/**
 * Get rubric-specific checks for each question type
 */
function getRubricChecks(questionTitle, question) {
    const checks = [];
    
    if (questionTitle.includes("Diamond Grid")) {
        // 5 marks - Example 1 rubric
        checks.push({
            test: (code) => /import\s+random/.test(code) && /random\.(randint|randrange|sample|choice)/.test(code),
            feedback: "Uses random number generation appropriately",
            missingFeedback: "Missing or incorrect use of random number generation"
        });
        checks.push({
            test: (code) => /\b(list|List|\[|\])/.test(code) && /(append|\.add|\+=)/.test(code),
            feedback: "Creates and manages a list to track diamond positions",
            missingFeedback: "Should create a list to store unique diamond positions"
        });
        checks.push({
            test: (code) => /while/.test(code) || (/for/.test(code) && code.split('for').length >= 2),
            feedback: "Uses appropriate looping structures",
            missingFeedback: "Needs proper loops to generate positions and display grid"
        });
        checks.push({
            test: (code) => /if/.test(code) && /in\s/.test(code),
            feedback: "Uses selection structures to check conditions",
            missingFeedback: "Should use if statements to check for duplicates or positions"
        });
        checks.push({
            test: (code, runs, output) => runs && output && /\|/.test(output) && output.split('\n').length >= 5,
            feedback: "Produces correctly formatted grid output",
            missingFeedback: "Output should be a 5×5 grid with proper formatting"
        });
        
    } else if (questionTitle.includes("Game Scoring")) {
        // 6 marks - Example 2 rubric
        checks.push({
            test: (code) => /for\s+\w+\s+in/.test(code),
            feedback: "Loops through the scores list correctly",
            missingFeedback: "Should loop through the scores list"
        });
        checks.push({
            test: (code) => /scores\[/.test(code) && /\[i/.test(code),
            feedback: "Accesses list elements correctly using indices",
            missingFeedback: "Should access list elements using proper indexing"
        });
        checks.push({
            test: (code, runs, output) => runs && output && /Round.*Score.*Points/i.test(output),
            feedback: "Displays scores and points in proper format",
            missingFeedback: "Should display Round, Score, and Points in a formatted table"
        });
        checks.push({
            test: (code) => /total|sum/i.test(code) && /\+=/.test(code),
            feedback: "Calculates total points correctly",
            missingFeedback: "Should calculate and display total points"
        });
        checks.push({
            test: (code) => /if.*==\s*5/.test(code) && /\[i\s*\+\s*1\]/.test(code),
            feedback: "Implements bonus points logic correctly",
            missingFeedback: "Should add next round's score as bonus when player scores 5"
        });
        checks.push({
            test: (code) => /(i\s*==\s*9|i\s*==\s*len.*-\s*1|i\s*!=\s*9)/.test(code),
            feedback: "Handles the final round bonus correctly",
            missingFeedback: "Should handle last round differently (10 points if score is 5)"
        });
        
    } else if (questionTitle.includes("Username Validation")) {
        // 3 marks - Example 3 rubric
        checks.push({
            test: (code) => /def\s+\w+\s*\(.*username.*\)/i.test(code),
            feedback: "Defines a function that accepts a username parameter",
            missingFeedback: "Should define a function with a username parameter"
        });
        checks.push({
            test: (code) => /len\s*\(.*\)/.test(code) && /[<>]=?\s*8/.test(code),
            feedback: "Checks that username length is no more than 8 characters",
            missingFeedback: "Should check that username has no more than 8 characters"
        });
        checks.push({
            test: (code) => /\.isalpha\s*\(\s*\)/.test(code),
            feedback: "Validates that username contains only letters using isalpha()",
            missingFeedback: "Should check that username contains only letters"
        });
        checks.push({
            test: (code) => /["']<["'].*in/.test(code) || /in.*["']<["']/.test(code),
            feedback: "Checks for the '<' character to prevent code injection",
            missingFeedback: "Should check that '<' is not in the username"
        });
        checks.push({
            test: (code) => /return\s+(True|False)/.test(code),
            feedback: "Returns appropriate boolean values",
            missingFeedback: "Function should return True or False based on validation"
        });
        
    } else if (questionTitle.includes("Temporary Password")) {
        // 3 marks - Example 4 rubric
        checks.push({
            test: (code) => /input\s*\(/.test(code) && code.split(/input\s*\(/).length >= 3,
            feedback: "Prompts user for both username and password",
            missingFeedback: "Should use input() to get username and password from user"
        });
        checks.push({
            test: (code) => /\[:3\]|\[0:3\]|\[:\s*3\s*\]/.test(code),
            feedback: "Extracts first 3 characters using string slicing",
            missingFeedback: "Should use string slicing to get first 3 characters of username"
        });
        checks.push({
            test: (code) => /\+\s*['"]123['"]|['"]123['"]\s*\+/.test(code),
            feedback: "Constructs expected password by adding '123'",
            missingFeedback: "Should create expected password by adding '123' to first 3 letters"
        });
        checks.push({
            test: (code) => /if/.test(code) && /==/.test(code),
            feedback: "Uses selection structure to compare passwords",
            missingFeedback: "Should use if statement to compare entered password with expected"
        });
        checks.push({
            test: (code) => /print\s*\(.*[Ww]elcome/.test(code) && /print\s*\(.*[Ii]ncorrect|[Ee]rror/.test(code),
            feedback: "Provides appropriate welcome or error messages",
            missingFeedback: "Should display welcome message or error message based on comparison"
        });
        
    } else {
        // Generic checks for other questions
        checks.push({
            test: (code, runs) => runs,
            feedback: "Code runs without syntax errors",
            missingFeedback: "Code contains syntax errors"
        });
        
        // Check keywords if they exist
        if (question.keywords && question.keywords.length > 0) {
            checks.push({
                test: (code) => {
                    const keywordCount = question.keywords.filter(kw => 
                        code.toLowerCase().includes(kw.toLowerCase())
                    ).length;
                    return keywordCount >= question.keywords.length * 0.6;
                },
                feedback: "Uses appropriate Python concepts for this question",
                missingFeedback: "Missing key Python concepts: " + question.keywords.join(', ')
            });
        }
        
        checks.push({
            test: (code, runs, output) => runs && output && output.length > 10,
            feedback: "Produces meaningful output",
            missingFeedback: "Should produce appropriate output"
        });
    }
    
    return checks;
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

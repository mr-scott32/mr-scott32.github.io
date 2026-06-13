# How to Add New Questions

This guide explains how to add new HSC-style Python questions to the application.

## Quick Start

Questions are stored in **`questions.js`**. To add a new question, add a new object to the `questions` array.

## Question Structure

Each question object has the following properties:

```javascript
{
    title: "Question Title (X marks)",
    marks: X,  // Number: 3, 4, 5, or 6
    description: `Full question text here...`,
    starterCode: `# Initial code for students
`,
    keywords: ["keyword1", "keyword2", "etc"]
}
```

### Properties Explained

- **title**: Short descriptive title including mark value (e.g., "Diamond Grid Game (5 marks)")
- **marks**: Number of marks the question is worth (typically 3-6 for HSC questions)
- **description**: Full question text including:
  - Problem description
  - Requirements/rules
  - Example inputs/outputs
  - Any constraints or special conditions
- **starterCode**: Initial code to help students get started (can include imports, variable setup, function templates)
- **keywords**: Array of Python concepts used in the question (used for generic automated feedback)

## Step-by-Step: Adding a Simple Question

1. Open `questions.js`
2. Scroll to the end of the `questions` array (before the closing `];`)
3. Add a comma after the last question
4. Paste your new question object:

```javascript
    {
        title: "File Reader (4 marks)",
        marks: 4,
        description: `Write a program that reads a text file and displays:
- Total number of lines
- Total number of words
- Total number of characters
- The longest word in the file

Assume the file is named 'data.txt'.`,
        starterCode: `# Your code here
`,
        keywords: ["file", "open", "read", "split", "len", "max"]
    }
```

5. Save the file
6. Refresh the application in your browser
7. Click "Generate New Question" to see your question appear in rotation

## Question Template

Copy and modify this template:

```javascript
    {
        title: "Your Question Title (X marks)",
        marks: X,
        description: `Write your question description here.

Requirements:
- First requirement
- Second requirement
- Third requirement

Example output:
Your expected output here`,
        starterCode: `# Starter code
# Can include imports, variables, etc.
`,
        keywords: ["concept1", "concept2", "concept3"]
    }
```

## Choosing Keywords

Keywords help the automated marking system provide feedback. Include concepts students should use:

- **Data structures**: `list`, `dictionary`, `tuple`, `set`, `string`
- **Control structures**: `if`, `loop`, `for`, `while`, `nested`
- **Functions**: `function`, `def`, `return`, `parameter`
- **Operations**: `input`, `print`, `calculation`, `formatting`
- **Advanced**: `class`, `file`, `exception`, `module`, `import`

**Tip**: Use 4-8 relevant keywords per question.

## Adding Custom Rubric Checks (Advanced)

For more accurate HSC-style marking, you can add specific rubric criteria checks. This requires editing `app.js`.

### When to Add Custom Rubrics

- When you have official HSC marking criteria
- When you want precise, criteria-based feedback
- When generic keyword checking isn't sufficient

### How to Add Custom Rubrics

1. Open `app.js`
2. Find the `getRubricChecks()` function (around line 150)
3. Add a new `else if` block before the final `else`:

```javascript
} else if (questionTitle.includes("Your Question Title")) {
    // Add specific criteria checks
    checks.push({
        test: (code) => /import\s+\w+/.test(code),
        feedback: "Uses appropriate imports",
        missingFeedback: "Should import required modules"
    });
    checks.push({
        test: (code) => /def\s+\w+/.test(code),
        feedback: "Defines functions correctly",
        missingFeedback: "Should define at least one function"
    });
    checks.push({
        test: (code, runs, output) => runs && output.length > 0,
        feedback: "Code runs and produces output",
        missingFeedback: "Code should run without errors and produce output"
    });
}
```

### Rubric Check Structure

Each check has three parts:

```javascript
{
    test: (code, runs, output) => /* condition to check */,
    feedback: "Positive feedback when criterion is met",
    missingFeedback: "Guidance when criterion is not met"
}
```

**Test function parameters:**
- `code`: The student's code as a string
- `runs`: Boolean - true if code executed without errors
- `output`: String - the output produced by the code

### Common Test Patterns

**Check for specific code:**
```javascript
test: (code) => /import\s+random/.test(code)  // Uses regex to find "import random"
```

**Check for multiple features:**
```javascript
test: (code) => /for/.test(code) && /if/.test(code)  // Has both for loop and if statement
```

**Check output:**
```javascript
test: (code, runs, output) => runs && output.includes("Total:")  // Output contains "Total:"
```

**Check code structure:**
```javascript
test: (code) => code.split('\n').filter(line => line.trim()).length > 10  // At least 10 non-empty lines
```

## Examples

### Example 1: Simple Question (Generic Marking)

```javascript
    {
        title: "Temperature Converter (3 marks)",
        marks: 3,
        description: `Write a function that converts Celsius to Fahrenheit.
        
Formula: F = (C × 9/5) + 32

Your function should accept a Celsius value and return the Fahrenheit value.`,
        starterCode: `def celsius_to_fahrenheit(celsius):
    # Your code here
    pass

# Test your function
print(celsius_to_fahrenheit(0))    # Should print 32.0
print(celsius_to_fahrenheit(100))  # Should print 212.0
`,
        keywords: ["function", "def", "calculation", "return", "parameter"]
    }
```

### Example 2: Complex Question (Custom Rubric)

First, add the question to `questions.js`:

```javascript
    {
        title: "Library Book System (6 marks)",
        marks: 6,
        description: `Create a simple library system that:
- Stores books in a dictionary with title as key and (author, available) as value
- Has a function to borrow a book (marks it unavailable)
- Has a function to return a book (marks it available)
- Has a function to list all available books
- Handles errors when books don't exist or are already borrowed`,
        starterCode: `library = {
    "Python Basics": ("John Smith", True),
    "Data Science": ("Jane Doe", True),
    "Web Development": ("Bob Wilson", False)
}

# Your code here
`,
        keywords: ["dictionary", "function", "tuple", "if", "error", "loop"]
    }
```

Then add rubric checks to `app.js` in the `getRubricChecks()` function:

```javascript
} else if (questionTitle.includes("Library Book System")) {
    checks.push({
        test: (code) => /def\s+\w+/.test(code) && code.split('def ').length >= 3,
        feedback: "Defines multiple functions as required",
        missingFeedback: "Should define separate functions for borrow, return, and list"
    });
    checks.push({
        test: (code) => /library\[/.test(code) || /library\.get/.test(code),
        feedback: "Accesses dictionary elements correctly",
        missingFeedback: "Should access and modify dictionary values"
    });
    checks.push({
        test: (code) => /True|False/.test(code) && /\[1\]|\[-1\]/.test(code),
        feedback: "Manipulates tuple values for availability status",
        missingFeedback: "Should track and update book availability (True/False)"
    });
    checks.push({
        test: (code) => /if.*in\s+library|if.*library\.get/.test(code),
        feedback: "Checks if books exist before operations",
        missingFeedback: "Should validate that books exist in the system"
    });
    checks.push({
        test: (code) => /for\s+\w+\s+in\s+library/.test(code),
        feedback: "Iterates through dictionary to list books",
        missingFeedback: "Should loop through library to display available books"
    });
    checks.push({
        test: (code, runs) => runs,
        feedback: "Code executes without errors",
        missingFeedback: "Code contains syntax or runtime errors"
    });
}
```

## Tips for Writing Good Questions

1. **Be specific**: Clear requirements help students understand what's expected
2. **Show examples**: Include sample inputs and expected outputs
3. **Start simple**: Provide helpful starter code, especially for complex questions
4. **HSC-style**: Model questions after official HSC exam questions
5. **Test it**: Try solving your own question to ensure it's achievable
6. **Appropriate difficulty**: Match mark value to complexity (3 marks = simple, 6 marks = complex)

## Mark Value Guidelines

- **3 marks**: Single function or simple algorithm with 2-3 requirements
- **4 marks**: Multiple functions or moderate complexity with 3-4 requirements  
- **5 marks**: Complex algorithm or data structure manipulation with 4-5 requirements
- **6 marks**: Multiple components, complex logic, and 5+ requirements

## Testing Your Questions

After adding a question:

1. Refresh the browser
2. Click "Generate New Question" until your question appears
3. Try writing a solution
4. Submit to see the automated feedback
5. Test with partial solutions to verify feedback is helpful
6. Test with incorrect solutions to ensure errors are caught

## Troubleshooting

**Question doesn't appear:**
- Check for syntax errors (missing commas, brackets, quotes)
- Ensure the question object is inside the `questions` array
- Look for JavaScript console errors (F12 in browser)

**Marking seems wrong:**
- Verify keywords match the concepts in the question
- Consider adding custom rubric checks for more accurate marking
- Test with both correct and incorrect solutions

**Formatting looks broken:**
- Use backticks for multi-line strings: \`text here\`
- Escape special characters if needed
- Check indentation in starter code

## Need Help?

- Check existing questions in `questions.js` for examples
- Review `requirements.md` for official HSC question examples
- Test thoroughly before sharing with students

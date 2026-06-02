/**
 * HSC Python Practice - Question Bank
 * 
 * Each question object contains:
 * - title: The question title with mark value
 * - marks: Number of marks (3-6)
 * - description: Full HSC-style question description
 * - starterCode: Initial code to help students get started
 * - keywords: Key concepts used for automated feedback
 */

const questions = [
    {
        title: "Diamond Grid Game (5 marks)",
        marks: 5,
        description: `As part of a computer game, a program is needed to randomly place 15 diamonds on a 5 × 5 grid. Once the locations of the diamonds have been generated, the program outputs the 5 × 5 grid, with the location of each diamond signified by an 'X'.

An example of the output required is shown below:

| X |   | X |   | X |
|   | X |   |   | X |
|   | X | X | X |   |
| X |   | X |   |   |
| X | X | X | X | X |`,
        starterCode: `import random

# Your code here
`,
        keywords: ["random", "grid", "matrix", "nested", "loop", "diamond"]
    },
    {
        title: "Game Scoring with Bonus Points (6 marks)",
        marks: 6,
        description: `In a computer game, each player has 10 rounds and the maximum score for each round is 5. The score for each round is equal to the number of points, except when bonus points are assigned. Every time a player scores 5, the score from the next round is added as bonus points. If a player scores 5 in the last round, they get 10 points.

A player's scores and corresponding points for a full game are shown.

Round   1  2  3  4  5  6  7  8  9  10
Score   3  5  5  2  1  4  0  1  4  5
Points  3 10  7  2  1  4  0  1  4  10

Write a program in Python that will:
- display the player's scores and corresponding points
- calculate and display the total points for the player, taking into account the bonuses.

Start your program with: scores = [3,5,5,2,1,4,0,1,4,5]

The output of the program should match the following:

Round	Score	Points
1	3	3
2	5	10
3	5	7
4	2	2
5	1	1
6	4	4
7	0	0
8	1	1
9	4	4
10	5	10
TOTAL POINTS: 42`,
        starterCode: `scores = [3, 5, 5, 2, 1, 4, 0, 1, 4, 5]

# Your code here
`,
        keywords: ["list", "loop", "bonus", "if", "total", "scoring"]
    },
    {
        title: "Username Validation (3 marks)",
        marks: 3,
        description: `An online store allows users to register for an account using their name, phone number and date of birth. Users must also create a username and password.

Each username must satisfy these rules:
- There must be no more than 8 characters.
- Only uppercase and lowercase letters are accepted.
- The character "<" is not allowed, to prevent attempts at injecting code through the username.

Write a function in Python that will check whether a username satisfies the rules.`,
        starterCode: `def validate_username(username):
    # Your code here
    pass

# Test your function
print(validate_username("JohnDoe"))  # Should return True
print(validate_username("John123"))  # Should return False (contains numbers)
print(validate_username("VeryLongUsername"))  # Should return False (too long)
`,
        keywords: ["function", "validation", "string", "len", "isalpha", "if"]
    },
    {
        title: "Temporary Password Checker (3 marks)",
        marks: 3,
        description: `In an organisation, temporary passwords are automatically generated for new user accounts. Each password is created from the first three letters of the username followed by '123'.

For example, the username 'NESA' will have the password 'NES123'.

When a user logs in for the first time, they are asked for their username and password. They receive a welcome message or an error message, depending on whether the password entered follows the rules of new user accounts.

Write a Python program that asks a new user for their username and password, and then checks whether the password rule has been followed.`,
        starterCode: `# Your code here
`,
        keywords: ["input", "string", "slicing", "validation", "if", "else"]
    },
    {
        title: "Student Grade Analysis (5 marks)",
        marks: 5,
        description: `A teacher needs to analyze student grades from a recent test. Write a program that:
- Takes a list of student grades (0-100)
- Calculates the average grade
- Counts how many students passed (grade >= 50)
- Finds the highest and lowest grades
- Displays all results in a clear format

Example output:
Total students: 8
Average grade: 67.5
Students passed: 6
Highest grade: 95
Lowest grade: 32`,
        starterCode: `grades = [78, 45, 92, 67, 83, 32, 95, 58]

# Your code here
`,
        keywords: ["list", "average", "sum", "len", "max", "min", "count"]
    },
    {
        title: "Phone Number Formatter (4 marks)",
        marks: 4,
        description: `Write a function that formats Australian phone numbers. The function should:
- Accept a 10-digit phone number as a string
- Check if the number is valid (exactly 10 digits, starts with '04' for mobile or '02'/'03' for landline)
- Return the formatted number as '#### ### ###' for mobile or '(##) #### ####' for landline
- Return "Invalid number" if the number doesn't meet the requirements

Examples:
'0412345678' → '0412 345 678'
'0298765432' → '(02) 9876 5432'
'123456789' → 'Invalid number'`,
        starterCode: `def format_phone(number):
    # Your code here
    pass

# Test cases
print(format_phone('0412345678'))
print(format_phone('0298765432'))
print(format_phone('123456789'))
`,
        keywords: ["function", "string", "validation", "slicing", "formatting"]
    },
    {
        title: "Shopping Cart Calculator (6 marks)",
        marks: 6,
        description: `Create a shopping cart system that:
- Uses a dictionary to store items and their prices
- Allows calculating the total cost
- Applies a 10% discount if total is over $100
- Adds 10% GST to the final amount
- Displays an itemized receipt

Your program should work with this shopping cart:
cart = {
    'Apple': 2.50,
    'Bread': 3.20,
    'Milk': 4.50,
    'Cheese': 8.75,
    'Chicken': 12.00
}

Expected output format:
Item          Price
Apple         $2.50
Bread         $3.20
...
Subtotal:     $30.95
Discount:     $3.10
GST:          $2.79
Total:        $30.64`,
        starterCode: `cart = {
    'Apple': 2.50,
    'Bread': 3.20,
    'Milk': 4.50,
    'Cheese': 8.75,
    'Chicken': 12.00
}

# Your code here
`,
        keywords: ["dictionary", "loop", "calculation", "if", "formatting"]
    },
    {
        title: "Email Validator (4 marks)",
        marks: 4,
        description: `Write a function to validate email addresses. An email is valid if:
- It contains exactly one '@' symbol
- The '@' is not at the start or end
- There is at least one '.' after the '@'
- The domain (after '@') has at least 2 characters before the last '.'
- The extension (after last '.') has at least 2 characters
- Only letters, numbers, dots, and '@' are allowed

Examples:
'user@example.com' → Valid
'test.user@school.edu.au' → Valid
'invalid@' → Invalid
'no@domain' → Invalid`,
        starterCode: `def validate_email(email):
    # Your code here
    pass

# Test cases
print(validate_email('user@example.com'))
print(validate_email('invalid@'))
`,
        keywords: ["function", "string", "validation", "count", "find", "if"]
    },
    {
        title: "Number Pyramid Pattern (4 marks)",
        marks: 4,
        description: `Write a program that displays a number pyramid pattern. The user inputs the number of rows, and the program creates a pyramid where each row contains consecutive numbers.

For example, if the user enters 5, the output should be:

    1
   2 3
  4 5 6
 7 8 9 10
11 12 13 14 15

Note: Each row is centered with spaces, and numbers are separated by spaces.`,
        starterCode: `rows = 5  # You can change this or use input()

# Your code here
`,
        keywords: ["nested", "loop", "pattern", "print", "spacing", "counter"]
    },
    {
        title: "Word Frequency Counter (5 marks)",
        marks: 5,
        description: `Write a program that analyzes a text string and:
- Counts how many times each word appears (case-insensitive)
- Ignores punctuation (.,!?)
- Displays words in order of frequency (most common first)
- Shows the count for each word

Example text: "The cat sat on the mat. The cat was happy."

Expected output:
the: 3
cat: 2
sat: 1
on: 1
mat: 1
was: 1
happy: 1`,
        starterCode: `text = "The cat sat on the mat. The cat was happy."

# Your code here
`,
        keywords: ["dictionary", "string", "split", "lower", "count", "sort"]
    },
    {
        title: "Student Class Management (6 marks)",
        marks: 6,
        description: `Create a Student class to manage student information. The class should:
- Store student name, ID, and a list of test scores
- Have a method to add a new test score
- Have a method to calculate the average score
- Have a method to determine the letter grade (A: 90+, B: 80-89, C: 70-79, D: 60-69, F: <60)
- Have a method to display student information in a formatted way

Create at least 2 student objects and demonstrate all methods.

Example output:
Student: Alice Brown
ID: 12345
Test Scores: [85, 92, 78, 88]
Average: 85.75
Grade: B`,
        starterCode: `class Student:
    def __init__(self, name, student_id):
        # Your code here
        pass
    
    # Add your methods here

# Test your class
student1 = Student("Alice Brown", "12345")
`,
        keywords: ["class", "self", "method", "list", "average", "def"]
    }
];

#!/usr/bin/env python3
"""Generate the complete HSC Python Practice HTML application"""

# HSC-style questions with full detail like in requirements.md
questions = [
    {
        "id": 1,
        "title": "Diamond Grid Generator (5 marks)",
        "marks": 5,
        "description": """As part of a computer game, a program is needed to randomly place 15 diamonds on a 5 × 5 grid. Once the locations of the diamonds have been generated, the program outputs the 5 × 5 grid, with the location of each diamond signified by an 'X'.

An example of the output required is shown below:

| X |   | X |   | X |
|   | X |   |   | X |
|   | X | X | X |   |
| X |   | X |   |   |
| X | X | X | X | X |

Your program should:
1. Use the random module to generate diamond positions
2. Create a 5×5 grid
3. Place exactly 15 diamonds randomly
4. Display the grid with X for diamonds and spaces for empty cells""",
        "starterCode": "import random\n\n# Your code here\n",
        "keywords": ["random", "grid", "15", "5", "X", "for", "list"]
    },
    {
        "id": 2,
        "title": "Game Scoring with Bonus Points (6 marks)",
        "marks": 6,
        "description": """In a computer game, each player has 10 rounds and the maximum score for each round is 5. The score for each round is equal to the number of points, except when bonus points are assigned. Every time a player scores 5, the score from the next round is added as bonus points. If a player scores 5 in the last round, they get 10 points.

A player's scores and corresponding points for a full game are shown:

Round   1  2  3  4  5  6  7  8  9  10
Score   3  5  5  2  1  4  0  1  4  5
Points  3  10 7  2  1  4  0  1  4  10

Write a program in Python that will:
- Display the player's scores and corresponding points
- Calculate and display the total points for the player, taking into account the bonuses

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
TOTAL POINTS: 42""",
        "starterCode": "scores = [3,5,5,2,1,4,0,1,4,5]\n\n# Your code here\n",
        "keywords": ["scores", "bonus", "points", "for", "print", "total", "if"]
    },
    {
        "id": 3,
        "title": "Username Validation (3 marks)",
        "marks": 3,
        "description": """An online store allows users to register for an account using their name, phone number and date of birth. Users must also create a username and password.

Each username must satisfy these rules:
- There must be no more than 8 characters
- Only uppercase and lowercase letters are accepted
- The character "<" is not allowed, to prevent attempts at injecting code through the username

Write a function in Python that will check whether a username satisfies the rules.

Your function should:
- Take a username as a parameter
- Return True if the username is valid
- Return False if the username breaks any rule

Example:
is_valid_username("John") → True
is_valid_username("JohnSmith123") → False (has numbers)
is_valid_username("John<") → False (has < character)""",
        "starterCode": "def is_valid_username(username):\n    # Your code here\n    pass\n\n# Test your function\nprint(is_valid_username(\"John\"))\nprint(is_valid_username(\"JohnSmith123\"))\n",
        "keywords": ["def", "len", "isalpha", "return", "True", "False", "<"]
    },
    {
        "id": 4,
        "title": "Password Validation (3 marks)",
        "marks": 3,
        "description": """In an organisation, temporary passwords are automatically generated for new user accounts. Each password is created from the first three letters of the username followed by '123'.

For example, the username 'NESA' will have the password 'NES123'.

When a user logs in for the first time, they are asked for their username and password. They receive a welcome message or an error message, depending on whether the password entered follows the rules of new user accounts.

Write a Python program that:
- Asks a new user for their username
- Asks for their password  
- Checks whether the password follows the rule (first 3 letters + '123')
- Displays 'Welcome!' if correct
- Displays 'Error: Invalid password' if incorrect

Example:
Username: NESA
Password: NES123
Output: Welcome!

Username: NESA
Password: WRONG
Output: Error: Invalid password""",
        "starterCode": "# Your code here\n",
        "keywords": ["input", "username", "password", "[:3]", "123", "print", "if"]
    }
]

import json

# Generate the complete HTML
html_template = """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HSC Python Practice</title>
    <script src="https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js"></script>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
        }
        .container {
            max-width: 1400px;
            margin: 0 auto;
            background: white;
            border-radius: 10px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            overflow: hidden;

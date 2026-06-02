# Application Idea
We need a browser-based application which will give students HSC-exam style Python questions, allow them to complete / compile code, and give feedback on their answer.

## Requirements
- Must provide an HSC-style question. This can be 3, 4, 5 or 6 marks.
- Must have a window for students to enter code, and should colour code. 
- Must have a window displaying output when students run the code (and allows students to input text when required etc). 
- Must have a button to run the code.
- Must have a button to submit code for feedback.
- Once the button to submit code has been pressed, should provide feedback on student program for improvement.

## Course Specifications
Students are expected to be able to code using the Python programming language. Students should be familiar with the use of the following features:
- control structures 
- global and local variables 
- use of simple and structured data types 
classes, objects, attributes and methods 
- functions 
- modules and libraries 
- file handling 

Students are expected to design and implement programs incorporating combinations of these features.

## Examples of Python Questions

### Example 1: 5 marks
As part of a computer game, a program is needed to randomly place 15 diamonds on a 5 × 5 grid. Once the locations of the diamonds have been generated, the program outputs the 5 × 5 grid, with the location of each diamond signified by an ‘X’.

An example of the output required is shown below.

| X |   | X |   | X |
|   | X |   |   | X |
|   | X | X | X |   |
| X |   | X |   |   |
| X | X | X | X | X |

### Example 2 (6 marks)
In a computer game, each player has 10 rounds and the maximum score for each round is 5. The score for each round is equal to the number of points, except when bonus points are assigned. Every time a player scores 5, the score from the next round is added as bonus points. If a player scores 5 in the last round, they get 10 points.

A player's scores and corresponding points for a full game are shown.

Round	1	2	3	4	5	6	7	8	9	10
Score	3	5	5	2	1	4	0	1	4	5
Points	3	10	7	2	1	4	0	1	4	10
Write a program in Python that will:  

display the player's scores and corresponding points
calculate and display the total points for the player, taking into account the bonuses.
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
TOTAL POINTS: 42

### Example 3 (3 marks)

An online store allows users to register for an account using their name, phone number and date of birth. Users must also create a username and password.

Each username must satisfy these rules.

There must be no more than 8 characters.
Only uppercase and lowercase letters are accepted.
The character “<” is not allowed, to prevent attempts at injecting code through the username.

Write a function in Python that will check whether a username satisfies the rules. 

### Example 4 (3 marks)

In an organisation, temporary passwords are automatically generated for new user accounts. Each password is created from the first three letters of the username followed by ‘123’.

For example, the username ‘NESA’ will have the password ‘NES123’.

When a user logs in for the first time, they are asked for their username and password. They receive a welcome message or an error message, depending on whether the password entered follows the rules of new user accounts.

Write a Python program that asks a new user for their username and password, and then checks whether the password rule has been followed.
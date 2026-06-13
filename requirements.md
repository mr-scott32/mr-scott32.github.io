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

#### Example 1 Rubric
Criteria Marks
• Provides a correct python program that addresses the following
requirements:
– creates a list of unique randomly generated numbers
– processes the generated list correctly
– uses selection and looping structures
– provides correctly formatted output
– uses inbuilt python functions
5
• Provides a substantially correct python program that addresses most of
the requirements 4
• Provides a python program that addresses some of the requirements 3
• Provides a python program that addresses one requirement 2
• Shows some understanding of the problem 1

#### Example 1 Sample Answer
```
import random

randList = []
for x in range(15):
    nextInt = random.randint(1,25)
    while nextInt in randList:
        nextInt = random.randint(1,25)
    randList.append(nextInt)

pos = 0
while pos < 25:
    if pos in randList:
        print ("| X", end=" ")
    else:
        print ("| ", end=" ")
    pos = pos + 1
    if (pos % 5 == 0):
        print("| \n") `
```

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

#### Example 2 Rubric:
Criteria Marks
• Provides a substantially correct solution including all of the
features:
following
– looping correctly
– referring to contents of the data structure correctly
– displaying the player’s scores and corresponding points
– calculating the total points
– taking bonus points into account
– handling the final round correctly
as shown 6
• Provides a solution that shows understanding of most of the above
features 5
• Provides a solution that shows understanding of some features 3–4
• Provides a solution that shows understanding of one feature 2
• Shows some understanding of the requirement 1

#### Example 2 Sample Answer:
```
# Input code
scores = [3,5,5,2,1,4,0,1,4,5]
# Display the scores and points
# Header row print("Round\tScore\tPoints")
totalPoints = 0
# Calculate the points and print
for i in range(len(scores)):
    roundNumber = i + 1
    score = scores[i]
    points = score
    # Check if any bonuses apply and NOT the final round
    if points == 5 and i != 9:
    # Add the points from the next round as bonus points
        points += scores[i + 1]
    # Check if the final round bonus applies
    if points == 5 and i == 9:
    # Give the bonus points of 10
        points = 10
    # Add to the total points tally
    totalPoints += points
    # Print the results
    print(str(roundNumber) + "\t" + str(score) + "\t" + str(points))
print("\nTOTAL POINTS: " + str(totalPoints))
```

### Example 3 (3 marks)

An online store allows users to register for an account using their name, phone number and date of birth. Users must also create a username and password.

Each username must satisfy these rules.

There must be no more than 8 characters.
Only uppercase and lowercase letters are accepted.
The character “<” is not allowed, to prevent attempts at injecting code through the username.

Write a function in Python that will check whether a username satisfies the rules. 

#### Example 3 Rubric
Criteria Marks
• Provides a correct function in Python that checks whether a username
satisfies the rules 3
• Provides a partially correct function in Python that attempts to check
whether a username satisfies the rules 2
• Shows some understanding of the problem and Python programming 1 

#### Example 3 Sample Answer
```
def validateUsername(username):
# Length check
if len(username) > 8:
    return False
# Alpha character only check
elif username.isalpha() == False:
    return False
# < character check
elif "<" in username:
    return False
# If we reach here then the username meets the requirements
return True
```
Answers may include print statements to test the code
eg ```print(validateUsername("test"))```
### Example 4 (3 marks)

In an organisation, temporary passwords are automatically generated for new user accounts. Each password is created from the first three letters of the username followed by ‘123’.

For example, the username ‘NESA’ will have the password ‘NES123’.

When a user logs in for the first time, they are asked for their username and password. They receive a welcome message or an error message, depending on whether the password entered follows the rules of new user accounts.

Write a Python program that asks a new user for their username and password, and then checks whether the password rule has been followed.

#### Example 4 Rubric
Criteria Marks
• Provides correct code for the problem 3
• Provides partially correct code that includes a correct selection structure
OR password creation 2
• Shows some understanding of the scenario and Python programming 1 
#### Example 4 Sample Answer
```
uName = input('What is your username?')
password = input('What is your password?')
passwordP1 = uName[:3]
passwordP1= passwordP1 + '123'
if passwordP1 == password:
    print ('Welcome!')
else:
    print ('Incorrect password entered')
```
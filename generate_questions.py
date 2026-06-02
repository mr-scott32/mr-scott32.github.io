import json

# Load existing questions
with open('questions.json', 'r') as f:
    data = json.load(f)

existing = data['questions']

# Additional templates for more variety
additional = [
    {
        "title": "Multiplication Table Generator (4 marks)",
        "marks": 4,
        "description": "Write a program that prints the multiplication table for a given number up to 10.\n\nExample:\nFor 5:\n5 x 1 = 5\n5 x 2 = 10",
        "starterCode": "def print_times_table(num):\n    # Your code here\n    pass\n",
        "keywords": ["table", "multiplication", "loop", "range", "print"]
    },
    {
        "title": "Leap Year Checker (3 marks)",
        "marks": 3,
        "description": "Write a function that checks if a year is a leap year.",
        "starterCode": "def is_leap_year(year):\n    # Your code here\n    pass\n",
        "keywords": ["leap", "year", "divisible", "if", "return"]
    },
    {
        "title": "Triangle Classifier (4 marks)",
        "marks": 4,
        "description": "Write a function that classifies a triangle based on side lengths.",
        "starterCode": "def classify_triangle(a, b, c):\n    # Your code here\n    pass\n",
        "keywords": ["triangle", "classify", "sides", "equal", "if"]
    },
    {
        "title": "Distance Calculator (4 marks)",
        "marks": 4,
        "description": "Write a function that calculates the distance between two points.",
        "starterCode": "import math\n\ndef distance(point1, point2):\n    # Your code here\n    pass\n",
        "keywords": ["distance", "point", "math", "sqrt", "formula"]
    },
    {
        "title": "List Reversal (3 marks)",
        "marks": 3,
        "description": "Write a program that reverses the order of elements in a list.",
        "starterCode": "numbers = [1, 2, 3, 4, 5]\n# Reverse the list\n",
        "keywords": ["reverse", "list", "order", "elements", "backward"]
    }
]

# Generate more variations by creating 100+ questions total
questions_to_generate = [
    ("Minimum Finder", 3, "Find minimum value without min()", "def find_min(lst):\n    pass\n", ["minimum", "min", "loop", "if", "compare"]),
    ("List Splitter", 4, "Split a list into chunks of size n", "def split_list(lst, n):\n    pass\n", ["split", "list", "chunks", "loop", "append"]),
    ("Tuple Operations", 3, "Work with tuples and convert between types", "data = (1, 2, 3)\n# Your code\n", ["tuple", "convert", "list", "unpack", "iterate"]),
    ("Dictionary Merge", 4, "Merge two dictionaries together", "dict1 = {}\ndict2 = {}\n# Merge\n", ["merge", "dictionary", "keys", "values", "update"]),
    ("String Methods", 3, "Use string methods like upper, lower, replace", "text = 'Hello'\n# Use methods\n", ["string", "upper", "lower", "replace", "methods"]),
    ("List Sorting", 4, "Sort a list of numbers in ascending order", "numbers = [5, 2, 8]\n# Sort\n", ["sort", "ascending", "list", "order", "compare"]),
    ("Count Occurrences", 3, "Count how many times an element appears", "lst = [1, 1, 2, 3, 1]\n# Count 1s\n", ["count", "occurrences", "loop", "if", "frequency"]),
    ("Nested Lists", 5, "Work with lists inside lists", "matrix = [[1, 2], [3, 4]]\n# Your code\n", ["nested", "matrix", "list", "loop", "index"]),
    ("String Find", 3, "Find a substring in a string", "text = 'hello'\n# Find 'l'\n", ["find", "substring", "index", "search", "string"]),
    ("List Difference", 4, "Find elements in one list but not another", "list1 = [1, 2, 3]\nlist2 = [2, 3, 4]\n# Difference\n", ["difference", "set", "list", "element", "not"])
]

for title, marks, desc, code, kw in questions_to_generate:
    additional.append({
        "title": f"{title} ({marks} marks)",
        "marks": marks,
        "description": desc,
        "starterCode": code,
        "keywords": kw
    })

# Add all questions
existing.extend(additional)

# Save
with open('questions.json', 'w') as f:
    json.dump({'questions': existing}, f, indent=2)

print(f'✓ Generated {len(existing)} total questions!')

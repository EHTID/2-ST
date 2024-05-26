const quizData = [
    {
        question: "Basic Syntax: What will be the output of the following code?\nprint(\"Hello, World!\")",
        a: "Hello World",
        b: "Hello, World!",
        c: "\"Hello, World!\"",
        d: "print(\"Hello, World!\")",
        correct: "b",
    },
    {
        question: "Variables and Data Types: How do you declare a variable and assign the integer value 10 to it in Python?",
        a: "int x = 10",
        b: "x := 10",
        c: "x = 10",
        d: "declare x = 10",
        correct: "c",
    },
    {
        question: "Control Flow: What is the output of the following code?\nx = 5\nif x > 2:\n    print(\"Greater than 2\")\nelse:\n    print(\"Less than or equal to 2\")",
        a: "Greater than 2",
        b: "Less than or equal to 2",
        c: "Error",
        d: "Nothing",
        correct: "a",
    },
    {
        question: "Loops: How would you write a for loop that prints all numbers from 0 to 9?",
        a: "for x in range(0, 9): print(x)",
        b: "for x in range(10): print(x)",
        c: "for x in 0..9: print(x)",
        d: "for x in 1..10: print(x)",
        correct: "b",
    },
    {
        question: "Functions: How do you define a function in Python that takes two arguments and returns their sum?",
        a: "def add(a, b) return a + b",
        b: "def add(a, b): return a + b",
        c: "function add(a, b): return a + b",
        d: "def add(int a, int b): return a + b",
        correct: "b",
    },
    {
        question: "Lists: How do you append an element to a list in Python?",
        a: "list.append(element)",
        b: "list.add(element)",
        c: "list.push(element)",
        d: "list.insert(element)",
        correct: "a",
    },
    {
        question: "Dictionaries: How do you access the value associated with the key 'name' in the following dictionary?\nperson = {'name': 'Alice', 'age': 30}",
        a: "person.name",
        b: "person['name']",
        c: "person->name",
        d: "person.get('name')",
        correct: "b",
    },
    {
        question: "String Manipulation: How can you concatenate the strings 'Hello' and 'World' with a space in between?",
        a: "'Hello' + ' ' + 'World'",
        b: "'Hello' & ' ' & 'World'",
        c: "'Hello'.append(' ').append('World')",
        d: "concat('Hello', ' ', 'World')",
        correct: "a",
    },
    // Add more questions here...
];

const quiz = document.getElementById('quiz');
const questionContainer = document.getElementById('question-container');
const answerEls = document.querySelectorAll('#answers li');
const submitBtn = document.getElementById('submit');

let currentQuiz = 0;
let score = 0;

loadQuiz();

function loadQuiz() {
    const currentQuizData = quizData[currentQuiz];
    
    questionContainer.innerHTML = `<h3>${currentQuizData.question}</h3>`;
    document.getElementById('answers').innerHTML = `
        <li>
            <input type="radio" name="answer" id="a" value="a">
            <label for="a">${currentQuizData.a}</label>
        </li>
        <li>
            <input type="radio" name="answer" id="b" value="b">
            <label for="b">${currentQuizData.b}</label>
        </li>
        <li>
            <input type="radio" name="answer" id="c" value="c">
            <label for="c">${currentQuizData.c}</label>
        </li>
        <li>
            <input type="radio" name="answer" id="d" value="d">
            <label for="d">${currentQuizData.d}</label>
        </li>
    `;
}

function getSelected() {
    const answerEls = document.querySelectorAll('input[name="answer"]');
    let answer = undefined;

    answerEls.forEach((answerEl) => {
        if (answerEl.checked) {
            answer = answerEl.value;
        }
    });

    return answer;
}

submitBtn.addEventListener('click', () => {
    const answer = getSelected();

    if (answer) {
        if (answer === quizData[currentQuiz].correct) {
            score++;
        }

        currentQuiz++;

        if (currentQuiz < quizData.length) {
            loadQuiz();
        } else {
            quiz.innerHTML = `
                <h2>You answered ${score}/${quizData.length} questions correctly</h2>
                <h3>Your knowledge level: ${(score / quizData.length) * 100}%</h3>
                <button onclick="location.reload()">Reload</button>
            `;
        }
    }
});

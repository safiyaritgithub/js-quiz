
const questionEl = document.getElementById("question");
const questionFormEl = document.getElementById("questionForm");
const scoreEl = document.getElementById("score");

let storedAnswer;
let score = localStorage.getItem("score")

const randomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const generateQuestion = () => {
  const randomNumber1 = randomNumber(1, 10);
  const randomNumber2 = randomNumber(1, 10);
  const questionType = randomNumber(1, 4);
  let firstNumber;
  let secondNumber;

  if (randomNumber1 > randomNumber2 && questionType > 2) {
    firstNumber = randomNumber1;
    secondNumber = randomNumber2;
  } else {
    firstNumber = randomNumber2;
    secondNumber = randomNumber1;
  }

  let question;
  let answer;

  switch (questionType) {
    case 1:
      question = `Q. What is ${firstNumber} multiply by ${secondNumber}?`;
      answer = randomNumber1 * randomNumber2;
      break;
    case 2:
      question = `Q. What is ${firstNumber} Add to ${secondNumber}?`;
      answer = randomNumber1 + randomNumber2;
      break;
    case 3:
      question = `Q. What is ${firstNumber} Divided by ${secondNumber}?`;
      answer = randomNumber1 / randomNumber2;
      break;
    case 4:
      question = `Q. What is ${firstNumber} Substract from ${secondNumber}?`;
      answer = randomNumber1 - randomNumber2;
      break;
    default:
      question = `Q. What is ${firstNumber} Substract from ${secondNumber}?`;
      answer = randomNumber1 - randomNumber2;
      break;
  }
  return { question, answer };
};

const showQuestion = () => {
  const { question, answer } = generateQuestion();
  questionEl.innerText = question;
  scoreEl.innerText = score;

  storedAnswer = answer;
};

showQuestion();

const checkAnswer = (event) => {
  event.preventDefault();
  const formData = new FormData(questionFormEl);
  const userAnswer = +formData.get("answer");
  if (userAnswer === storedAnswer) {
    score += 1;
    Toastify({
      text: `You are Right and your score is ${score} `,
      className: "info",
      gravity:"bottom",
      position:"center",
      style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
      }
    }).showToast();

  } else {
    score -= 1;
    Toastify({
      text: `You are Wrong and your score is ${score} `,
      className: "info",
      gravity:"bottom",
      position:"center",
      style: {
        background: "linear-gradient(to right, #e33217, #ff001e)",
      }
    }).showToast();
  }
  scoreEl.innerText = score;
  localStorage.setItem("score",score)
  event.target.reset();
  showQuestion();
  console.log("answer", userAnswer);
};

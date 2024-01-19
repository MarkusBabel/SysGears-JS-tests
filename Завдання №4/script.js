const interviewContainer = document.getElementById("interviewContainer");
let currentQuestionIndex = 0;
let answers = [];

const interviewConfig = [
  {
    question: "Яке ваше загальне враження від нашого закладу?",
    options: ["Задоволений", "Не вражений", "Не задоволений"],
    nextQuestions: [1, 3, 5],
  },
  {
    question: "Чи сподобалось Вам меню?",
    options: ["Сподобалось", "Не вразило", "Не сподобалось"],
    nextQuestions: [2, 3, 4],
  },
  {
    question: "Чи готові святкувати свій День народження у нашому закладі?",
    options: ["Так!", "Не готовий відповісти", "Ні"],
    nextQuestions: [7, 7, 7],
  },
  {
    question: "Чи влаштувало Вас співвідношення ціна-якість?",
    options: ["Так", "Важко сказати", "Ні"],
    nextQuestions: [4, 4, 4],
  },
  {
    question: "Оцініть якість замовлених Вами страв",
    options: ["Відмінно", "Задовільно", "Погано"],
    nextQuestions: [7, 7, 7],
  },
  {
    question: "Оцініть якість сервісу у закладі",
    options: ["Високий", "Задовільний", "Поганий"],
    nextQuestions: [6, 6, 6],
  },
  {
    question: "Оцініть атмосферу закладу",
    options: ["Затишна", "Задовільна", "Не приємна"],
    nextQuestions: [7, 7, 7],
  },
];

function showInterview() {
  const question = interviewConfig[currentQuestionIndex];

  if (question) {
    const optionsHtml = question.options
      .map(
        (option, optionIndex) =>
          `<input type="radio" name="answer" value="${optionIndex}" onclick="nextQuestion()"> ${option}<br>`
      )
      .join("");

    interviewContainer.innerHTML = `
      <div>
        <h2>Question ${currentQuestionIndex + 1}:</h2>
        <p>${question.question}</p>
        ${optionsHtml}
      </div>
    `;
  } else {
    showResult();
  }
}

function nextQuestion() {
  const selectedOption = document.querySelector('input[name="answer"]:checked');

  if (selectedOption) {
    const nextIndex =
      interviewConfig[currentQuestionIndex].nextQuestions[selectedOption.value];

    answers.push({
      question: interviewConfig[currentQuestionIndex].question,
      answer: selectedOption.nextSibling.textContent,
    });

    currentQuestionIndex = nextIndex;
    showInterview();
  }
}

function showResult() {
  const resultHtml = answers
    .map(
      (entry, index) =>
        `<div>
           <h2>Question ${index + 1}:</h2>
           <p>${entry.question}</p>
           <p>Answer: ${entry.answer}</p>
         </div>`
    )
    .join("");

  interviewContainer.innerHTML = `
    <h2>Interview Results:</h2>
    ${resultHtml}
    <p>Thank you for taking the interview!</p>
  `;
}

showInterview();

function findAllPaths(config, currentPath = [], currentQuestionIndex = 0) {
  if (currentQuestionIndex >= config.length) {
    return [currentPath];
  }

  const question = config[currentQuestionIndex];
  const allPaths = [];

  for (
    let optionIndex = 0;
    optionIndex < question.options.length;
    optionIndex++
  ) {
    const nextQuestionIndex = question.nextQuestions[optionIndex];
    const newPath = [
      ...currentPath,
      { [question.question]: question.options[optionIndex] },
    ];
    const pathsFromNextQuestion = findAllPaths(
      config,
      newPath,
      nextQuestionIndex
    );
    allPaths.push(...pathsFromNextQuestion);
  }

  return allPaths;
}

const allPaths = findAllPaths(interviewConfig);

const paths = {
  number: allPaths.length,
  list: allPaths,
};

const pathsInfo = JSON.stringify({ paths }, null, 2);

const pathsContainer = document.createElement("textarea");
pathsContainer.setAttribute("readonly", true);
pathsContainer.style.width = "40%";
pathsContainer.style.height = "300px";
pathsContainer.style.overflow = "auto";
pathsContainer.textContent = pathsInfo;

document.body.appendChild(pathsContainer);

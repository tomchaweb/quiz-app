const questionText = document.getElementById("question-h2");
const nextButton = document.getElementById("next-btn");
const feedbackToUser = document.getElementById("feedback-message");
const scoreHeading = document.getElementById("score");
const trueButton = document.getElementById("true");
const falseButton = document.getElementById("false");
const restartButton = document.getElementById("restart");

let score = 0;
let numOfQuestions = 10;
let difficulty = "medium";
let category = 11;
// &category=${category}
//general knowledge(9), film(11), music(12)
//tv(14), videogames(15), boardgames(16), science and nature(17)
//science:computers(18), science:maths(19)
//sports(21), geography(22), history(23), politics(24)
//animals(27)

GetQuestions();

async function GetQuestions() {
  try {
    const response = await fetch(
      `https://opentdb.com/api.php?amount=${numOfQuestions}&difficulty=${difficulty}&type=boolean`
    );

    if (!response.ok) {
      throw new error("Fetch unsuccesful");
    }

    restartButton.classList.add("hidden");
    trueButton.classList.remove("hidden");
    falseButton.classList.remove("hidden");
    score = 0;
    scoreHeading.textContent = `Score: ${score}/${numOfQuestions}`;

    const questions = [];
    let currentQuestion = 0;

    const data = await response.json();

    for (let i = 0; i < numOfQuestions; i++) {
      const question = data.results[i].question;
      const questionStep2 = question.replaceAll("&#039;", "'");
      const formattedQuestion = questionStep2.replaceAll("&quot;", "'");
      const answer = data.results[i].correct_answer.toLowerCase();

      questions.push({
        question: formattedQuestion,
        answer: answer,
      });

      questionText.textContent = questions[currentQuestion]["question"];
      feedbackToUser.textContent = "";
    }

    function TrueClicked() {
      if (questions[currentQuestion]["answer"] === "true") {
        feedbackToUser.textContent = "Correct!";
        score += 1;
        scoreHeading.textContent = `Score: ${score}/${numOfQuestions}`;
      } else {
        feedbackToUser.textContent = "That's wrong.";
      }
      trueButton.classList.add("hidden");
      falseButton.classList.add("hidden");
      nextButton.classList.remove("hidden");
    }

    function FalseClicked() {
      if (questions[currentQuestion]["answer"] === "false") {
        feedbackToUser.textContent = "Correct!";
        score += 1;
        scoreHeading.textContent = `Score: ${score}/${numOfQuestions}`;
      } else {
        feedbackToUser.textContent = "That's wrong.";
      }
      trueButton.classList.add("hidden");
      falseButton.classList.add("hidden");
      nextButton.classList.remove("hidden");
    }

    function NextQuestion() {
      restartButton.classList.add("hidden");
      trueButton.classList.remove("hidden");
      falseButton.classList.remove("hidden");
      nextButton.classList.add("hidden");

      currentQuestion += 1;

      if (currentQuestion < numOfQuestions) {
        questionText.textContent = questions[currentQuestion]["question"];
        feedbackToUser.textContent = "";
        scoreHeading.textContent = `Score: ${score}/${numOfQuestions}`;
      } else {
        questionText.textContent = `You got ${score} points this time!`;
        trueButton.classList.add("hidden");
        falseButton.classList.add("hidden");
        restartButton.classList.remove("hidden");
        feedbackToUser.textContent = "";
      }
    }

    nextButton.addEventListener("click", NextQuestion);
    trueButton.addEventListener("click", TrueClicked);
    falseButton.addEventListener("click", FalseClicked);
    restartButton.addEventListener("click", GetQuestions);
  } catch (error) {
    console.log(error);
  }
}

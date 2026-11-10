document.querySelector("button").addEventListener("click", gradeQuiz);

displayQ4Choices();
displayQ8Choices();

let attempts = localStorage.getItem("total_attempts");

if (attempts === null) {
  attempts = 0;
} else {
  attempts = Number(attempts);
}

function isFormValid() {
  let isValid = true;
  let q1Response = document.querySelector("#q1").value;
  let validationFdbk = document.querySelector("#validationFdbk");

  if (q1Response === "") {
    isValid = false;
    validationFdbk.textContent = "Question 1 was not answered";
  }

  return isValid;
}

let score = 0;

function setMarkImage(index, imageName, altText) {
  let markContainer = document.querySelector(`#markImg${index}`);
  markContainer.textContent = "";

  let img = document.createElement("img");
  img.src = `img/${imageName}`;
  img.alt = altText;
  img.className = "align-middle";
  img.style.width = "1em";
  img.style.height = "1em";
  markContainer.appendChild(img);
}

function rightAnswer(index) {
  let feedback = document.querySelector(`#q${index}Feedback`);
  feedback.textContent = "Correct!";
  feedback.className = "bg-success text-white";
  setMarkImage(index, "checkmark.png", "Checkmark");
  score += 10;
}

function wrongAnswer(index) {
  let feedback = document.querySelector(`#q${index}Feedback`);
  feedback.textContent = "Incorrect!";
  feedback.className = "bg-warning text-white";
  setMarkImage(index, "xmark.png", "X mark");
}

function gradeQuiz() {
  document.querySelector("#validationFdbk").textContent = "";

  if (!isFormValid()) {
    return;
  }

    score = 0;
    let q1Response = document.querySelector("#q1").value.toLowerCase();
    let q2Response = document.querySelector("#q2").value;
    let q5Response = document.querySelector("#q5").value;
    let q6Response = document.querySelector("#q6").value;
    let q7Response = document.querySelector("#q7").value;
    let q10Response = document.querySelector("#q10").value;

    if (q1Response === "sacramento") {
      rightAnswer(1);
    } else {
      wrongAnswer(1);
    }

    if (q2Response === "mo") {
      rightAnswer(2);
    } else {
      wrongAnswer(2);
    }

    if (document.querySelector("#Jefferson").checked &&
    document.querySelector("#Roosevelt").checked &&
    !document.querySelector("#Jackson").checked &&
    !document.querySelector("#Franklin").checked) {
    rightAnswer(3);
    } else {
    wrongAnswer(3);
    }

    let selectedQ4 = document.querySelector("input[name=q4]:checked");

    if (selectedQ4 !== null && selectedQ4.value === "Rhode Island") {
    rightAnswer(4);
    } else {
     wrongAnswer(4);
    }

    if (q5Response === "wa") {
      rightAnswer(5);
    } else {
      wrongAnswer(5);
    }

    if (q6Response === "50") {
      rightAnswer(6);
    } else {
      wrongAnswer(6);
    }

    if (q7Response === "1776") {
      rightAnswer(7);
    } else {
      wrongAnswer(7);
    }

    let selectedQ8 = document.querySelector("input[name=q8]:checked");

    if (selectedQ8 !== null && selectedQ8.value === "Pearl Harbor") {
    rightAnswer(8);
    } else {
     wrongAnswer(8);
    }    

    if (document.querySelector("#Hamilton9").checked &&
    document.querySelector("#Franklin9").checked &&
    !document.querySelector("#Jackson9").checked &&
    !document.querySelector("#Bush9").checked) {
    rightAnswer(9);
    } else {
    wrongAnswer(9);
    }

    if (q10Response === "1969") {
      rightAnswer(10);
    } else {
      wrongAnswer(10);
    }

  const totalScore = document.querySelector("#totalScore");
  const feedback = document.querySelector('#feedback');
  if (score > 80)
  {
    feedback.textContent = "Congratulations you scored over 80!"
    feedback.className = "bg-success text-white p-2 rounded";
    totalScore.textContent = `Total Score: ${score}`;
    totalScore.className = "bg-success text-white p-2 rounded";
  } else {
    feedback.textContent = "Unfortunately, you didn't pass."
    feedback.className = "bg-danger text-white p-2 rounded";
    totalScore.textContent = `Total Score: ${score}`;
    totalScore.className = "bg-danger text-white p-2 rounded";
  }

  attempts++;
  document.querySelector("#totalAttempts").textContent = `Total Attempts: ${attempts}`;
  localStorage.setItem("total_attempts", attempts);
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

function displayQ4Choices() {
  let q4ChoicesArray = ["Maine", "Rhode Island", "Maryland", "Delaware"];
  shuffleArray(q4ChoicesArray);

  let choicesContainer = document.querySelector("#q4Choices");
  choicesContainer.textContent = "";

  for (let choice of q4ChoicesArray) {
    let input = document.createElement("input");
    input.type = "radio";
    input.name = "q4";
    input.id = choice;
    input.value = choice;

    let label = document.createElement("label");
    label.htmlFor = choice;
    label.textContent = choice;

    choicesContainer.appendChild(input);
    choicesContainer.appendChild(label);
    choicesContainer.appendChild(document.createTextNode(" "));
  }
}

function displayQ8Choices() {
  let q8ChoicesArray = ["Pearl Harbor", "Black Friday", "Normandy", "Nuclear Bomb"];
  shuffleArray(q8ChoicesArray);

  let choicesContainer = document.querySelector("#q8Choices");
  choicesContainer.textContent = "";

  for (let choice of q8ChoicesArray) {
    let input = document.createElement("input");
    input.type = "radio";
    input.name = "q8";
    input.id = choice;
    input.value = choice;

    let label = document.createElement("label");
    label.htmlFor = choice;
    label.textContent = choice;

    choicesContainer.appendChild(input);
    choicesContainer.appendChild(label);
    choicesContainer.appendChild(document.createTextNode(" "));
  }
}
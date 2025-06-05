let selectedGroup = null;
let timerInterval = null;
let timeElapsed = 0; // em milissegundos

const equations = {
  grupo1: "imagens/equacao1.png",
  grupo2: "imagens/equacao2.png",
  grupo3: "imagens/equacao3.png",
  grupo4: "imagens/equacao4.png"
};

const passwords = {
  grupo1: "435812",
  grupo2: "714823",
  grupo3: "564923",
  grupo4: "865629"
};

window.onload = function() {
  const groupContainer = document.getElementById("group-buttons");

  for (let group in passwords) {
    const button = document.createElement("button");
    button.textContent = group.replace("grupo", "grupo ").toUpperCase();
    button.className = "group-button";
    button.onclick = () => selectGroup(group);

    groupContainer.appendChild(button);
  }
};

function selectGroup(group) {
  selectedGroup = group;
  const equationImg = document.getElementById("equation-img");
  document.getElementById("group-selection").classList.add("hidden");
  document.getElementById("password-screen").classList.remove("hidden");

  // Resetando a interface
  document.getElementById("timer").textContent = "00:00:000";
  document.getElementById("password-input").value = "";
  document.getElementById("password-input").disabled = true;
  document.getElementById("check-button").disabled = true;
  document.getElementById("start-button").disabled = false;
  document.getElementById("success-image").classList.add("hidden");
  equationImg.src = equations[group];
  timeElapsed = 0;
}

function startTimer() {
  const timerDisplay = document.getElementById("timer");
  const input = document.getElementById("password-input");
  const checkBtn = document.getElementById("check-button");
  const startBtn = document.getElementById("start-button");

  startBtn.disabled = true;
  input.disabled = false;
  checkBtn.disabled = false;

  // Exibe tempo inicial
  timerDisplay.textContent = formatTime(timeElapsed);

  timerInterval = setInterval(() => {
    timeElapsed += 10; // a cada 10ms
    timerDisplay.textContent = formatTime(timeElapsed);
  }, 10);
}

function formatTime(milliseconds) {
  const mins = String(Math.floor(milliseconds / 60000)).padStart(2, '0');
  const secs = String(Math.floor((milliseconds % 60000) / 1000)).padStart(2, '0');
  const millis = String(milliseconds % 1000).padStart(3, '0');
  return `${mins}:${secs}:${millis}`;
}

function checkPassword() {
  const input = document.getElementById("password-input");
  const successImage = document.getElementById("success-image");
  const correctPassword = passwords[selectedGroup];

  if (input.value === correctPassword) {
    clearInterval(timerInterval);
    successImage.classList.remove("hidden");
  } else {
    input.classList.add("error");
    setTimeout(() => {
      input.classList.remove("error");
      input.value = "";
    }, 500);
  }
}

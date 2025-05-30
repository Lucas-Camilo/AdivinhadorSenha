let selectedGroup = null;
let timerInterval = null;
let timeElapsed = 0; // em milissegundos

const passwords = {
  grupo1: "435812",
  grupo2: "714823",
  grupo3: "564923",
  grupo4: "865629",
  grupo5: "753947",
  grupo6: "843510",
  grupo7: "105335",
  grupo8: "954642",
  grupo9: "11637210",
  grupo10: "763554",
  grupo11: "123832",
  grupo12: "973737",
  grupo13: "987535",
  grupo14: "934636",
  grupo15: "11747210",
  grupo16: "685659",
  grupo17: "11587310",
  grupo18: "764837",
  grupo19: "14536415",
  grupo20: "10747315",
  grupo21: "1157835",
  grupo22: "10946212",
  grupo23: "975726",
  grupo24: "11939412",
  grupo25: "12956315",
  grupo26: "1043749",
  grupo27: "10766310",
  grupo28: "10855312",
  grupo29: "16677316",
  grupo30: "1383939",
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
  document.getElementById("group-selection").classList.add("hidden");
  document.getElementById("password-screen").classList.remove("hidden");

  // Resetando a interface
  document.getElementById("timer").textContent = "00:00:000";
  document.getElementById("password-input").value = "";
  document.getElementById("password-input").disabled = true;
  document.getElementById("check-button").disabled = true;
  document.getElementById("start-button").disabled = false;
  document.getElementById("success-image").classList.add("hidden");

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

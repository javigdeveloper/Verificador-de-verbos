const fbDb = firebase.firestore();
const fbAuth = firebase.auth();
const button = document.getElementById("ans-btn");
const form = document.querySelector("#add-verb-form");
const signOut = document.querySelector(".logout");
const body = document.getElementById("body");
const dropdown = document.querySelector(".arrow");
const menu = document.querySelector(".menu");
const modalOneBtn = document.querySelector("#modalOneBtn");
const modalOne = document.querySelector(".modalOne");
const instructionOne = document.querySelector(".instructionOne");
const modalOneLink = document.querySelector(".modalOneLink");
const modalTwoLink = document.querySelector(".modalTwoLink");
const modalTwo = document.querySelector(".modalTwo");
const buildButton = document.getElementById("build-btn");

// adding classes to display elements:
dropdown.addEventListener("click", () => {
  menu.classList.toggle("open");
});

modalOneBtn.addEventListener("click", () => {
  modalOne.classList.toggle("open");
  instructionOne.classList.remove("grow");
  modalOneBtn.classList.remove("open");
});

modalOneLink.addEventListener("click", () => {
  modalOne.classList.toggle("open");
  modalTwo.classList.remove("open");
  instructionOne.classList.remove("grow");
});

growMessage = () => {
  setTimeout(() => {
    instructionOne.classList.add("grow");
  }, 1500);
};

addButton = () => {
  setTimeout(() => {
    modalOneBtn.classList.add("open");
  }, 3000);
};

body.addEventListener("load", growMessage());
body.addEventListener("load", addButton());

modalTwoLink.addEventListener("click", () => {
  modalOne.classList.remove("open");
  modalTwo.classList.toggle("open");
  modalOneBtn.classList.remove("open");
  instructionOne.classList.remove("grow");
});

// remove menu or modals if click on body:
body.addEventListener("click", (e) => {
  if (e.target.classList.contains("body-class")) {
    modalOne.classList.remove("open");
    menu.classList.remove("open");
    modalTwo.classList.remove("open");
    modalThree.classList.remove("open");
    modalTwo.classList.remove("extra");
  }
});

// auth listener
let message = document.getElementsByClassName("status")[0];
fbAuth.onAuthStateChanged((user) => {
  if (user) {
    body.style.display = "block";
    message.innerHTML = `Has iniciado sesión como ${user.email}`;
  } else {
    body.style.display = "none";
    message.innerHTML = "Has salido";
  }
});

// sign out
signOut.addEventListener("click", () => {
  console.log("listening for signout on app.js");

  fbAuth.signOut().then(() => {
    console.log("signed out");
    // this link is most probably going to change on deploy!!!
    location.replace("index.html");
    // this link is most probably going to change on deploy!!!
  });
});

// saving data:

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const usuario = fbAuth.currentUser.uid;
  const savingWithUser = fbDb
    .collection("users")
    .doc(usuario)
    .collection("regular-verbs");
  savingWithUser.add({
    ending: form.ending.value,
  });
  form.ending.value = "";
});

// ------------------------------
// App:
// ------------------------------

// inside modal one:
button.addEventListener("click", function () {
  checkEndings();
});

// inside modal two:
const errorParagraph = document.querySelector(".not-infinitive");

// inside modal three:
const modalThree = document.querySelector(".modalThree");
const yo = document.querySelector(".yo");
const tu = document.querySelector(".tu");
const el = document.querySelector(".el");
const nosotros = document.querySelector(".nosotros");
const ustedes = document.querySelector(".ustedes");
const ellos = document.querySelector(".ellos");

buildButton.addEventListener("click", function (e) {
  let sentenceContent = document.getElementById("sentence-input").value;
  modalThree.classList.add("open");
  modalTwo.classList.add("extra");
  // identifying the ending..
  let patt1 = /.*ar$/i;
  let patt2 = /.*er$/i;
  let patt3 = /.*ir$/i;
  if (sentenceContent.match(patt1)) {
    conjugateAr(sentenceContent);
  } else if (sentenceContent.match(patt2)) {
    conjugateEr(sentenceContent);
  } else if (sentenceContent.match(patt3)) {
    conjugateIr(sentenceContent);
  } else {
    modalThree.classList.remove("open");
    modalTwo.classList.remove("extra");
    errorParagraph.innerHTML =
      "Escribe un verbo en infinitivo terminado en ar, er, ir";
    setTimeout(() => {
      errorParagraph.innerHTML = "";
    }, 3000);
  }
  console.log("sentenceContent variable ", sentenceContent);
});

// let patt1 = /(.*)(?=ar)/i;
let result = "";
function conjugateAr(verb) {
  let end1 = /.*(?=ar)/i;
  result = verb.match(end1);
  yo.innerHTML = result[0] + "o";
  tu.innerHTML = result[0] + "as";
  el.innerHTML = result[0] + "a";
  nosotros.innerHTML = result[0] + "amos";
  ustedes.innerHTML = result[0] + "an";
  ellos.innerHTML = result[0] + "an";
}

function conjugateEr(verb) {
  let end2 = /.*(?=er)/i;
  result = verb.match(end2);
  yo.innerHTML = result[0] + "o";
  tu.innerHTML = result[0] + "es";
  el.innerHTML = result[0] + "e";
  nosotros.innerHTML = result[0] + "emos";
  ustedes.innerHTML = result[0] + "en";
  ellos.innerHTML = result[0] + "en";
}

function conjugateIr(verb) {
  let end3 = /.*(?=ir)/i;
  result = verb.match(end3);
  yo.innerHTML = result[0] + "o";
  tu.innerHTML = result[0] + "es";
  el.innerHTML = result[0] + "e";
  nosotros.innerHTML = result[0] + "imos";
  ustedes.innerHTML = result[0] + "en";
  ellos.innerHTML = result[0] + "en";
}

function checkEndings() {
  let firstSingAr = document.getElementById("firstSingAr");
  let secondSingAr = document.getElementById("secondSingAr");
  let thirdSingAr = document.getElementById("thirdSingAr");
  let firstPlurAr = document.getElementById("firstPlurAr");
  let secondPlurAr = document.getElementById("secondPlurAr");
  let thirdPlurAr = document.getElementById("thirdPlurAr");
  let firstSingEr = document.getElementById("firstSingEr");
  let secondSingEr = document.getElementById("secondSingEr");
  let thirdSingEr = document.getElementById("thirdSingEr");
  let firstPlurEr = document.getElementById("firstPlurEr");
  let secondPlurEr = document.getElementById("secondPlurEr");
  let thirdPlurEr = document.getElementById("thirdPlurEr");
  let firstSingIr = document.getElementById("firstSingIr");
  let secondSingIr = document.getElementById("secondSingIr");
  let thirdSingIr = document.getElementById("thirdSingIr");
  let firstPlurIr = document.getElementById("firstPlurIr");
  let secondPlurIr = document.getElementById("secondPlurIr");
  let thirdPlurIr = document.getElementById("thirdPlurIr");

  let arrOfVariables = [
    firstSingAr,
    secondSingAr,
    thirdSingAr,
    firstPlurAr,
    secondPlurAr,
    thirdPlurAr,
    firstSingEr,
    secondSingEr,
    thirdSingEr,
    firstPlurEr,
    secondPlurEr,
    thirdPlurEr,
    firstSingIr,
    secondSingIr,
    thirdSingIr,
    firstPlurIr,
    secondPlurIr,
    thirdPlurIr,
  ];

  for (let i = 0; i < arrOfVariables.length; i++) {
    const element = arrOfVariables[i];
    element.removeAttribute("class");
  }

  if (firstSingAr.value == "o") {
    firstSingAr.setAttribute("class", "correct");
  } else {
    firstSingAr.setAttribute("class", "incorrect");
  }
  if (secondSingAr.value == "as") {
    secondSingAr.setAttribute("class", "correct");
  } else {
    secondSingAr.setAttribute("class", "incorrect");
  }
  if (thirdSingAr.value == "a") {
    thirdSingAr.setAttribute("class", "correct");
  } else {
    thirdSingAr.setAttribute("class", "incorrect");
  }
  if (firstPlurAr.value == "amos") {
    firstPlurAr.setAttribute("class", "correct");
  } else {
    firstPlurAr.setAttribute("class", "incorrect");
  }
  if (secondPlurAr.value == "an") {
    secondPlurAr.setAttribute("class", "correct");
  } else {
    secondPlurAr.setAttribute("class", "incorrect");
  }
  if (thirdPlurAr.value == "an") {
    thirdPlurAr.setAttribute("class", "correct");
  } else {
    thirdPlurAr.setAttribute("class", "incorrect");
  }

  if (firstSingEr.value == "o") {
    firstSingEr.setAttribute("class", "correct");
  } else {
    firstSingEr.setAttribute("class", "incorrect");
  }
  if (secondSingEr.value == "es") {
    secondSingEr.setAttribute("class", "correct");
  } else {
    secondSingEr.setAttribute("class", "incorrect");
  }
  if (thirdSingEr.value == "e") {
    thirdSingEr.setAttribute("class", "correct");
  } else {
    thirdSingEr.setAttribute("class", "incorrect");
  }
  if (firstPlurEr.value == "emos") {
    firstPlurEr.setAttribute("class", "correct");
  } else {
    firstPlurEr.setAttribute("class", "incorrect");
  }
  if (secondPlurEr.value == "en") {
    secondPlurEr.setAttribute("class", "correct");
  } else {
    secondPlurEr.setAttribute("class", "incorrect");
  }
  if (thirdPlurEr.value == "en") {
    thirdPlurEr.setAttribute("class", "correct");
  } else {
    thirdPlurEr.setAttribute("class", "incorrect");
  }

  if (firstSingIr.value == "o") {
    firstSingIr.setAttribute("class", "correct");
  } else {
    firstSingIr.setAttribute("class", "incorrect");
  }
  if (secondSingIr.value == "es") {
    secondSingIr.setAttribute("class", "correct");
  } else {
    secondSingIr.setAttribute("class", "incorrect");
  }
  if (thirdSingIr.value == "e") {
    thirdSingIr.setAttribute("class", "correct");
  } else {
    thirdSingIr.setAttribute("class", "incorrect");
  }
  if (firstPlurIr.value == "imos") {
    firstPlurIr.setAttribute("class", "correct");
  } else {
    firstPlurIr.setAttribute("class", "incorrect");
  }
  if (secondPlurIr.value == "en") {
    secondPlurIr.setAttribute("class", "correct");
  } else {
    secondPlurIr.setAttribute("class", "incorrect");
  }
  if (thirdPlurIr.value == "en") {
    thirdPlurIr.setAttribute("class", "correct");
  } else {
    thirdPlurIr.setAttribute("class", "incorrect");
  }

  // I think I need to convert the variables to objects so I can
  // iterate and shorten the code.
}

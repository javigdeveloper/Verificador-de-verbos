const fbDb = firebase.firestore();
const fbAuth = firebase.auth();
let paragraphOne = document.getElementById("par-pres");
let button = document.getElementById("ans-btn");
let buildButton = document.getElementById("build-btn");
const form = document.querySelector("#add-verb-form");
const signOut = document.querySelector(".logout");
const body = document.getElementById("body");
const dropdown = document.querySelector(".arrow");
const menu = document.querySelector(".menu");
const modalOneBtn = document.querySelector("#modalOneBtn");
const modalOne = document.querySelector(".modalOne");
const instructionOne = document.querySelector(".instructionOne");

dropdown.addEventListener("click", () => {
  menu.classList.toggle("open");
});

modalOneBtn.addEventListener("click", () => {
  modalOne.classList.toggle("open");
  // instructionOne.classList.remove("grow");
  // modalOneBtn.classList.remove("open");
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

// remove menu or modals if click on body:
body.addEventListener("click", (e) => {
  if (e.target.classList.contains("body-class")) {
    modalOne.classList.remove("open");
    menu.classList.remove("open");
    // space for modal two
    // space for modal two
    // space for modal two
  }
});

// auth listener
let message = document.getElementsByClassName("status")[0];
fbAuth.onAuthStateChanged((user) => {
  if (user) {
    body.style.display = "block";
    message.innerHTML = `You are logged in as ${user.email}`;
  } else {
    body.style.display = "none";
    message.innerHTML = "You are logged out";
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

// saving data

// *************************
// the uid shouldn't be inside the document, but instead the collection id which
// is automatic for now
// *************************

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
  // savingWithUser.set(
  //   {
  //     ending: form.ending.value,
  //   },
  //   { merge: true }
  // );
  form.ending.value = "";
});

// ------------------------------
// App:
// ------------------------------

button.addEventListener("click", function () {
  fillParagraph();
});

// buildButton.addEventListener("click", function (e) {
//   loopOverParContainer();
// });

// function loopOverParContainer() {
// let sentenceContent = document.getElementById("sentence-input").value;
// let ending = document.getElementById("infinitive-input").value;
// paragraphOne.innerHTML = sentenceContent + ending;
// }

function fillParagraph() {
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

  // from this point I think I need to convert the variables to objects so I can
  // iterate and shorten the code.
}

const fbDb = firebase.firestore();
const fbAuth = firebase.auth();
const signOut = document.querySelector(".logout");
const body = document.getElementById("body");
const dropdown = document.querySelector(".arrow");
const menu = document.querySelector(".menu");

// adding classes to display elements:
dropdown.addEventListener("click", () => {
  menu.classList.toggle("open");
});

// remove menu or modals if click on body:
body.addEventListener("click", (e) => {
  if (e.target.classList.contains("body-class")) {
    menu.classList.remove("open");
    // modalOne.classList.remove("open");
    // modalTwo.classList.remove("open");
    // modalThree.classList.remove("open");
  }
});

let message = document.getElementsByClassName("status")[0];
fbAuth.onAuthStateChanged((user) => {
  usuario = user.uid;

  // real-time listener
  fbDb
    .collection("users")
    .doc(usuario)
    .collection("regular-verbs")
    .orderBy("ending")
    .onSnapshot((snapshot) => {
      let changes = snapshot.docChanges();
      changes.forEach((change) => {
        console.log(usuario);
        console.log(change.doc.data());
        if (change.type == "added") {
          renderVerb(change.doc, usuario);
        } else if (change.type == "removed") {
          let li = verbList.querySelector("[data-id=" + change.doc.id + "]");
          verbList.removeChild(li);
        }
      });
    });

  // auth listener
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

// database manipulation:
const verbList = document.querySelector("#verb-list");

// create HTML elements
function renderVerb(doc, usuario) {
  let li = document.createElement("li");
  let removeBtn = document.createElement("button");
  let checkBtn = document.createElement("button");
  li.setAttribute("data-id", doc.id);
  li.textContent = doc.data().ending;
  removeBtn.textContent = "Remover de la lista";
  checkBtn.textContent = "Confirmar con lista oficial";
  verbList.appendChild(li);
  li.appendChild(removeBtn);
  li.appendChild(checkBtn);
  console.log(usuario);

  // deleting data
  removeBtn.addEventListener("click", (e) => {
    // Testing if I need the next line...
    // let id = e.target.parentElement.getAttribute("data-id");
    fbDb
      .collection("users")
      .doc(usuario)
      .collection("regular-verbs")
      .doc(doc.id)
      .delete();
    console.log("deleted");
  });

  // let officialList = [
  //   "amar",
  //   "avivar",
  //   "ayudar",
  //   "castigar",
  //   "caminar",
  //   "donar",
  //   "felicitar",
  //   "financiar",
  //   "ganar",
  //   "pagar",
  // ];

  checkBtn.addEventListener("click", () => {
    let uniqueVerb = doc.data().ending;
    console.log(list[0]);
    console.log("this is unique " + uniqueVerb);
    if (list.includes(uniqueVerb)) {
      li.style.color = "green";
      console.log(uniqueVerb);
    } else {
      li.style.color = "red";
    }
  });
}

// getting data
// firebase
//   .firestore()
//   .collection("users")
//   .get()
//   .then((snapshot) => {
//     snapshot.docs.forEach((doc) => {
//       renderVerb(doc);
//     });
//   });

// another way for getting the uid:
// const usuario = firebase.auth().currentUser;
// console.log(usuario);

// testing using node to access verbList File...
// const listOfVerbs = require("./verbList");

console.log(list[0]);

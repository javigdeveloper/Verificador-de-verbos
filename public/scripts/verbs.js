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
  fbAuth.signOut().then(() => {
    location.replace("index.html");
    // this link is probably going to change on deploy!!!
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
  removeBtn.textContent = "Remover";
  checkBtn.textContent = "Confirmar";
  verbList.appendChild(li);
  li.appendChild(checkBtn);
  li.appendChild(removeBtn);

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
  });

  // checking if a verb is regular against the official verbList:
  checkBtn.addEventListener("click", () => {
    let uniqueVerb = doc.data().ending;
    if (list.includes(uniqueVerb)) {
      li.style.color = "green";
    } else {
      li.style.color = "red";
    }
  });
}

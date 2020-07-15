const fbDb = firebase.firestore();
const fbAuth = firebase.auth();
const signOut = document.querySelector(".logout");
const body = document.getElementById("body");

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

  if (user) {
    body.style.display = "block";
  } else {
    body.style.display = "none";
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
  li.setAttribute("data-id", doc.id);
  li.textContent = doc.data().ending;
  removeBtn.textContent = "Remove";
  verbList.appendChild(li);
  li.appendChild(removeBtn);
  console.log(usuario);

  // deleting data
  removeBtn.addEventListener("click", (e) => {
    // e.stopPropagation();
    let id = e.target.parentElement.getAttribute("data-id");
    fbDb
      .collection("users")
      .doc(usuario)
      .collection("regular-verbs")
      .doc(doc.id)
      .delete();
    console.log("deleted");
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

const fbDb = firebase.firestore();
const fbAuth = firebase.auth();
const loginForm = document.querySelector(".login");
const registerForm = document.querySelector(".register");
const loginBtn = document.querySelector(".login-btn");
const signBtn = document.querySelector(".sign-btn");
const veil = document.querySelector(".veil");
const signSwitches = document.querySelectorAll(".switch");
const modals = document.querySelectorAll(".modal");
const loginModal = document.querySelector("#login-modal");
const registerModal = document.querySelector("#register-modal");
const menuBtn = document.querySelector(".menu-btn");
const pop = document.querySelector(".pop");

menuBtn.addEventListener("click", () => {
  menuBtn.classList.toggle("open");
  pop.classList.toggle("pop-open");
});

signSwitches.forEach((link) => {
  link.addEventListener("click", () => {
    modals.forEach((modal) => modal.classList.toggle("active"));
  });
});

loginBtn.addEventListener("click", () => {
  veil.classList.add("open");
  loginModal.classList.add("active");
  pop.classList.toggle("pop-open");
  menuBtn.classList.add("closed");
});

signBtn.addEventListener("click", () => {
  veil.classList.add("open");
  registerModal.classList.add("active");
  pop.classList.toggle("pop-open");
  menuBtn.classList.add("closed");
});

veil.addEventListener("click", (e) => {
  if (e.target.classList.contains("veil")) {
    veil.classList.remove("open");
    loginModal.classList.remove("active");
    registerModal.classList.remove("active");
    menuBtn.classList.remove("closed");
    menuBtn.classList.remove("open");
  }
});

// register form
registerForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = registerForm.email.value;
  const password = registerForm.password.value;

  fbAuth
    .createUserWithEmailAndPassword(email, password)
    .then((user) => {
      registerForm.reset();
      location.replace("checker.html");
    })
    .catch((error) => {
      registerForm.querySelector(".error").textContent =
        "Debes ingresar una cuenta válida de correo.";
      // registerForm.querySelector(".error").textContent = error.message;
    });
});

// login form
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let email = loginForm.email.value;
  let password = loginForm.password.value;
  fbAuth
    .signInWithEmailAndPassword(email, password)
    .then((user) => {
      loginForm.reset();
      location.replace("checker.html");
      // this link is most probably going to change on deploy!!!
    })
    .catch((error) => {
      loginForm.querySelector(".error").textContent =
        "Debes ingresar una cuenta válida de correo.";
      // loginForm.querySelector(".error").textContent = error.message;
    });
});

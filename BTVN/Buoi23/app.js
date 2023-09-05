const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const login = $(".login");
const register = $(".register");
const formLogin = $(".form-login");
const formRegister = $(".form-register");

const overlay = $(".overlay");
const btn = $(".btn");
const container = $(".container");
const iconEyes = $$(".iconEye");
const password = $(".password");
const email = $(".email");
const user = $("#user");
const emailRegister = $("#email-register");
const passwordRegister = $("#password-register");

const submitBtn = $(".btn-submit");
const submitRegisterBtn = $(".btn-submit-register");

const errorEmail = $(".error-email");
const errorPassword = $(".error-password");
const errorEmailRegister = $(".error-email-register");
const errorPasswordRegister = $(".error-password-register");
const errorUser = $(".error-user");
const errorForm = $(".error-form");

btn.addEventListener("click", function () {
     toggleContainer(true);
});

overlay.addEventListener("click", function () {
     toggleContainer(false);
});
[...iconEyes].map((display) =>
     display.addEventListener("click", function () {
          if (password.type === "password" || passwordRegister.type === "password") {
               password.type = "text";
               passwordRegister.type = "text";
               display.classList.remove("fa-eye");
               display.classList.add("fa-eye-slash");
               // display.classList.toggle("fa-eye-slash");
          } else {
               password.type = "password";
               passwordRegister.type = "password";
               display.classList.remove("fa-eye-slash");
               display.classList.add("fa-eye");
               // display.classList.toggle("fa-eye-slash");
          }
     })
);
function toggleContainer(show) {
     if (show) {
          container.classList.add("open");
          overlay.style.display = "block";
     } else {
          container.classList.remove("open");
          overlay.style.display = "none";
     }
}
login.addEventListener("click", function () {
     formRegister.style.display = "none";
     formLogin.style.display = "block";
     resetFields("login");
});
register.addEventListener("click", function () {
     formRegister.style.display = "block";
     formLogin.style.display = "none";
     resetFields("register");
});

function resetFields(key) {
     if (key === "register") {
          email.value = "";
          password.value = "";
          errorEmail.innerText = "";
          errorPassword.innerText = "";
     } else if (key === "login") {
          user.value = "";
          emailRegister.value = "";
          passwordRegister.value = "";
          errorEmailRegister.innerText = "";
          errorPasswordRegister.innerText = "";
     }
}
function setError(error_type, message) {
     error_type.classList.add("error");
     error_type.innerText = message;
     if (error_type) {
          var commonParent = error_type.closest(".form-row");
          if (commonParent) {
               var inputEls = $$("input");
               inputEls.forEach((inputEl) => (inputEl.style.border = "1px solid red"));
          }
     }
}
function clearError(error_type) {
     error_type.classList.remove("error");
     error_type.innerText = "";
     if (error_type) {
          var commonParent = error_type.closest(".form-row");
          if (commonParent) {
               var inputEls = $$("input");
               inputEls.forEach((inputEl) => (inputEl.style.border = ""));
          }
     }
}
function isValidEmail(email) {
     var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
     return emailPattern.test(email);
}
function isValidPassword(password) {
     return password.length >= 5;
}
function isValidUser(user) {
     const nameParts = user.split(" ");
     if (nameParts.length >= 2) {
          return true;
     } else {
          return false;
     }
}
submitBtn.addEventListener("click", function (e) {
     e.preventDefault();

     const emailValue = email.value.trim();
     const passwordValue = password.value;

     var isEmailValid = isValidEmail(emailValue);
     var isPasswordValid = isValidPassword(passwordValue);

     if (passwordValue === "") {
          setError(errorPassword, "Vui lòng nhập mật khẩu");
     } else if (!isPasswordValid) {
          setError(errorPassword, "Mật khẩu phải ít nhất 5 ký tự");
     } else {
          clearError(errorPassword);
     }

     if (emailValue === "") {
          setError(errorEmail, "Vui lòng nhập email");
     } else if (!isValidEmail(emailValue)) {
          setError(errorEmail, "Email không đúng định dạng");
     } else {
          clearError(errorEmail);
     }

     if (isEmailValid && isPasswordValid) {
          clearError(errorEmail);
          clearError(errorPassword);
          errorForm.style.display = "block";
     }
});

submitRegisterBtn.addEventListener("click", function (e) {
     e.preventDefault();

     const userValue = user.value.trim();
     const emailValue = emailRegister.value.trim();
     const passwordValue = passwordRegister.value;

     var isUserValid = isValidUser(userValue);
     var isEmailValid = isValidEmail(emailValue);
     var isPasswordValid = isValidPassword(passwordValue);

     if (userValue === "") {
          setError(errorUser, "Vui lòng nhập họ và tên");
     } else {
          clearError(errorUser);
     }

     if (passwordValue === "") {
          setError(errorPasswordRegister, "Vui lòng nhập mật khẩu");
     } else if (!isPasswordValid) {
          setError(errorPasswordRegister, "Mật khẩu phải ít nhất 5 ký tự");
     } else {
          clearError(errorPasswordRegister);
     }

     if (emailValue === "") {
          setError(errorEmailRegister, "Vui lòng nhập email");
     } else if (!isValidEmail(emailValue)) {
          setError(errorEmailRegister, "Email không đúng định dạng");
     } else {
          clearError(errorEmailRegister);
     }

     if (isUserValid && isEmailValid && isPasswordValid) {
          clearError(errorEmailRegister);
          clearError(errorPasswordRegister);
     }
});

"use strict";
import {login} from "./Requests/users/users.js";
import {accepted, setAuthTokenInLocalStorage, validate} from "./utils/helper.js";

const email = document.getElementById("email");
const emailMessage = document.getElementById('email-message');
const password = document.getElementById("password");
const passwordMessage = document.getElementById('password-message');
const signInBtn = document.getElementById("signInBtn");
const loading = document.getElementById("loading");
const redirectBackBtn = document.getElementById("redirectBack");
const showPasswordBtn = document.getElementById("showPass");


signInBtn.addEventListener("click", (e) => {
    let validated = {
        email: (email.value === "") ? validate("required", emailMessage) : accepted(email.value, emailMessage),
        password: (password.value === "") ? validate("required", passwordMessage) : accepted(password.value, passwordMessage),
    }
    if (!Object.values(validated).includes(undefined)) {
        loading.classList.remove("hidden")
        loading.classList.add("flex")
        login(validated.email, validated.password)
            .then(res => {
                setAuthTokenInLocalStorage(res.accessToken);
                window.location.href = "/public/home.html";
            }).finally(() => {
            loading.classList.remove("flex")
            loading.classList.add("hidden")
        })
    }


})

redirectBackBtn.onclick = () => {
    window.location.href = "/public/onboarding.html";
}

showPasswordBtn.onclick = () => {
    if (password.type === "password") {
            password.type = "text";
    }else {
        password.type = "password";
    }
}


password.addEventListener("input", ()=>{
    if (email.value !== ""){
        signInBtn.disabled = false;
    }
    if (password.value === ""){
        signInBtn.disabled = true;
    }
})
email.addEventListener("input", ()=>{
    if (password.value !== ""){
        signInBtn.disabled = false;
    }
    if (email.value === ""){
        signInBtn.disabled = true;
    }
})
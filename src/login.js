"use strict";
import {login} from "./Requests/users/users.js";
import {accepted, setAuthTokenInLocalStorage, validate, message} from "./utils/helper.js";

const email = document.getElementById("email");
const password = document.getElementById("password");
const signInBtn = document.getElementById("signInBtn");
const loading = document.getElementById("loading");
const redirectBackBtn = document.getElementById("redirectBack");
const showPasswordBtn = document.getElementById("showPass");

const emailPattern =/^[^\s@]+@[^\s@]+\.[^\s@]+$/;


signInBtn.addEventListener("click", (e) => {
    if (emailPattern.test(email.value)){
        loading.classList.remove("hidden")
        loading.classList.add("flex")
        login(email.value, password.value)
            .then((res) => {
                if (res) {
                    message("Let's Go", "#065F46");
                    setTimeout(() => {
                        setAuthTokenInLocalStorage(res.accessToken);
                        window.location.replace("/public/home.html");
                    }, 2000)
                }
            })
            .finally(() => {
            loading.classList.add("hidden")
            loading.classList.remove("flex")
        })
    }else {
        message("Please Enter A Valid Email Format" , "#9F1239")
    }


})

redirectBackBtn.onclick = () => {
    window.location.href = "/public/onboarding.html";
}

showPasswordBtn.onclick = () => {
    if (password.type === "password") {
        password.type = "text";
        showPasswordBtn.src = "./assets/Images/Hide.svg";
    } else {
        password.type = "password";
        showPasswordBtn.src = "./assets/Images/Show.svg";

    }
}


password.addEventListener("input", () => {
    if (email.value !== "") {
        signInBtn.disabled = false;
    }
    if (password.value === "") {
        signInBtn.disabled = true;
    }
})
email.addEventListener("input", () => {
    if (password.value !== "") {
        signInBtn.disabled = false;
    }
    if (email.value === "") {
        signInBtn.disabled = true;
    }
})
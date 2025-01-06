import {getUser} from "./Requests/users/users.js";

const signOutBtn = document.getElementById("signOutBtn");
const picProfile = document.getElementById("profile");
const loading = document.getElementById("loading");


signOutBtn.addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.replace("/public/onboarding.html");
})

function render() {
    loading.classList.replace("hidden", "flex");
    getUser()
        .then(user => {
            picProfile.src = user?.avatar ?? "./assets/Images/profile.png";
        }).finally(() => {
        loading.classList.replace("flex", "hidden");
    })
}

render();
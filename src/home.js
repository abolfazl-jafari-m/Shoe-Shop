import {getUser} from "./Requests/users/users.js";


const username = document.getElementById('username');
const loading = document.getElementById("loading");
const wishList = document.getElementById("wishList");
const search = document.getElementById('search');
const contents = document.getElementById("content");
const searchBox = document.getElementById("searchBox")

search.onfocus = ()=>{
    contents.classList.remove("flex");
    contents.classList.add("hidden");
    searchBox.classList.add("flex");
    searchBox.classList.remove("hidden");
}
search.addEventListener("focusout" , ()=>{
    contents.classList.add("flex");
    contents.classList.remove("hidden");
    searchBox.classList.remove("flex");
    searchBox.classList.add("hidden");
})

wishList.onclick = ()=>{
    window.location.href = "/public/products/wishList.html";
}

function render(){
    loading.classList.remove("hidden");
    loading.classList.add("flex");
    getUser()
        .then(res=>{
            username.innerHTML = res ?? "Guest";
        }).finally(()=>{
        loading.classList.remove("flex");
        loading.classList.add("hidden");
    })
}

render();
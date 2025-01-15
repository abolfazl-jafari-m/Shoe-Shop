import {getUser} from "./Requests/users/users.js";
import {getProducts, getProductsByFilter} from "./Requests/products/products.js";


const username = document.getElementById('username');
const avatar = document.getElementById("avatar");
const loading = document.getElementById("loading");
const wishList = document.getElementById("wishList");
const search = document.getElementById('search');
const welcomeMessage = document.getElementById("welcomeMessage");
const notificationBtn = document.getElementById("notifications");
const notificationBox = document.getElementById("notificationBox");


const searchBox = document.getElementById("searchBox")
const productsBox = document.getElementById("products-box");
const filtersBtn = document.getElementById("filtersBtn").children;

const time = new Date().getHours();

search.onfocus = () => {
   window.location.href= "/public/search.html";
}


wishList.onclick = () => {
    window.location.href = "/public/products/wishList.html";
}
for (const btn of filtersBtn) {
    btn.addEventListener("click", () => {
        for (const item of filtersBtn) {
            item.classList.remove("bg-[#343A40]");
            item.classList.remove("text-white");
        }
        btn.classList.add("bg-[#343A40]");
        btn.classList.add("text-white");
        fillerByBrand(btn.innerText)
    })
}

notificationBtn.addEventListener("click", ()=>{
    notificationBox.classList.toggle("hidden" );
    notificationBox.classList.toggle("flex" );
})

function fillerByBrand(brand) {
    brand = (brand !== "All") ? brand : "";
    loading.classList.remove("hidden")
    loading.classList.add("flex");
    productsBox.innerHTML = "";
    getProductsByFilter("brand", brand.toUpperCase())
        .then((res) => {
            if (res) {
                res.forEach(item => {
                    productsBox.innerHTML += `
                     <a href="/public/products/product.html?id=${item.id}">
                        <div class="flex flex-col items-center gap-3">
                            <div class="rounded-xl flex items-center justify-center p-3 bg-[#F6F6F6] ">
                                <img src="${item.imageURL[0]}" alt="${item.slug}" class="w-36 h-36">
                            </div>
                            <div class="flex flex-col gap-2 px-1 w-full">
                                <h4 class="line-clamp-1 text-[#152536] font-bold text-xl tracking-tight">${item.name}</h4>
                                <span class="text-[#152536] font-semibold">$ ${item.price}</span>
                            </div>
                        </div>
                  </a>
                    `
                })
            }
        }).finally(() => {
        loading.classList.add("hidden");
        loading.classList.remove("flex");
    })
}


function render() {
    (time < 12)  ? welcomeMessage.innerHTML = "Good Morning" :  welcomeMessage.innerHTML = "Good Evening"
    loading.classList.remove("hidden");
    loading.classList.add("flex");
    getUser()
        .then(res => {
            username.innerHTML = res.username ?? "Guest";
            avatar.src = res?.avatar ?? "./assets/Images/profile.png";
            return getProducts()
        }).then((res) => {
        productsBox.innerHTML = ""
        res.forEach((item) => {
            productsBox.innerHTML += `
                  <a href="/public/products/product.html?id=${item.id}">
                    <div class="flex flex-col items-center gap-3 w-full">
                        <div class="rounded-xl flex items-center justify-center p-3 bg-[#F6F6F6] ">
                            <img src="${item.imageURL[0]}" alt="${item.slug}" class="w-36 h-36">
                        </div>
                        <div class="flex flex-col gap-2 px-1 w-full">
                            <h4 class="line-clamp-1 text-[#152536] font-bold text-xl tracking-tight">${item.name}</h4>
                            <span class="text-[#152536] font-semibold">$ ${item.price}</span>
                        </div>
                    </div>
                   </a>
                `
        })
    })
        .finally(() => {
            loading.classList.remove("flex");
            loading.classList.add("hidden");
        })
}

render();
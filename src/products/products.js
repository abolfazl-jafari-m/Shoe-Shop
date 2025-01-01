import {getProducts, getProductsByFilter} from "../Requests/products/products.js";
import {fillerByBrand} from "../home.js";

const productsBox = document.getElementById("products-box");
const loading = document.getElementById("loading");
const backBtn = document.getElementById("back");
const filtersBtn = document.getElementById("filtersBtn").children;

backBtn.onclick = () => {
    window.location.href = "/public/home.html";
}

for (const btn of filtersBtn) {
    btn.addEventListener("click", (e) => {
        for (const item of filtersBtn) {
            item.classList.remove("bg-[#343A40]");
            item.classList.remove("text-white");
        }
        btn.classList.add("bg-[#343A40]");
        btn.classList.add("text-white");
        fillerByBrand(btn.innerText);
    })
}




function render() {
    document.title = "Most Popular";
    loading.classList.remove("hidden");
    loading.classList.add("flex");
    products.innerHTML = "";
    getProducts()
        .then((res) => {
            if (res) {
                res.forEach(item => {
                    products.innerHTML += `
                     <a href="/public/products/product.html?id=${item.id}">
                        <div class="flex flex-col items-center gap-3">
                            <div class="rounded-xl flex items-center justify-center p-3 bg-[#F6F6F6] ">
                                <img src="${item.imageURL}" alt="${item.slug}" class="w-36 h-36">
                            </div>
                            <div class="flex flex-col gap-2 px-1">
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

render();
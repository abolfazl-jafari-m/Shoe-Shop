import {getProductsByFilter, getProducts} from "../Requests/products/products.js";

const productBox = document.getElementById("products-box");
const loading = document.getElementById("loading");
const backBtn = document.getElementById("backBtn");
const title = document.getElementById("title")

const query = new URLSearchParams(window.location.search)
const brand = query.get("brand");


backBtn.onclick = ()=>{
    window.location.href = "/public/home.html"
}

function render() {
    document.title = brand.toUpperCase();
    title.innerHTML = brand;
    loading.classList.remove("hidden");
    loading.classList.add("flex");
    productBox.innerHTML = "";
    getProductsByFilter("brand", brand.toUpperCase())
        .then((res) => {
            if (res) {
                res.forEach((item) => {
                    productBox.innerHTML += `
                     <a href="/public/products/product.html?id=${item.id}">
                        <div class="flex flex-col items-center gap-3">
                            <div class="rounded-xl flex items-center justify-center p-3 bg-[#F6F6F6] ">
                                <img src="${item.imageURL[0]}" alt="${item.slug}" class="w-36 h-36">
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
        })
        .finally(() => {
            loading.classList.remove("flex");
            loading.classList.add("hidden");
        })
}

render();
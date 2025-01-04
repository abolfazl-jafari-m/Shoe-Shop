import {getAllFavorites, getFavoritesByFilter, removeFromFavorite} from "../Requests/wishList/wishList.js";
import {getProductById, getProductsByFilter} from "../Requests/products/products.js";

const productBox = document.getElementById("products-box");
const loading = document.getElementById("loading");
const backBtn = document.getElementById("backDirection");
const filtersBtn = document.getElementById("filtersBtn").children;


backBtn.onclick = ()=>{
    window.history.back();
}
window.deleteFromFavorite = (id)=>{
    loading.classList.remove("hidden");
    loading.classList.add("flex");
    removeFromFavorite(id)
        .then((res)=>{
            if (res){
                render();
            }
        }).finally(()=>{
        loading.classList.add("hidden");
        loading.classList.remove("flex");
    })
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

function fillerByBrand(brand) {
    brand = (brand !== "All") ? brand : "";
    loading.classList.remove("hidden")
    loading.classList.add("flex");
    productBox.innerHTML = "";
    getFavoritesByFilter("brand", brand.toUpperCase())
        .then((res) => {
            if (res.length !==0) {
                res.forEach(item => {
                    getProductById(item.productId)
                        .then(product=>{
                            productBox.innerHTML += `
                                        <div class="flex flex-col items-center gap-3 relative">
                                        <span class="absolute top-3 right-4 rounded-full bg-black/90 w-7 p-1.5 flex items-center justify-center" onclick="deleteFromFavorite(${item.id})">
                                            <img src="../assets/Images/heart-white.svg" class="w-full" alt="like">
                                        </span>
                                        <div class="rounded-xl flex items-center justify-center p-3 bg-[#F3F3F3] ">
                                            <img src="${product.imageURL[0]}" alt="${product.slug}" class="w-full">
                                        </div>
                                        <div class="flex flex-col gap-1 px-1.5">
                                        <a href="/public/products/product.html?id=${product.id}">
                                        <h4 class="line-clamp-1 text-[#152536] font-bold text-xl tracking-tight">${product.name}.</h4>
                                        </a> 
                                            <div class="flex items-center gap-3">
                                                <div class="flex items-center gap-1">
                                                    <img src="../assets/Images/star-svgrepo-com.svg" alt="rate" class="w-4">
                                                    <span class="text-xs font-light opacity-80">4,3</span>
                                                </div>
                                                |
                                                <div class="text-xs bg-gray-200 rounded-lg py-1  px-2 w-fit ">
                                                    5,455 sold
                                                </div>
                                            </div>
                                            <span class="text-[#152536] font-semibold">$ ${product.price}</span>
                                        </div>
                                   </div>
                    `
                        })
                })
            }else {
                productBox.innerHTML = `
                     <div class="fixed flex w-full left-0 items-center justify-center gap-3 flex-col">
                        <img src="../assets/Images/Doc.png" alt="empty">
                        <h4 class="text-xl font-semibold text-center ">No Favorite ${brand} Yet</h4>
                        <p class="font-light tracking-tight text-sm px-3 py-2 w-2/3 text-center">Lorem ipsum dolor sit amet,
                            consectetur adipisicing elit. A aspernatur autem consequuntur dolores dolorum
                            eius eligendi enim est et minus </p>
                    </div>
                    `
            }
        }).finally(() => {
        loading.classList.add("hidden");
        loading.classList.remove("flex");
    })
}

function render() {
    productBox.innerHTML = "";
    loading.classList.remove("hidden")
    loading.classList.add("flex")
    getAllFavorites()
        .then(res => {
            if (res) {
                if (res.length === 0) {
                    productBox.innerHTML = `
                     <div class="fixed flex w-full left-0 items-center justify-center gap-3 flex-col">
                        <img src="../assets/Images/Doc.png" alt="empty">
                        <h4 class="text-xl font-semibold text-center ">No Favorite Product Yet</h4>
                        <p class="font-light tracking-tight text-sm px-3 py-2 w-2/3 text-center">Lorem ipsum dolor sit amet,
                            consectetur adipisicing elit. A aspernatur autem consequuntur dolores dolorum
                            eius eligendi enim est et minus </p>
                    </div>
                    `
                } else {
                    res.forEach(item => {
                        getProductById(item.productId)
                            .then((product) => {
                                productBox.innerHTML += `
                                        <div class="flex flex-col items-center gap-3 relative">
                                        <span class="absolute top-3 right-4 rounded-full bg-black/90 w-7 p-1.5  flex items-center justify-center" onclick="deleteFromFavorite(${item.id})">
                                            <img src="../assets/Images/heart-white.svg" class="w-full" alt="like">
                                        </span>
                                        <div class="rounded-xl flex items-center justify-center p-3 bg-[#F3F3F3] ">
                                            <img src="${product.imageURL[0]}" alt="${product.slug}" class="w-full">
                                        </div>
                                        <div class="flex flex-col gap-1 px-1.5">
                                           <a href="/public/products/product.html?id=${item.id}">
                                        <h4 class="line-clamp-1 text-[#152536] font-bold text-xl tracking-tight">${product.name}.</h4>
                                        </a> 
                                            <div class="flex items-center gap-3">
                                                <div class="flex items-center gap-1">
                                                    <img src="../assets/Images/star-svgrepo-com.svg" alt="rate" class="w-4">
                                                    <span class="text-xs font-light opacity-80">4,3</span>
                                                </div>
                                                |
                                                <div class="text-xs bg-gray-200 rounded-lg py-1  px-2 w-fit ">
                                                    5,455 sold
                                                </div>
                                            </div>
                                            <span class="text-[#152536] font-semibold">$ ${product.price}</span>
                                        </div>
                                   </div>
                    `
                            })
                    })
                }
            }
        }).finally(() => {
        loading.classList.add("hidden")
        loading.classList.remove("flex")
    })
}

render();
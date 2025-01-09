import {searchProduct} from "./Requests/products/products.js";

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const searchResult = document.getElementById("searchResult");
const recentBox = document.getElementById("recentBox");
const resentItem = document.getElementById("resentItem");
const notFount = document.getElementById("notFount");
const loading = document.getElementById("loading");
const clearAll = document.getElementById("clearAll");


let recents = [];


searchBtn.addEventListener("click" , ()=>{
    recents.push(searchInput.value);
    localStorage.setItem("recentSearch" , JSON.stringify(recents));
    renderRecent();
    recentBox.classList.remove("flex");
    recentBox.classList.add("hidden");
    searchResult.classList.remove("hidden")
    searchResult.classList.add("flex")
    loading.classList.remove("hidden")
    loading.classList.add("flex")
    searchProduct("name" , searchInput.value)
        .then((res)=>{
                if (res.length === 0){
                    searchResult.innerHTML = `
                            <div class="flex w-full items-center justify-between font-semibold text-lg tracking-tight">
                                <span>Result for "${searchInput.value}"</span>
                                <span>0 Found</span>
                            </div>
                            <hr>
                            <div class="flex flex-col gap-2 items-center justify-center px-8 py-3 text-center">
                                <img src="./assets/Images/Doc.png" alt="notFound">
                                <h3 class="text-2xl">Not Found</h3>
                                <p class="opacity-60">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda, reiciendis!</p>
                            </div>
        
                    `
                }
                else {
                    searchResult.innerHTML =`
                               <div class="flex w-full items-center justify-between font-semibold text-lg tracking-tight">
                                <span >Result for "${searchInput.value}"</span>
                                <span>${res.length} Found</span>
                              </div>
                            <div id="result" class="grid grid-cols-2 gap-5 py-2  w-full">
                            </div>  
                    `
                    const result = document.getElementById("result");
                    res.forEach(item=>{
                        result.innerHTML += `
                                    <div class="flex flex-col items-center gap-3 relative">
                                            <span class="absolute top-3 right-4 rounded-full bg-black/90 w-7 p-1.5  flex items-center justify-center">
                                                <img src="./assets/Images/heart-white.svg" class="w-full" alt="like">
                                            </span>
                                    <div class="rounded-xl flex items-center justify-center p-3 bg-[#F3F3F3] ">
                                        <img src="${item.imageURL[0]}" alt="${item.slug}" class="w-full">
                                    </div>
                                    <div class="flex flex-col gap-1 px-1.5 w-full">
                                        <a href="/public/products/product.html?id=${item.id}">
                                            <h4 class="line-clamp-1 text-[#152536] font-bold text-xl tracking-tight">${item.name}</h4>
                                        </a>
                                        <div class="flex items-center gap-3 w-full">
                                            <div class="flex items-center gap-1">
                                                <img src="./assets/Images/star-svgrepo-com.svg" alt="rate" class="w-4">
                                                <span class="text-xs font-light opacity-80">4,3</span>
                                            </div>
                                            |
                                            <div class="text-xs bg-gray-200 rounded-lg py-1  px-2 w-fit ">
                                                5,455 sold
                                            </div>
                                        </div>
                                        <span class="text-[#152536] font-semibold">$ ${item.price}</span>
                                    </div>
                                </div>
                        `
                    })
                }
        }).finally(()=>{
        loading.classList.add("hidden")
        loading.classList.remove("flex")
    })
})

searchInput.addEventListener("input" , ()=>{
    if (searchInput.value === ""){
        recentBox.classList.add("flex");
        recentBox.classList.remove("hidden");
        searchResult.classList.add("hidden")
        searchResult.classList.remove("flex")
    }
})

clearAll.addEventListener("click" , ()=>{
    localStorage.removeItem("recentSearch");
    renderRecent();
})

window.deleteRecent = (index)=>{
    recents.splice(index , 1);
    localStorage.setItem("recentSearch" , JSON.stringify(recents));
    renderRecent();
}

window.fillTheInput =(item) =>{
    searchInput.value = item;
    searchBtn.click();
}
function renderRecent() {
    recents = JSON.parse(localStorage.getItem('recentSearch')) ?? [];
    resentItem.innerHTML = "";
    recents.reverse().forEach((item, index) => {
        resentItem.innerHTML += `
          <div class="flex items-center justify-between text-gray-800/70">
                    <span onclick="fillTheInput('${item}')">${item}</span>
                    <span>
                    <img src="./assets/Images/Close%20Square.svg" alt="deleteBtn" class="w-6" onclick="deleteRecent(${index})">
                </span>
                </div>
        `
    })
}

renderRecent();


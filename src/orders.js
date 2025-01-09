import {getOrderItemByFilter} from "./Requests/orders/orders.js";
import {getProductById} from "./Requests/products/products.js";


const activeBtn = document.getElementById("activeBtn");
const activeTab = document.getElementById("activeTab");
const completeBtn = document.getElementById("completeBtn");
const completeTab = document.getElementById("completeTab");
const activeOrdersBox = document.getElementById("activeOrders");
const completeOrdersBox = document.getElementById("completeOrders");
const loading = document.getElementById("loading");

const color = {
    white: "bg-white border-black",
    black: "bg-black/80 border-black ",
    brown: "bg-amber-800  border-amber-800",
    blue: "bg-blue-800  border-blue-800",
    red: "bg-red-800  border-red-800"
}


activeBtn.addEventListener("click", () => {
    activeBtn.classList.remove("text-gray-400")
    activeBtn.classList.remove("border-gray-400")
    activeBtn.classList.add("border-black");
    completeBtn.classList.add("text-gray-400")
    completeBtn.classList.add("border-gray-400")
    completeBtn.classList.remove("border-black");
    activeTab.classList.remove("hidden");
    activeTab.classList.add("flex");
    completeTab.classList.add("hidden");
    completeTab.classList.remove("flex");

})
completeBtn.addEventListener("click", () => {
    completeBtn.classList.remove("text-gray-400")
    completeBtn.classList.remove("border-gray-400")
    completeBtn.classList.add("border-black");
    activeBtn.classList.add("text-gray-400")
    activeBtn.classList.add("border-gray-400")
    activeBtn.classList.remove("border-black")
    completeTab.classList.remove("hidden");
    completeTab.classList.add("flex");
    activeTab.classList.add("hidden");
    activeTab.classList.remove("flex");
})

window.trackOrders =() =>{
    window.location.href = "/public/checkout.html";
}

function renderActiveOrders() {
    loading.classList.remove("hidden");
    loading.classList.add("flex");
    activeOrdersBox.innerHTML = "";
    getOrderItemByFilter("status", "pending")
        .then((res) => {
            if (res.length !== 0) {
                res.forEach(item => {
                    getProductById(item.productId)
                        .then((product) => {
                            let style= color[item.color];
                            activeOrdersBox.innerHTML += `
                                    <div class="rounded-2xl shadow-gray-300/70 shadow-lg px-4 py-2 w-full flex gap-2 items-center bg-white">
                                        <div class="h-full rounded-2xl bg-[#f3f3f3] p-1 flex items-center justify-center">
                                          <img src="${product.imageURL[0]}" alt="${product.slug}" class="w-32">
                                        </div>
                                        <div class="flex flex-col gap-2 flex-1 h-full">
                                          <h3 class="font-semibold line-clamp-1">${product.name}</h3>
                                          <div class="flex items-center gap-2 text-xs tracking-tight ">
                                            <div class="flex items-center gap-2"> <span class="${style} border-2 rounded-full w-4 h-4"></span>${item.color}</div> |
                                            <div > size <span class="ml-1"> ${item.size}</span> </div> |
                                            <div>  Qty<span class="ml-1"> ${item.quantity}</span> </div>
                                          </div>
                                          <div class="text-xs tracking-tight font-extralight bg-gray-300 rounded-lg text-center w-fit p-2 my-1 capitalize">${item.status} for payment</div>
                                          <div class="flex justify-between items-center w-full">
                                            <span>$ ${item.quantity * product.price}</span>
                                            <button class="rounded-2xl py-1 px-3 text-center bg-black text-white text-sm" onclick="trackOrders()">Track Order</button>
                                          </div>
                                        </div>
                                     </div>
                           `
                        })

                })
            } else {
                activeOrdersBox.innerHTML = `
                      <img src="./assets/Images/Doc.png" alt="empty"  class="w-full">
                      <h3 class="text-xl font-semibold text-center ">You Have not an Active Order Yet</h3>
                      <p class="opacity-70 font-semibold text-center w-full ">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                `
            }
        }).finally(()=>{
        loading.classList.remove("flex");
        loading.classList.add("hidden");
    })
}

function renderCompleteOrders() {
    completeOrdersBox.innerHTML = "";
    getOrderItemByFilter("status", "complete")
        .then((res) => {
            if (res.length !== 0) {
                res.forEach(item => {
                    getProductById(item.productId)
                        .then((product) => {
                            let style= color[item.color];
                            completeOrdersBox.innerHTML += `
                                    <div class="rounded-2xl shadow-gray-300/70 shadow-lg px-4 py-2 w-full flex gap-2 items-center bg-white">
                                        <div class="h-full rounded-2xl bg-[#f3f3f3] p-1 flex items-center justify-center">
                                          <img src="${product.imageURL[0]}" alt="${product.slug}" class="w-32">
                                        </div>
                                        <div class="flex flex-col gap-2 flex-1 h-full">
                                          <h3 class="font-semibold line-clamp-1">${product.name}</h3>
                                          <div class="flex items-center gap-2 text-xs tracking-tight ">
                                            <div class="flex items-center gap-2"> <span class="${style} border-2 rounded-full w-4 h-4"></span>${item.color}</div> |
                                            <div > size <span class="ml-1"> ${item.size}</span> </div> |
                                            <div>  Qty<span class="ml-1"> ${item.quantity}</span> </div>
                                          </div>
                                          <div class="text-xs tracking-tight font-extralight bg-gray-300 rounded-lg text-center w-fit p-2 my-1 capitalize" >${item.status} </div>
                                          <div class="flex justify-between items-center w-full">
                                            <span>$ ${item.quantity * product.price}</span>
                                            <a href="/public/products/product.html?id=${product.id}">
                                            <button class="rounded-2xl py-1 px-3 text-center bg-black text-white text-sm">Buy Again</button>
                                            </a>
                                          </div>
                                        </div>
                                     </div>
                           `
                        })
                })
            } else {
                completeOrdersBox.innerHTML = `
                      <img src="./assets/Images/Doc.png" alt="empty"  class="w-full">
                      <h3 class="text-xl font-semibold text-center ">You Have not  Complete Order Yet</h3>
                      <p class="opacity-70 font-semibold text-center w-full ">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                `
            }
        })
}

renderCompleteOrders();
renderActiveOrders();
import {getOrderItemByFilter} from "./Requests/orders/orders.js";
import {getProductById} from "./Requests/products/products.js";
import {message} from "./utils/helper.js";

const addressModal = document.getElementById("addressModal");
const shippingModal = document.getElementById("shippingType");
const showAddressModalBtn = document.getElementById("editAddressBtn");
const showShippingModalBtn = document.getElementById("chooseShippingBtn");
const closeAddressModalBtn = document.getElementById("closeAddressBtn");
const closeShippingModalBtn = document.getElementById("closeShippingBtn");
const applyAddressBtn = document.getElementById("applyAddressBtn");
const applyShippingBtn = document.getElementById("applyShippingBtn");
const ordersList = document.getElementById("orderList");
const loading = document.getElementById("loading");
const amount = document.getElementById("totalPrice");
const addressDetail = document.getElementById("address-detail");
const shippingDetail = document.getElementById("shipping-detail");
const discountBtn = document.getElementById("discountBtn");
const discountInput = document.getElementById("discount-input");
const discountBox = document.getElementById("discountBox");
const discountPrice = document.getElementById("discountPrice");
const shippingPrice = document.getElementById("shippingPrice");
const finalAmount =document.getElementById("finalAmount");
const backBtn = document.getElementById("backBtn");
const goToPaymentBtn = document.getElementById("goToPayment");

const color = {
    white: "bg-white border-black",
    black: "bg-black/80 border-black ",
    brown: "bg-amber-800  border-amber-800",
    blue: "bg-blue-800  border-blue-800",
    red: "bg-red-800  border-red-800"
}

let addressArray = {
    "home": ["Home", "Lorem ipsum dolor sit."],
    "office": ["Office", "Lorem ipsum dolor sit."],
    "apartment": ["Apartment", "Lorem ipsum dolor sit."],
    "parent": ["Parent House", "Lorem ipsum dolor sit."]
}

let shippingTypes = {
    "economy": ["Economy", "10", "./assets/Images/delivery-package-svgrepo-com.svg", "Lorem ipsum dolor sit."],
    "regular": ["Regular", "15", "./assets/Images/delivered-box-verification-symbol-svgrepo-com.svg", "Lorem ipsum dolor sit."],
    "cargo": ["Cargo", "20", "./assets/Images/truck-svgrepo-com(1).svg", "Lorem ipsum dolor sit."],
    "express": ["Express", "30", "./assets/Images/logistics-delivery-truck-in-movement-svgrepo-com.svg", "Lorem ipsum dolor sit."]
}

let totalPrice = null;
let promoPrice = 0;
let shippingAmount = 0;
const discount_Code = "SDK23";

backBtn.addEventListener("click", ()=>{
    window.history.back();
})

showAddressModalBtn.addEventListener("click", () => {
    addressModal.classList.remove("hidden");
    addressModal.classList.add("flex");
})
showShippingModalBtn.addEventListener("click", () => {
    shippingModal.classList.remove("hidden");
    shippingModal.classList.add("flex");
})

window.openShippingModal = () => {
    shippingModal.classList.remove("hidden");
    shippingModal.classList.add("flex");
}

closeAddressModalBtn.addEventListener("click", () => {
    addressModal.classList.remove("flex");
    addressModal.classList.add("hidden");
})
closeShippingModalBtn.addEventListener("click", () => {
    shippingModal.classList.remove("flex");
    shippingModal.classList.add("hidden");
})

applyAddressBtn.addEventListener("click", () => {
    let selectedAddress = document.querySelector("input[name=address]:checked").value;
    let [title, detail] = addressArray[selectedAddress];
    addressDetail.innerHTML = `
     <h4 class="font-semibold text-sm tracking-tight">${title}</h4>
    <p class="opacity-70">${detail}</p>
    `
    addressModal.classList.remove("flex");
    addressModal.classList.add("hidden");
})

applyShippingBtn.addEventListener("click", () => {
    let selectedShipping = document.querySelector("input[name=shipping]:checked").value;
    let [title, price, picture, detail] = shippingTypes[selectedShipping];
    shippingDetail.innerHTML = `
    <div class="flex items-center gap-3 ">
                    <div class="flex items-center justify-center rounded-full overflow-hidden">
                            <img src="${picture}" class="w-10">
                    </div>
                    <div class="flex flex-col gap-1 justify-center">
                            <h4 class="font-semibold text-sm tracking-tight">${title}</h4>
                        <p class="opacity-70">${detail}</p>
                    </div>
                </div>
                <div class="flex items-center gap-3">
                    <span class="font-semibold tracking-tight">
                       $ ${price}
                    </span>
                    <div onclick="openShippingModal()">
                <img src="./assets/Images/pen-2-svgrepo-com.svg" alt="edit" class="w-6">
                  </div>
           </div>
    `
    shippingPrice.innerHTML = "$ " + price;
    shippingAmount = price;
    calculateFinalPrice();
    shippingModal.classList.remove("flex");
    shippingModal.classList.add("hidden");
})

discountBtn.addEventListener("click", () => {
    calculateDiscount(discount_Code, discountInput.value);
    calculateFinalPrice();
})

goToPaymentBtn.addEventListener("click", ()=>{
    window.location.href = "/public/payment.html";
})

window.deleteDiscount = () => {
    promoPrice = 0;
    calculateFinalPrice();
    discountBox.className = "flex-1 rounded-2xl bg-gray-200/70 p-2";
    discountBox.innerHTML = `
           <input type="text" class="bg-transparent outline-0 border-0 p-2 flex-1" placeholder="Enter Promo Code" id="discount-input">
        `
    discountPrice.innerHTML = "";
}

function calculateFinalPrice() {
    let finalPrice = Number(totalPrice) + Number(shippingAmount) - promoPrice
    finalAmount.innerHTML  = "$ " + finalPrice.toFixed(2);
}


function calculateDiscount(discount, code) {
    if (discount === code) {
        promoPrice = totalPrice * 0.3
        discountBox.className = "bg-black rounded-3xl px-4 py-2 flex items-center justify-center gap-2 text-white";
        discountBox.innerHTML = `
           <span class="tracking-tight text-lg ">Discount 30% Off</span>
           <span class="font-bold text-lg"><img src="./assets/Images/close-sm-svgrepo-com.svg" class="w-6" onclick="deleteDiscount()"></span>
        `
        discountPrice.innerHTML = `
                <span>Promo</span>
                <span class="text-black">-$ ${promoPrice}</span>
        `
    } else {
        message("discount code isn't correct", "#B92312")
    }
}

function renderOrders() {
    ordersList.innerHTML = "";
    loading.classList.remove("hidden");
    loading.classList.add("flex");
    getOrderItemByFilter("status", "pending")
        .then((res) => {
            res.forEach(item => {
                let style= color[item.color];
                getProductById(item.productId)
                    .then((product) => {
                        totalPrice += (+item.quantity * product.price);
                        calculateFinalPrice()
                        amount.innerText = "$ " + totalPrice.toFixed(2);
                        ordersList.innerHTML += `
            <div class="rounded-3xl shadow-lg shadow-gray-400/70 w-full  flex gap-2 bg-white items-center py-1 px-2">
                <div class="rounded-3xl bg-[#f3f3f3]  flex items-center justify-center p-1">
                    <img src="${product.imageURL[0]}" alt="${product.slug}" class="w-28">
                </div>
                <div class="flex flex-col gap-5 flex-1 h-full px-3 py-2">
                    <h3 class="font-semibold text-xl line-clamp-1">${product.name}</h3>
                    <div class="flex items-center gap-2 text-xs tracking-tight ">
                        <div class="flex items-center gap-2"><span class="${style} rounded-full w-4 h-4"></span>
                            ${item.color}
                        </div>
                        |
                        <div> size <span class="ml-1"> ${item.size}</span></div>
                    </div>
                    <div class="flex justify-between items-center w-full ">
                        <span>$ ${item.quantity * product.price}</span>
                        <div class="bg-gray-200/80 rounded-3xl py-1 px-5 flex items-center gap-2 font-light">
                            <span>${item.quantity}</span>
                        </div>
                    </div>
                </div>
            </div>
                        `
                    })
            })
        }).finally(() => {
        loading.classList.remove("flex");
        loading.classList.add("hidden");
    })
}

renderOrders();



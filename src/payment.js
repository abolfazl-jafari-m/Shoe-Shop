import {getOrderItemByFilter, updateOrders} from "./Requests/orders/orders.js";

const backBtn = document.getElementById("backBtn");
const confirmBtn = document.getElementById("confirmBtn");
const viewOrderBtn = document.getElementById("viewOrderBtn");
const confirmModal = document.getElementById("confirmModal");
const loading = document.getElementById("loading");


backBtn.addEventListener("click", () => {
    window.history.back();
})

viewOrderBtn.addEventListener("click", () => {
    window.location.replace("/public/orders.html");
})

confirmBtn.addEventListener("click", () => {
    loading.classList.replace("hidden", "flex");
    getOrderItemByFilter("status", "pending")
        .then((res) => {
            res.forEach(item => {
                updateOrders(item.id, {status: "complete"})
                    .then((order) => {
                        if (order) {
                            confirmModal.classList.replace("hidden", "flex")
                        }
                    }).finally(() => {
                    loading.classList.replace("flex", "hidden");
                })
            })
        })


})
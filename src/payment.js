import {getOrderItemByFilter, updateOrders} from "./Requests/orders/orders.js";
import {message} from "./utils/helper.js";
import {getProductById, updateProduct} from "./Requests/products/products.js";

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
    if (document.querySelector("input[name=payment]:checked")){
        confirmHandler();
    }else {
        message("Please Pick A Payment Method" ,"#9F1239")
    }

})

async function confirmHandler(){
    try{
        loading.classList.replace("hidden", "flex");
        const ordersItem = await getOrderItemByFilter("status", "pending");
        if (ordersItem){
            for (const item of ordersItem) {
                await updateOrders(item.id, {status: "complete"});
                const product = await getProductById(item.productId)
                await updateProduct(product.id , {items_left : Number(product.items_left) - Number(item.quantity)});
            }
        }
    }catch (e) {
        message(e.message , "#B91C1C")
    }finally {
        loading.classList.replace("flex", "hidden");
        confirmModal.classList.replace("hidden", "flex")
    }

}
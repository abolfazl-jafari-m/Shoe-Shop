import {
    deleteAllCartItem,
    deleteFromCart,
    getAllCartItems,
    getCartItemById,
    updateCartItem
} from "./Requests/cart/cart.js";
import {getProductById} from "./Requests/products/products.js";
import {message} from "./utils/helper.js";
import {addToOrders} from "./Requests/orders/orders.js";

const cartItemsBox = document.getElementById("cartItems");
const loading = document.getElementById("loading");
const overlay = document.getElementById("overlay");
const deleteModal = document.getElementById("deleteModal");
const deleteModalContent = document.getElementById('deleteModalContent');
const closeDeleteModal = document.getElementById('closeDeleteModalBtn');
const totalAllPrice = document.getElementById("totalAllPrice");
const removeFromCart = document.getElementById("removeFromCart");
const checkoutBtn = document.getElementById("checkoutBtn");

let totals = null;
let tempCartItemId = null;
let tempCartItemQuantity = null;

const color = {
    white: "bg-white border-black",
    black: "bg-black/80 border-black ",
    brown: "bg-amber-800  border-amber-800",
    blue: "bg-blue-800  border-blue-800",
    red: "bg-red-800  border-red-800"
}

window.addQuantity = async (id) => {
    loading.classList.remove("hidden");
    loading.classList.add("flex");
    const cartItem = await getCartItemById(id);
    const product = await getProductById(cartItem.productId);
    let itemQuantity = +cartItem.quantity;
    if (product.items_left > itemQuantity) {
        itemQuantity++;
        updateCartItem(id, {quantity: itemQuantity})
            .then(res => {
                if (res) {
                    render();
                    message("Product Quantity increase", "blue")
                }
            })
    }
}
window.minusQuantity = async (id) => {
    loading.classList.remove("hidden");
    loading.classList.add("flex");
    const cartItem = await getCartItemById(id);
    let itemQuantity = +cartItem.quantity;
    if (itemQuantity > 0) {
        itemQuantity--;
        updateCartItem(id, {quantity: itemQuantity})
            .then(res => {
                if (res) {
                    render();
                    message("Product Quantity decrease", "blue")
                }
            })
    }
}


window.countIncrease = () => {
    const quantity = document.getElementById("deleteCount")
    let deleteCount = +quantity.innerText;
    if (deleteCount < tempCartItemQuantity) {
        deleteCount++;
        quantity.innerText = deleteCount
    }
}

window.countDecrease = () => {
    const quantity = document.getElementById("deleteCount")
    let deleteCount = +quantity.innerText;
    if (deleteCount > 1) {
        deleteCount--;
        quantity.innerText = deleteCount;
    }
}

window.showDeleteModal = (id) => {
    tempCartItemId = id;
    loading.classList.remove("hidden");
    loading.classList.add("flex");
    overlay.classList.remove("hidden");
    deleteModal.classList.remove("hidden");
    deleteModal.classList.add("flex");
    getCartItemById(id)
        .then((res) => {
            if (res) {
                tempCartItemQuantity = res.quantity;
                getProductById(res.productId)
                    .then((product) => {
                        if (product) {
                            let style= color[res.color];
                            deleteModalContent.innerHTML = `
                    <div class="flex items-center w-full gap-2 px-4 py-2 bg-white rounded-2xl">
                        <div class="rounded-3xl bg-[#f3f3f3] overflow-hidden flex items-center justify-center p-1">
                            <img src="${product.imageURL[0]}" alt="${product.slug}" class="w-28">
                        </div>
                        <div class="flex flex-col flex-1 h-full gap-6 px-3 py-2">
                            <h3 class="text-xl font-semibold line-clamp-1">${product.name}</h3>
                            <div class="flex items-center gap-2 text-xs tracking-tight ">
                                <div class="flex items-center gap-2"><span class="w-4 h-4 ${style} rounded-full"></span>
                                    ${res.color}
                                </div>
                                |
                                <div> size <span class="ml-1">${res.size}</span></div>
                            </div>
                            <div class="flex items-center justify-between w-full ">
                                <span>$ ${(product.price * res.quantity).toFixed(2)}</span>
                                <div class="flex items-center gap-2 px-5 py-1 font-light bg-gray-200/80 rounded-3xl">
                                    <button class="text-xl" onclick="countDecrease()">-</button>
                                    <span id="deleteCount">${res.quantity}</span>
                                    <button class="text-xl" onclick="countIncrease()">+</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    `
                        }
                    })
            }
        })
        .finally(() => {
            loading.classList.add("hidden");
            loading.classList.remove("flex");
        })
}

closeDeleteModal.addEventListener("click", () => {
    overlay.classList.add("hidden");
    deleteModal.classList.add("hidden");
    deleteModal.classList.remove("flex");
})

removeFromCart.addEventListener("click", () => {
    const deleteCount = document.getElementById("deleteCount")?.innerText;
    console.log(deleteCount, tempCartItemQuantity);
    if (+deleteCount === +tempCartItemQuantity) {
        deleteFromCart(tempCartItemId)
            .then((res) => {
                if (res) {
                    message("Item Deleted Successfully", "green");
                    overlay.classList.add("hidden");
                    deleteModal.classList.add("hidden");
                    render();
                }
            })
    } else {
        let quantity = tempCartItemQuantity - deleteCount;
        updateCartItem(tempCartItemId, {quantity: quantity})
            .then((res) => {
                if (res) {
                    message("Item Deleted Successfully", "green");
                    overlay.classList.add("hidden");
                    deleteModal.classList.add("hidden");
                    render();
                }
            })
    }

})


checkoutBtn.addEventListener("click", async () => {
    loading.classList.add("flex");
    loading.classList.remove("hidden");
    const orders = await getAllCartItems();
    if (orders.length !== 0) {
        const emptyCart = await deleteAllCartItem();
        for (const item of orders) {
            item.status = "pending"
            await addToOrders(item);
        }
        loading.classList.remove("flex");
        loading.classList.add("hidden");
    }
    window.location.href = "/public/checkout.html";

})


function render() {
    totals = 0;
    loading.classList.remove("hidden");
    loading.classList.add("flex");
    cartItemsBox.innerHTML = "";
    getAllCartItems()
        .then(res => {
            if (res) {
                if (res.length === 0) {
                    totalAllPrice.innerText = "$ " + totals.toFixed(2);
                    cartItemsBox.innerHTML = `
                      <div class="items-center justify-center  w-full">
                        <div class="flex flex-col items-center px-6 py-3">
                            <img src="./assets/Images/Doc.png" alt="empty" class="w-full">
                            <h3 class="text-xl font-semibold text-center ">You Have not an Order Yet</h3>
                            <p class="w-full font-semibold text-center opacity-70 ">Lorem ipsum dolor sit amet, consectetur
                                adipisicing elit.</p>
                        </div>
                     </div>
                    `
                } else {
                    res.forEach(item => {
                        getProductById(item.productId)
                            .then(product => {
                                if (product) {
                                    let style= color[item.color];
                                    totals += +(product.price * item.quantity);
                                    cartItemsBox.innerHTML += `
                                     <div class="w-full my-2  shadow-gray-500/70 shadow-md rounded-2xl ">
                                        <div class="flex flex-col w-full gap-4 ">
                                            <div class="relative flex items-center gap-2 px-4 py-2 bg-white rounded-2xl">
                                                <div class="rounded-3xl bg-[#f3f3f3] overflow-hidden flex items-center justify-center p-1">
                                                    <img src="${product.imageURL[0]}" alt="${product.slug}" class="w-28">
                                                </div>
                                                <div class="flex flex-col flex-1 h-full gap-6 px-1 py-2">
                                                    <h3 class="text-xl px-2 pl-0.5 tracking-tight font-semibold line-clamp-1">${product.name}</h3>
                                                    <div class="flex items-center gap-2 text-xs tracking-tight ">
                                                        <div class="flex items-center gap-2"><span class="w-4 h-4 ${style} rounded-full"></span>
                                                            ${item.color}
                                                        </div>
                                                        |
                                                        <div> size <span class="ml-1"> ${item.size}</span></div>
                                                    </div>
                                                    <div class="flex items-center justify-between w-full ">
                                                        <span id="totalPrice" class="font-semibold totals">$ ${(item.quantity * product.price).toFixed(2)}</span>
                                                        <div class="flex items-center gap-2 px-5 py-1 font-light bg-gray-200/80 rounded-3xl">
                                                            <button class="text-xl minusBtn" onclick="minusQuantity('${item.id}')" >-</button>
                                                            <span id="itemQuantity">${item.quantity}</span>
                                                            <button class="text-xl addBtn" onclick="addQuantity('${item.id}')">+</button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <span class="absolute w-4 top-5 right-4 deleteBtn" onclick="showDeleteModal('${item.id}')"><img src="./assets/Images/delete-o-svgrepo-com.svg"
                                                                                              alt="delete" class="w-full"></span>
                                            </div>
                                        </div>
                                    </div>
                    `
                                }
                            }).finally(() => {
                            totalAllPrice.innerText = "$ " + totals.toFixed(2);
                            loading.classList.add("hidden");
                            loading.classList.remove("flex");
                        })
                    })
                }
            }
        })
        .finally(() => {
            loading.classList.add("hidden");
            loading.classList.remove("flex");
        })
}

render();


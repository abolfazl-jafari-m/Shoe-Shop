import {getProductById} from "../Requests/products/products.js";
import {addToCart} from "../Requests/cart/cart.js";
import {message} from "../utils/helper.js";
import {addToFavorite, removeFromFavorite} from "../Requests/wishList/wishList.js";

const loading = document.getElementById("loading");
const name = document.getElementById("name");
const images = document.getElementById("images");
const description = document.getElementById("description");
const size = document.getElementById("sizes");
const colors = document.getElementById('colors');
const wishListBtn = document.getElementById("wishListBtn");
const sizeBtns = document.getElementsByName("size");
const colorBtns = document.getElementsByName("color");
const addQuantityBtn = document.getElementById("addQuantity");
const minusQuantityBtn = document.getElementById("minusQuantity");
const addToCartBtn = document.getElementById("addToCart");
const quantity = document.getElementById("quantity");
const totalPrice = document.getElementById("totalPrice");
const backBtn = document.getElementById("backBtn");
const trackSlides = document.getElementById("trackSlides");
const viewMore = document.getElementById("viewMore");
const detail = document.getElementById("details");


const query = new URLSearchParams(window.location.search);
const productId = query.get("id");

const color = {
    white: ["bg-white border-black checked:bg-gray-100 ", " text-black"],
    black: ["bg-black/80 border-black   checked:bg-black"],
    brown: ["bg-amber-800  border-amber-800  checked:bg-amber-950"],
    blue: ["bg-blue-800  border-blue-800  checked:bg-blue-950"],
    red: ["bg-red-800  border-red-800 checked:bg-red-950"]
}

let liked = false;
let product = null;
let slides = null;
let trackers = null;


backBtn.onclick = () => {
    window.history.back();
}

addQuantityBtn.onclick = () => {
    if (quantity.innerText < product.items_left) {
        quantity.innerText++;
        calculateTotal();
    }
}
minusQuantityBtn.onclick = () => {
    if (quantity.innerText > 1) {
        quantity.innerText--;
        calculateTotal();
    }
}

function calculateTotal() {
    totalPrice.innerText = "$ " + (quantity.innerText * product.price).toFixed(2);
}

addToCartBtn.addEventListener("click", (e) => {
    let item = {
        productId: product.id,
        quantity: quantity.innerText,
        color: document.querySelector("input[name=color]:checked")?.value,
        size: document.querySelector("input[name=size]:checked")?.value,
    }
    if (!Object.values(item).includes(undefined, null)) {
        loading.classList.remove("hidden");
        loading.classList.add("flex");
        addToCart(item)
            .then((res) => {
                if (res) {
                    message("Product added to Your Cart", "green");
                }
            }).finally(() => {
            loading.classList.remove("flex");
            loading.classList.add("hidden");
        })
    } else {
        message("Please Choose Color and Size", "blue")
    }
})


wishListBtn.addEventListener("click", () => {
    if (liked) {
        removeFromFavorite(liked)
            .then((res) => {
                if (res) {
                    wishListBtn.src = "../assets/Images/heart.svg";
                    liked = null
                    message("item remove to your wishlist", "#14532D")
                }
            })
    } else {
        addToFavorite({
            productId: product.id,
            brand: product.brand
        })
            .then((res) => {
                if (res) {
                    wishListBtn.src = "../assets/Images/heart-svgrepo-com.svg";
                    liked = res.id;
                    message("item added to your wishlist", "#14532D")
                }
            })
    }

})

window.goToSlide = (index) => {
    for (const slide of slides) {
        slide.classList.add("hidden");
    }
    for (const item of trackers) {
        item.classList.remove("bg-black");
        item.classList.add("bg-gray-400");
    }
    slides[index].classList.remove("hidden");
    trackers[index].classList.replace("bg-gray-400", "bg-black");
}
viewMore.addEventListener("click", ()=>{
        if (viewMore.innerText === "View More"){
            description.classList.remove("line-clamp-2")
            viewMore.innerText = "view Less";
        }else {
            description.classList.add("line-clamp-2")
            viewMore.innerText = "view More";
        }
})

function renderProduct() {
    loading.classList.remove("hidden");
    loading.classList.add("flex");
    getProductById(productId).then((res) => {
        if (res) {
            product = res;
            document.title = res.name;
            name.innerHTML = res.name;
            totalPrice.innerText = "$ " + res.price.toFixed(2);
            images.innerHTML = "";
            trackSlides.innerHTML = "";
            res.imageURL.forEach((item, index) => {
                images.innerHTML += `
                <img src="${item}" alt="${res.slug}" class="images hidden motion-preset-slide-left ">
                `
                trackSlides.innerHTML += `
                <span class="w-8 h-1 rounded-2xl bg-gray-400 tracker" onclick="goToSlide(${index})"></span>
                `
            })
            slides = document.getElementsByClassName("images");
            trackers = document.getElementsByClassName("tracker");
            slides[0].classList.remove("hidden");
            trackers[0].classList.replace("bg-gray-400", "bg-black");
            description.innerHTML = res.description ;
            res.sizes.forEach(item => {
                size.innerHTML += `
                        <div  class="p-2 relative w-8 h-8  flex justify-center items-center overflow-hidden">
                            <input type="radio" name="size" value="${item}" class="appearance-none peer w-full h-full absolute top-0 left-0 checked:bg-black border-2 checked:border-black rounded-full text-gray-500 border-gray-600">
                            <span class="text-gray-500 peer-checked:text-white peer-checked:z-10">${item}</span>
                      </div>
                    `
            })
            res.colors.forEach(item => {
                let [classes, textColor = "text-white"] = color[item]
                colors.innerHTML += `
                       <div  class="p-2 relative w-8 h-8  flex justify-center items-center overflow-hidden shrink-0">
                            <input type="radio" name="color"  value="${item}" class="appearance-none peer w-full h-full absolute top-0 left-0 ${classes} border-2 rounded-full  transition-all duration-300 ">
                            <span class=" peer-checked:${textColor} peer-checked:z-10 peer-checked:block hidden">&check;</span>
                      </div>
                    `
            })
            if (!res.is_in_inventory){
                detail.classList.add("invisible");
            }
        }
    }).finally(() => {
        loading.classList.add("hidden");
        loading.classList.remove("flex");
    })
}

renderProduct();
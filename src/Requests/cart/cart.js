import {API_URL, headers} from "../../../configs.js";
import {message} from "../../utils/helper.js";

export async function addToCart(item) {
    try {
        const response = await fetch(`${API_URL}/api/records/cart`, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(item)
        })
        if (!response.ok) {
            throw new Error("Adding to Cart is Failed Try Again");
        }
        const result = await response.json();
        return result;
    }catch (e){
        message(e.message , "#B91C1C");
    }
}

export async function deleteFromCart(id){
    try {
        const response = await fetch(`${API_URL}/api/records/cart/${id}`, {
            method: "DELETE",
            headers: headers
        })
        if (!response.ok) {
            throw new Error("Remove From Cart is Failed Try Again");
        }
        const result = await response.json();
        return result;
    }catch (e){
        message(e.message , "#B91C1C");
    }
}

export async function getAllCartItems(){
    try {
        const response = await fetch(`${API_URL}/api/records/cart`, {
            method: "GET",
            headers: headers
        })
        if (!response.ok) {
            if (response.status === 403){
                localStorage.removeItem("token");
                window.location.replace("/public/login.html");
                throw new Error("invalid Access Token");
            }
            throw new Error("Something Goes Wrong Please Try Again");
        }
        const result = await response.json();
        return result.records;
    }catch (e){
        message(e.message , "#B91C1C");
    }
}

export async function getCartItemById(id){
    try{
        const response = await fetch(`${API_URL}/api/records/cart/${id}` , {
            method : "GET",
            headers : headers
        })
        if (!response.ok){
            throw new Error("Something Goes wrong . Please Try Again")
        }
        const  result = await response.json();
        return result;
    }catch (e) {
        message(e.message , "#B91C1C");
    }
}
export  async function updateCartItem(id , items){
    try{
        const response = await fetch(`${API_URL}/api/records/cart/${id}` , {
            method : "PUT",
            headers : headers,
            body : JSON.stringify(items)
        })
        if (!response.ok){
            throw new Error("updating Cart wasn't Successful")
        }
        const result = await response.json();
        return result;
    }catch (e){
        message(e.message , "#B91C1C");
    }
}
export async function deleteAllCartItem(){
    try{
        const response = await fetch(`${API_URL}/api/records/cart/delete-all` ,{
            method :"DELETE",
            headers : headers
        })
        if (!response.ok){
            throw new Error("something goes wrong")
        }
        const result = await response.json();
        return result;
    }catch (e){
        message(e.message , "#B91C1C");
    }
}
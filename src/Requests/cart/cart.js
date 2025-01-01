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

export async function removeFromCart(id){
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

export async function getAllProducts(){
    try {
        const response = await fetch(`${API_URL}/api/records/cart`, {
            method: "GET",
            headers: headers
        })
        if (!response.ok) {
            throw new Error("Something Goes Wrong Please Try Again");
        }
        const result = await response.json();
        return result.records;
    }catch (e){
        message(e.message , "#B91C1C");
    }
}
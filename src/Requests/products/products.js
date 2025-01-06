import {API_URL, headers} from "../../../configs.js";
import {message} from "../../utils/helper.js";

export async function getProducts() {
    try {
        const response = await fetch(`${API_URL}/api/records/products`, {
            method: "GET",
            headers: headers
        })
        if (!response.ok) {
            if (response.status === 403){
                localStorage.removeItem("token");
                window.location.replace("/public/login.html")
            }
            throw new Error("Sorry At the moment Some things Wrong")
        }
        const result = await response.json();
        return result.records;
    } catch (e) {
        message(e.message , "#B91C1C")
    }
}

export async function getProductsByFilter(key, value) {
    try{
        const response = await fetch(`${API_URL}/api/records/products?filterKey=${key}&filterValue=${value}`, {
            method: "GET",
            headers: headers
        })
        if (!response.ok){
            throw new Error("some things wrong at the moment")
        }
        const result = await response.json();
        return result.records
    }catch (e){
        message(e.message , "#B91C1C")
    }
}

export async function getProductById(id){
    try{
        const response = await fetch(`${API_URL}/api/records/products/${id}` , {
            method : "GET",
            headers : headers
        })
        if (!response.ok){
            throw new Error("Please Try Later")
        }
        const result = await response.json();
        return result;
    }catch (e) {
        message(e.message , "#B91C1C");
    }
}


export async function searchProduct(key , value){
    try{
        const response = await fetch(`${API_URL}/api/records/products?searchKey=${key}&searchValue=${value}`, {
            method : "GET",
            headers : headers
        })
        if (!response.ok){
            throw new Error("something goes wrong")
        }
        const  result = await response.json();
        return result.records;
    }catch (e) {
        message(e.message , "#B91C1C")
    }
}

export async function updateProduct(id , item){
    try{
         const response = await fetch(`${API_URL}/api/records/products/${id}`, {
             method : "PUT",
             headers : headers,
             body : JSON.stringify(item)
         })
        if (!response.ok){
            throw  new Error("Product Update Failed")
        }
        const result = await response.json();
        return result;
    }catch (e) {
        message(e.message , "#B91C1C")
    }
}

export async function getPopularProducts() {
    try {
        const response = await fetch(`${API_URL}/api/records/products`, {
            method: "GET",
            headers: headers
        })
        if (!response.ok) {
            if (response.status === 403){
                localStorage.removeItem("token");
                window.location.replace("/public/login.html")
            }
            throw new Error("Sorry At the moment Some things Wrong")
        }
        const result = await response.json();
        return result.records;
    } catch (e) {
        message(e.message , "#B91C1C")
    }
}

export async function getPopularProductsByFilter(key, value) {
    try{
        const response = await fetch(`${API_URL}/api/records/products?filterKey=${key}&filterValue=${value}`, {
            method: "GET",
            headers: headers
        })
        if (!response.ok){
            throw new Error("some things wrong at the moment")
        }
        const result = await response.json();
        return result.records
    }catch (e){
        message(e.message , "#B91C1C")
    }
}


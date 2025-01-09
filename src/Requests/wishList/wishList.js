import {API_URL, headers} from "../../../configs.js";
import {message} from "../../utils/helper.js";

export async function addToFavorite (item){
    try{
        const response = await fetch(`${API_URL}/api/records/wishList` ,{
            method : "POST",
            headers : headers,
            body : JSON.stringify(item)
        })
        if (!response.ok){
            throw new Error("Something Goes Wrong.Please Try Again")
        }
        const result = await response.json();
        return result;
    }catch (e){
        message(e.message , "#B91C1C");
    }
}

export async function removeFromFavorite(id){
    try{
        const response = await fetch(`${API_URL}/api/records/wishList/${id}` , {
            method : "DELETE",
            headers : headers
        })
        if (!response.ok){
            throw new Error("Something Goes Wrong.Please Try Again")
        }
        const result = await response.json();
        return result;
    }catch (e){
        message(e.message , "#B91C1C");
    }
}

export async function getAllFavorites(){
    try{
        const response = await fetch(`${API_URL}/api/records/wishList` , {
            method : "GET",
            headers : headers
        })
        if (!response.ok){
            if (response.status === 403){
                localStorage.removeItem("token");
                window.location.replace("/public/login.html");
                throw new Error("Invalid Access Token");
            }
            throw new Error("Something Goes Wrong.Please Try Again")
        }
        const result = await response.json();
        return result.records;
    }catch (e){
        message(e.message , "#B91C1C");
    }
}
export async function getFavoriteByProductId(id){

}

export async function getFavoritesByFilter(key , value){
    try{
        const response = await fetch(`${API_URL}/api/records/wishList?filterKey=${key}&filterValue=${value}`, {
            method : "GET",
            headers : headers
        })
        if (!response.ok){
            throw new Error("somethings wrong at the moment")
        }
        const result = await response.json();
        return result.records;
    }catch (e) {
        message(e.message , "#B91C1C");
    }
}

export async function getProductByProductId(id){
    try{
        const  response =  await fetch(`${API_URL}/api/records/wishList?filterKey=productId&filterValue=${id}`, {
            method : "GET",
            headers : headers
        })
        if (!response.ok){
            throw  new Error("Couldn't Receive Data")
        }
         const result = await response.json();
        return result.records;
    }catch (e) {
        message(e.message , "#B91C1C");
    }
}
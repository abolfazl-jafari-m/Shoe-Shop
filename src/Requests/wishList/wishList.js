import {API_URL, headers} from "../../../configs.js";
import {message} from "../../utils/helper.js";

export async function addToFavorite (item){
    try{
        const response = await fetch(`${API_URL}/api/records/wishList` ,{
            method : "POST",
            headers : headers,
            body : JSON.stringify({productId :item})
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
            throw new Error("Something Goes Wrong.Please Try Again")
        }
        const result = await response.json();
        return result;
    }catch (e){
        message(e.message , "#B91C1C");
    }
}
export async function getFavoriteByProductId(id){

}
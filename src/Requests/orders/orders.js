import {API_URL, headers} from "../../../configs.js";
import {message} from "../../utils/helper.js";

export async function addToOrders(item){
    try{
        const response = await fetch(`${API_URL}/api/records/orders`, {
            method : "POST",
            headers : headers,
            body : JSON.stringify(item)
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

export async function getAllOrderItem(){
    try{
        const response = await fetch(`${API_URL}/api/records/orders`, {
            method : "GET",
            headers : headers
        })
        if (!response.ok){
            throw new Error("something goes wrong")
        }
        const result = await response.json();
        return result.records;
    }catch (e){
        message(e.message , "#B91C1C");
    }
}

export async function getOrderItemByFilter(key , value){
    try{
        const response = await fetch(`${API_URL}/api/records/orders?filterKey=${key}&filterValue=${value}` , {
            method:"GET",
            headers : headers
        })
        if (!response.ok){
            throw  new Error("failed to get your Orders")
        }
        const  result = await  response.json();
        return result.records
    }catch (e){
        message(e.message , "#B91C1C");
    }
}
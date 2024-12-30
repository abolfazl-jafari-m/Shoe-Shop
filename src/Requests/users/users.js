import {API_KEY, API_URL} from "../../../configs.js";
import {getAuthToken} from "../../utils/helper.js";

export async function login(email, password) {
    try{
        const response = await fetch(`${API_URL}/api/users/login`, {
            method: "POST",
            headers: {
                "api_key": API_KEY,
                "Content-Type": "application/json"
            },
            body : JSON.stringify({email, password})
        });
        console.log(response);
        if (!response.ok) {
            throw new Error("email or password is incorrect")
        }
        return response.json();
    }catch (e){
        console.log(e)
    }
}

export async function getUser(){
    try {
        const response = await fetch(`${API_URL}/api/users/me` ,{
            method : "GET",
            headers : {
                "Content-Type" : "application/json",
                "api_key" : API_KEY,
                "Authorization" : `Bearer ${getAuthToken()}`
            }
        })
        if (!response.ok){
            throw new Error("user not found")
        }
        const result = await response.json();
        return result.email;
    }catch (e){
        console.log(e)
    }
}

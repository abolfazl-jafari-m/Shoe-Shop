import {API_KEY, API_URL} from "../../../configs.js";
import {getAuthToken, message} from "../../utils/helper.js";

export async function login(email, password) {
    try {
        const response = await fetch(`${API_URL}/api/users/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "api_key": API_KEY
            },
            body: JSON.stringify({email, password})
        })
        if (!response.ok) {
            throw new Error("No User Found with this Information");
        }
        const result = await response.json();
        return result;

    } catch (err) {
        message(err.message, '#BE123C');
    }
}

export async function getUser() {
    try {
        const response = await fetch(`${API_URL}/api/users/me`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "api_key": API_KEY,
                "Authorization": `Bearer ${getAuthToken()}`
            }
        })
        if (!response.ok) {
            if (response.status === 403){
                localStorage.removeItem("token");
                window.location.replace("/public/login.html")
            }
            throw new Error("user not found")
        }
        const result = await response.json();
        return result
    } catch (e) {
        message(e.message, '#BE123C');
    }
}

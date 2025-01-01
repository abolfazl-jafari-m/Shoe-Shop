import {getAuthToken} from "./src/utils/helper.js";

const API_URL  = "http://api.alikooshesh.ir:3000";
const API_KEY  = "Jafari-M-124jc4mpkFur7lP4J0WqFJj0hw8sNzKr6yZa5RwkiBsivLPcTsTvUeUkWfyB9xInMPoH0lGppvmHskpCc4qbbEeth6ix3alIWanmDywUK9TjQMKq3hhdwhg";
const headers = new Headers({
    "Content-Type": "application/json",
    "api_key" : API_KEY,
    "Authorization": `Bearer ${getAuthToken()}`
})

export  {API_URL , API_KEY , headers}
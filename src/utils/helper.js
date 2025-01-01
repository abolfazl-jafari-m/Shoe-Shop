export function setAuthTokenInLocalStorage(token) {
    localStorage.setItem('token', JSON.stringify(token));
}

export function getAuthToken() {
    return JSON.parse(localStorage.getItem("token"));
}

export function message(msg, color) {
    const message_elm = document.getElementById('message');
    message_elm.style.backgroundColor = color;
    message_elm.classList.remove("hidden");
    message_elm.classList.add("popup");
    message_elm.innerHTML = msg;
    setTimeout(()=>{
        message_elm.classList.remove("popup");
        message_elm.classList.add("hidden");
    }, 3000);
}


export function validate(rules, inputMessage) {
    let messages = []
    let options = [];
    rules = rules.split("|");
    rules = rules.map(item => item.trim());
    rules.forEach(item => {
        let [name, rule = ""] = item.split(":");
        options.push({name, rule});
    })
    options.forEach(item => {
        if (item.name === "required") {
            messages.push("this field is required");
        }
        if (item.name === "min") {
            messages.push("min length is " + item.rule);
        }
    })
    inputMessage.innerHTML = messages.join(" . ");
}

export function accepted(value, inputMessage) {
    inputMessage.innerHTML = "";
    return value;
}
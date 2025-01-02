

const activeBtn = document.getElementById("activeBtn");
const activeTab = document.getElementById("activeTab");
const completeBtn = document.getElementById("completeBtn");
const completeTab = document.getElementById("completeTab");

activeBtn.addEventListener("click", ()=>{
    activeBtn.classList.remove("text-gray-400")
    activeBtn.classList.remove("border-gray-400")
    activeBtn.classList.add("border-black");
    completeBtn.classList.add("text-gray-400")
    completeBtn.classList.add("border-gray-400")
    completeBtn.classList.remove("border-black");
    activeTab.classList.remove("hidden");
    activeTab.classList.add("flex");
    completeTab.classList.add("hidden");
    completeTab.classList.remove("flex");

})
completeBtn.addEventListener("click", ()=>{
    completeBtn.classList.remove("text-gray-400")
    completeBtn.classList.remove("border-gray-400")
    completeBtn.classList.add("border-black");
    activeBtn.classList.add("text-gray-400")
    activeBtn.classList.add("border-gray-400")
    activeBtn.classList.remove("border-black")
    completeTab.classList.remove("hidden");
    completeTab.classList.add("flex");
    activeTab.classList.add("hidden");
    activeTab.classList.remove("flex");
})
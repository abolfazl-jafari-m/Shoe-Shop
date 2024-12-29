const introduction: HTMLElement | null = document.getElementById("introduction");
const welcome: HTMLElement | null = document.getElementById("welcome");
const slider: HTMLElement | null = document.getElementById("slider");
const slides: HTMLCollection = document.getElementsByClassName("slides");
const nextBtn : HTMLElement | null = document.getElementById('nextBtn');
const slideNav :HTMLCollection = document.getElementsByClassName('slide-nav');

const changePage = (): void => {
    setTimeout((): void => {
        introduction?.classList.add("hidden");
        welcome?.classList.remove("hidden");
        setTimeout((): void => {
            welcome?.classList.add("hidden")
            slider?.classList.remove("hidden")
            slider?.classList.add("flex")
        }, 3500)
    }, 3500)
}

changePage();

let currentSlide : number = 0;
nextBtn?.addEventListener('click', (e):void =>{
    if (nextBtn?.innerText === "Get Started"){
        window.location.replace("/public/login.html");
    }
    if (currentSlide < slides.length - 1){
        currentSlide++;
        for (const element of slides) {
            element.classList.add("hidden");
        }
        slides[currentSlide].classList.remove("hidden");
        goTo(currentSlide);
    }
    if (currentSlide === 2){
        nextBtn.innerText = "Get Started";
    }

})

function goTo(slide : number) :void {
    if (slide === 2){
        nextBtn ? nextBtn.innerText = "Get Stated" : undefined;
    }else {
        nextBtn ? nextBtn.innerText = "Next" : undefined;
    }
    currentSlide = slide;
    for (const element of slides) {
        element.classList.add("hidden");
    }
    for (const element of slideNav) {
        element.classList.remove("bg-black");
        element.classList.add("bg-gray-400");
    }
    slides[slide].classList.remove("hidden");
    slideNav[slide].classList.remove("bg-gray-400");
    slideNav[slide].classList.add("bg-black");
}

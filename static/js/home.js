let allSlides = document.querySelectorAll(".slide");
allSlides.forEach((slide, index) => {
    if (index > 0)
        slide.style.display = 'none'
})

function moveForward(event) {
    const element = event.currentTarget

    const index = element.getAttribute("data-index")
    allSlides[index - 1].style.display = 'none'
    allSlides[index].style.display = 'flex'
}

function moveBack(event) {
    const element = event.currentTarget

    const index = element.getAttribute("data-index")
    allSlides[index - 1].style.display = 'none'
    allSlides[index - 2].style.display = 'flex'
}

function pinPulse(event) {
    const element = event.currentTarget
    if (!element.classList.contains("pulse_click")) {
        element.classList.remove("pulse");
        element.classList.add("pulse_click");

        element.children[0].classList.remove("popover");
        element.children[0].classList.add("popover_click");
    } else if (window.getSelection().toString() === ''){
        element.classList.remove("pulse_click");
        element.classList.add("pulse");

        element.children[0].classList.remove("popover_click");
        element.children[0].classList.add("popover");
    }
}

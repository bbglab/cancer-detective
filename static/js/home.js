let allSlides = document.querySelectorAll(".slide");
allSlides.forEach((slide, index) => {
    if (index > 0)
        slide.style.display = 'none'
})

function moveForward(event) {
    const element = event.currentTarget

    const index = element.getAttribute("data-index")
    console.log('--->', index)
    console.log(element)
    allSlides[index - 1].style.display = 'none'
    allSlides[index].style.display = 'flex'
}

function moveBack(event) {
    const element = event.currentTarget

    const index = element.getAttribute("data-index")
    console.log('--->', index)
    console.log(element)
    allSlides[index - 1].style.display = 'none'
    allSlides[index - 2].style.display = 'flex'
}

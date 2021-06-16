
//Check height of web => TODO: remove it and added just with CSS
function maximizeHeight(itemSelector, removableComponentsSelectors) {
  let heightTotal = $(window).outerHeight();
  let heightConsumed = removableComponentsSelectors.reduce((total, it) => total + $(`${it}`).outerHeight(), 0);
  $(`${itemSelector}`).css("min-height", heightTotal - heightConsumed);
}

document.querySelector('.card-flip').addEventListener("mouseover",  (event) => {
  console.log('OVER MOUSE')
  let element = event.target;
  console.log(element)

  //element.classList.toggle('flipped')
  //$(this).children('.uk-card').toggleClass('flipped');
  let element = document.querySelector('.uk-card')
});


let currentTab = 0;
let numberOfTabs = 0;

function showTab(n) {
  let allTabs = document.querySelectorAll(".tab");
  allTabs.forEach((tab, index) => {
    if (index === currentTab)
      tab.style.display = 'none'
  })
  allTabs.forEach((tab, index) => {
    if (index === n)
      tab.style.display = 'block';
  })
  fixStepIndicator(n);
  currentTab = n;
}

function fixStepIndicator(n) {
  let allSteps = document.querySelectorAll(".step");
  allSteps.forEach((tab, index) => {
    if (index === currentTab)
      tab.classList.remove("uk-active")
  })
  allSteps.forEach((tab, index) => {
    if (index === n)
      tab.classList.add("uk-active")
  })
  // add option to go back to a previous step
  let value = currentTab;
  allSteps.forEach((tab, index) => {
    if (index === currentTab)
      tab.addEventListener("click", event => {
        showTab(value);
    })
  })
}

function nextTab() {
  if (numberOfTabs === 0) {
    numberOfTabs = document.querySelectorAll(".tab").length;
  }
  if (currentTab + 1 === numberOfTabs){
    $( "form" ).submit();
  } else {
    showTab(currentTab+1);
  }

}


function selectCard(event) {
  let element = event.target;
  const inputId = element.getAttribute("for");
  console.log(inputId)
  const value = element.getAttribute("value");
  console.log(value)
  $(`#${inputId}`).attr( "value", value);
  console.log($(`#${inputId}`))
  console.log(`#${inputId}`)
  console.log(document.getElementById(`#${inputId}`))

  // hide the non-used path
  if (value === 'skin') {
    document.querySelectorAll(".branch-skin").forEach(elem => elem.style.display = 'block');
  } else if (value === 'lung') {
    document.querySelectorAll(".branch-lung").forEach(elem => elem.style.display = 'block');
  }

  nextTab();
}

const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
function randomCode() {
  const length = 5;
  let result  = '';
  for ( let i = 0; i < length; i++ ) {
    result += CHARACTERS.charAt(Math.floor(Math.random() * CHARACTERS.length));
  }
  return result;
}
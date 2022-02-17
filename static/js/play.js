let currentTab = 0;
let numberOfTabs = 0;

document.querySelectorAll(".tab").forEach(tab => { tab.style.display = "none" })
document.querySelectorAll(".branch-skin").forEach(branch => { branch.style.display = "none" })
document.querySelectorAll(".branch-lung").forEach(branch => { branch.style.display = "none" })


document.getElementById("main-content").style.display = "none";
document.getElementById("nav").style.display = "none";

function selectCard(event) {
    const element = event.target
    const inputId = element.getAttribute("data-type");
    const value = element.getAttribute("data-value");
    document.getElementById(`${inputId}`).setAttribute( "value", value);

    // Hide the non-used path
    if (value === 'skin') {
        document.querySelectorAll(".branch-skin").forEach(elem => elem.style.display = 'block');
        document.querySelectorAll(".branch-lung").forEach(elem => elem.style.display = 'none');
    } else if (value === 'lung') {
        document.querySelectorAll(".branch-lung").forEach(elem => elem.style.display = 'block');
        document.querySelectorAll(".branch-skin").forEach(elem => elem.style.display = 'none');
    }

    nextTab();
}

function nextTab() {
    if (numberOfTabs === 0)
        numberOfTabs = document.querySelectorAll(".tab").length + 1;
    if (currentTab + 1 === numberOfTabs){
        document.getElementById( "main-content" ).submit();
    } else {
        showTab(currentTab+1);
    }
}

function showTab(n) {
    if (n <= currentTab+1) {
        if (n === 1)
            document.getElementById('cancer-type').style.display = 'none'
        if (n === 0)
            document.getElementById('cancer-type').style.display = 'block'
        let allTabs = document.querySelectorAll(".tab");
        allTabs.forEach((tab, index) => {
            if (index === currentTab - 1) {
                tab.style.display = 'none'
            }

        })
        allTabs.forEach((tab, index) => {
            if (index === n - 1) {
                tab.style.display = 'block';
            }
        })
        fixStepIndicator(n);
        currentTab = n;
    }

}

function fixStepIndicator(n) {
    let allSteps = document.querySelectorAll(".step");
    allSteps.forEach((tab, index) => {
        if (index > currentTab)
            tab.classList.remove("active")
    })
    allSteps.forEach((tab, index) => {
        if (index <= n)
            tab.classList.add("active")
    })
    let value = currentTab;
    allSteps.forEach((tab, index) => {
        if (index === currentTab)
            tab.addEventListener("click", event => {
                showTab(value);
            })
    })
}

function selectStep(event) {
    let element = event.target

    if (element.classList.contains('active')) {
        const index = element.getAttribute("data-index")
        document.querySelectorAll(".step").forEach(elem => {
            if (elem.classList.contains('active') && parseInt(elem.getAttribute("data-index")) > index) {
                elem.classList.remove('active')
            }
        })

        if (index <= currentTab)
            showTab(index)
    }

    document.querySelectorAll(".tab").forEach(tab => { tab.style.display = "none" })
}

let cardIDs = ['SKIN', 'LUNG', 'SKIN_RISK_FACTOR_1_1', 'SKIN_RISK_FACTOR_1_2', 'SKIN_RISK_FACTOR_1_3',
    'LUNG_RISK_FACTOR_1_1', 'LUNG_RISK_FACTOR_1_2', 'LUNG_RISK_FACTOR_1_3', 'SKIN_RISK_FACTOR_2_1',
    'SKIN_RISK_FACTOR_2_2', 'SKIN_RISK_FACTOR_2_3', 'LUNG_RISK_FACTOR_2_1', 'LUNG_RISK_FACTOR_2_2', 'LUNG_RISK_FACTOR_2_3',
    'SKIN_RISK_FACTOR_3_1', 'SKIN_RISK_FACTOR_3_2', 'SKIN_RISK_FACTOR_3_3', 'LUNG_RISK_FACTOR_3_1', 'LUNG_RISK_FACTOR_3_2',
    'LUNG_RISK_FACTOR_3_3']

for ( const type of cardIDs) {
    let card = document.getElementById(type);
    card.addEventListener('mouseover', function () {
        if (!card.classList.contains('is-flipped')) {
            card.classList.toggle('is-flipped');
        }
    });
    card.addEventListener('mouseout', function () {
        card.classList.remove('is-flipped');
    });
}
function showGame() {
    $("#instructions").hide();
    $("#main-content").show();
    $("#nav").show();
}
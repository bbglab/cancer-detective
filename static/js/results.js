const elem = document.getElementById("play")
elem.classList.remove("nav-item")

$( document ).ready(function() {
    $("#step1").hide();
    $("#step2").hide();
    $("#step3").hide();
    $("#step4").hide();
    $("#res").hide();
    $("#btn-close").hide();
});

function show_sequencer() {
    $("#start").hide();
    $("#step1").show();
    $("#characteristics").hide();
    setTimeout(function() {
            $("#step1").hide();
            $("#step2").show();
        },
        45);
}

function show_computer() {
    $("#step2").hide();
    $("#step3").show();
    setTimeout(function() {
            $("#step3").hide();
            $("#step4").show();
            $("#characteristics").show();
        },
        45);
}


function showResults() {
    $("#characteristics").hide();
    $(".seq").hide();
    $("#res").show();
}
function showCharacteristics() {
    $("#characteristics").show();
    $("#btn-close").show();
    $("#char_button").hide();
}
function hideCharacteristics() {
    $("#characteristics").hide();
    $("#btn-close").hide();
    $("#char_button").show();
}


function downloadPDF(mutations,type_cancer) {
    console.log(type_cancer)
    var pdf = new jsPDF('p', 'px', 'a4');
    pdf.setFontSize(20);
    pdf.text('Your sample is from a patient with '+type_cancer+'\n'+
        'Your sample has '+String(mutations.length)+' driver mutations\n'
        +'The mutations observed by Cancer Detective are in the following page', 225, 80, null, null, "center");

    pdf.addPage("a4");
    var results = document.getElementById("results-grid")
    pdf.addHTML(results, () => {
        pdf.save('cancer_detective_results.pdf');
    });
}
let mutcardIDs = ['mutation_card_1', 'mutation_card_2', 'mutation_card_3', 'mutation_card_4', 'mutation_card_5',
    'mutation_card_6', 'mutation_card_7', 'mutation_card_8', 'mutation_card_9']

for ( const type of mutcardIDs) {
    let card = document.getElementById(type);
    card.addEventListener('click', function (){
        if (!card.classList.contains('is-flipped')) {
            card.classList.toggle('is-flipped');
        }
        else if (card.classList.contains('is-flipped')) {
            card.classList.remove('is-flipped');
        }
    });
}

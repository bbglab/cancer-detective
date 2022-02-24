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
        4500);
}

function show_computer() {
    $("#step2").hide();
    $("#step3").show();
    setTimeout(function() {
            $("#step3").hide();
            $("#step4").show();
            $("#characteristics").show();
        },
        4500);
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

function downloadPDF(mutations, attributes) {
    let cancer_type = attributes['ttype']
    const pdf = new jsPDF('p', 'px', 'a4');
    pdf.setFontSize(15);
    pdf.text('Your sample is from a patient with '+ cancer_type['name'].toLowerCase() +'\n'+
        'Your sample has '+String(mutations.length)+' driver mutations\n'
        +'The mutations observed by Cancer Detective are in the following page', 225, 80, null, null, "center");
    pdf.addPage("a4");
    const results = document.getElementById("results-grid");
    pdf.addHTML(results, () => {
        pdf.save('cancer_detective_results.pdf');
    });
}
let mutcardIDs = ['mutation_card_1', 'mutation_card_2', 'mutation_card_3', 'mutation_card_4', 'mutation_card_5',
    'mutation_card_6', 'mutation_card_7', 'mutation_card_8', 'mutation_card_9']

for ( const type of mutcardIDs) {
    let card = document.getElementById(type);
    if (card !== null) {
        card.addEventListener('click', function (){
            if (!card.classList.contains('is-flipped')) {
                card.classList.toggle('is-flipped');
            }
            else if (card.classList.contains('is-flipped')) {
                card.classList.remove('is-flipped');
            }
        });
    }

}

function markTrue(index) {
    document.getElementById(index + "false").checked = false;
}

function markFalse(index) {
    document.getElementById(index + "true").checked = false;
}

function markAnswer(index) {
    for (let i = 1; i < 5; i++) {
        console.log(index, String(index[0])+String(i))
        if (String(index) !== String(index[0])+String(i)) {
            document.getElementById(String(index[0])+String(i)).checked = false;
        }
    }

}

function submitTest(questions) {

    const formData = new FormData(document.getElementById( "test" ))
    let correct_ans = 0

    for (const name of formData.entries()) {
        correct_ans += Number(name[0][0] + questions[Number(name[0][0]) - 1]['response'] === name[0])
        //const ques = questions[Number(pair[0][0])]
        //console.log(ques)
        //correct_ans += Number(String(pair[0][0] + ques['response']) === pair[0])
    }
    console.log("Correct answers: ", correct_ans)

    document.getElementById("test").reset();
}


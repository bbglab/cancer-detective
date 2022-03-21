const elem = document.getElementById("play")
elem.classList.remove("nav-item")


document.getElementById("test").reset();

$( document ).ready(function() {
    $("#step1").hide();
    $("#step2").hide();
    $("#step3").hide();
    $("#step4").hide();
    $("#res").hide();
    $("#btn-close").hide();
    $("#survey").hide();
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
    let btn_close = document.getElementById('btn-close-characteristics')
    btn_close.style.display = 'block'
    $("#characteristics").show();
    $("#btn-close").show();
    $("#char_button").hide();
}
function showSurvey() {
    $("#surv_button").hide();
    $("#survey").show();
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
    pdf.text('Your sample is from a patient with '+ cancer_type['name'].toLowerCase() +'.\n'
        +'The cancer detective has found ' +String(mutations.length)+' driver mutations in the sample.\n'
        +'The patient is ' + attributes['riskFactor1']['description'].toLowerCase() +' and his/her characteristics are:\n'
        +attributes['riskFactor2']['description'].toLowerCase() +' and '
        +attributes['riskFactor3']['description'].toLowerCase() +'.\n'
        +'The mutations observed by the Cancer Detective are the following:', 210, 65, null, null, "center");

    i=0
    for ( const mut of mutations) {
    pdf.text('Gene: '+ mut['gene']+ ', Protein change: '+mut['aa_change']+
        ', Impact: '+mut['driver_passenger']+  ', Treatment: '+mut['targeted_therapy'],
            50, 135+i, null, null);
    i=i+20
    }

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
        if (String(index) !== String(index[0])+String(i)) {
            document.getElementById(String(index[0])+String(i)).checked = false;
        }
    }

}

function submitTest(questions_general, questions_result) {


    const formData = new FormData(document.getElementById( "test" ))
    const response_test = Array.from(formData.entries())
    if (response_test.length < 9) {
        let test_alert = document.getElementById('test-alert')
        test_alert.style.display = 'block';
    }
    else {
        let test_alert = document.getElementById('test-alert')
        test_alert.style.display = 'none';
        console.log(questions_general, questions_result);

        let correct_ans = 0
        let anw_general = response_test.slice(0, 5)
        let anw_results = response_test.slice(5, response_test.length)
        console.log(anw_general, anw_results)

        for (const [ element, _ ] of anw_general) {
            console.log(element)
            //correct_ans += Number(element[0][0] + questions_general[Number(element[0][0]) - 1]['response'] === element[0])
            const ques = questions_general[Number(element[0]) - 1]
            console.log(ques)
            //correct_ans += Number(String(pair[0][0] + ques['response']) === pair[0])
        }

        for (const [ element, _ ] of anw_results) {
            console.log(element)
            //correct_ans += Number(element[0][0] + questions_general[Number(element[0][0]) - 1]['response'] === element[0])
            const ques = questions_result[Number(element[0]) - 1]
            console.log(ques)
            //correct_ans += Number(String(pair[0][0] + ques['response']) === pair[0])
        }


        console.log("Correct answers: ", correct_ans)

        document.getElementById("test").reset();
    }

}


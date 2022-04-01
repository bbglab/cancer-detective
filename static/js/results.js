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
function createHeaders(keys) {
  var result = [];
  for (var i = 0; i < keys.length; i += 1) {
    result.push({
      id: keys[i],
      name: keys[i],
      prompt: keys[i],
      width: 120,
      align: "center",
      padding: 4
    });
  }
  return result;
}

function downloadPDF(mutations, attributes) {
    let cancer_type = attributes['ttype']
    const pdf = new jsPDF('p', 'px', 'a4');
    pdf.setFontSize(35);
    pdf.text('Mutations found by the \n Cancer Detective', 210, 65, null, null, "center");

    pdf.setFontSize(15);

    const mytext='Your sample is from a patient with '+ cancer_type['name'].toLowerCase() +'.\n'
        +'The patient is ' + attributes['riskFactor1']['description'].toLowerCase() +' and his/her characteristics are: '
        +attributes['riskFactor2']['description'].toLowerCase() +' and '
        +attributes['riskFactor3']['description'].toLowerCase() +'.\n\n'+
        'The cancer detective has found ' +String(mutations.length)+' driver mutations in the sample.\n'+
        'The mutations observed by the Cancer Detective are the following:'

    var textLines = pdf
        .setFontSize(15)
        .splitTextToSize(mytext,360 );
    pdf.text(textLines,50,120);





    var headers = createHeaders(['Gene','Change','Impact','Treatment']);

    var muts_dict=[];
    for (const mut of mutations) {
        muts_dict.push({
          Gene: mut['gene'],
          Change: mut['aa_change'],
          Impact: mut['driver_passenger'],
          Treatment: mut['targeted_therapy'],
        });
    };

    pdf.table(50, 225, muts_dict,headers);

    /*
    pdf.setFontSize(12);
    var i=0;
    for ( const mut of mutations) {
    pdf.text('Gene: '+ mut['gene']+ ', Protein change: '+mut['aa_change']+
        ', Impact: '+mut['driver_passenger']+  ', Treatment: '+mut['targeted_therapy'],
            50, 225+i, null, null);
         var i=i+20;
    }*/

    /*pdf.addPage("a4");
    const results = document.getElementById("results-grid");
    pdf.addHTML(results, () => {
        pdf.save('cancer_detective_results.pdf');
    });*/
    pdf.save('cancer_detective_results.pdf');
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

        let correct_ans = 0
        let anw_general = response_test.slice(0, 5)
        let anw_results = response_test.slice(5, response_test.length)

        for (const [ element, _ ] of anw_general) {
            const ques = questions_general[Number(element[0]) - 1]
            const is_correct = ques['response'] === element.substring(1, element.length)
            if (is_correct) {
                let res_alert =  document.getElementById("correct_general_" +  String(element[0]))
                res_alert.style.display = 'block';
            } else {
                let res_alert =  document.getElementById("wrong_general_" +  String(element[0]))
                res_alert.style.display = 'block';
            }
            correct_ans += Number(is_correct)
        }

        for (const [ element, _ ] of anw_results) {
            const ques = questions_result[Number(element[0]) - 1]
            const response = Number(element[1]) - 1
            const is_correct = ques['answers'][response]['correct'] === 'true'

            if (is_correct) {
                let res_alert =  document.getElementById("correct_results_" +  String(element[0]))
                res_alert.style.display = 'block';
            } else {
                let res_alert =  document.getElementById("wrong_results_" +  String(element[0]))
                res_alert.style.display = 'block';
            }
            correct_ans += Number(is_correct)
        }



        const rating = document.getElementById("rating")
        const score_class = correct_ans < 5 ? "bad" : correct_ans < 7 ? "meh" : "good";
        const score_text = correct_ans < 5 ? "You can do it better!" : correct_ans < 7 ? "Well done!" : "You are a pro cancer detective!";
        rating.classList.add(score_class);

        const rating_color = window.getComputedStyle(rating).backgroundColor;
        const gradient = `background: conic-gradient(${rating_color} ${correct_ans/9 * 100}%, transparent 0 100%)`;
        rating.setAttribute("style", gradient);
        rating.innerHTML = `<span style="font-size: 60px">${correct_ans}</span><span style="font-size: 0.35em">out of 9</span>`;
        rating.style.display = 'flex';

        const rating_text = document.getElementById("rating-text")
        rating_text.innerHTML = score_text;
        rating_text.style.display = 'flex'

        const check_results = document.getElementById("check-results")
        check_results.style.display = 'none';


        const retake_test = document.getElementById("retake-test")
        retake_test.style.display = 'flex';
    }

}

function retakeTest(questions_general, questions_result) {
    
}

const elem = document.getElementById("play")
elem.classList.remove("nav-item")

$( document ).ready(function() {
    $("#step1").hide();
    $("#step2").hide();
    $("#step3").hide();
    $("#step4").hide();
    $("#res").hide();
});

function show_sequencer() {
    $("#start").hide();
    $("#step1").show();
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
        },
        4500);
}

function showResults() {
    $(".seq").hide();
    $("#res").show();
}

function downloadPDF(mutations) {
    var pdf = new jsPDF('p', 'px', 'a4');
    pdf.setFontSize(20);
    pdf.text('Mutations observed by Cancer Detective', 225, 80, null, null, "center");
    pdf.addPage("a4");
    var results = document.getElementById("results-grid")
    pdf.addHTML(results, () => {
        pdf.save('cancer_detective_results.pdf');
    });
}
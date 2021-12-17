const elem = document.getElementById("play")
elem.classList.remove("nav-item")

$( document ).ready(function() {
    $("#seq-button").hide();
    $(".res").hide();

    setTimeout(function() {
            $("#seq-spinner").hide();
            $("#seq-button").show();
            $(".text-lead").hide();
        },
        3500);
});

function showResults() {
    $(".seq").hide();
    $(".res").show();
}

$("#info-sequencing").click(function () {
    swal("The sequencing process", "The sequencing process...");
});


function downloadPDF(mutations) {
    var pdf = new jsPDF('p', 'px', 'a4');
    pdf.setFontSize(20);
    pdf.text('Mutations observed by Cancer Detective', 225, 80, null, null, "center");
    pdf.addPage("a4");
    var results = document.getElementById("results-grid")
    pdf.addHTML(results, function() {
        pdf.save('cancer_detective_results.pdf');
    });
}
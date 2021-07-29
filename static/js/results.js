const elem = document.getElementById("play")
elem.classList.remove("nav-item")

$( document ).ready(function() {
    $("#seq-button").hide();
    $(".res").hide();

    setTimeout(function() {
            $("#seq-spinner").hide();
            $("#seq-button").show();
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

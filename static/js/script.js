
function maximizeHeight(itemSelector, removableComponentsSelectors) {
  let heightTotal = $(window).outerHeight();
  let heightConsumed = removableComponentsSelectors.reduce((total, it) => total + $(`${it}`).outerHeight(), 0);
  $(`${itemSelector}`).css("min-height", heightTotal - heightConsumed);
}

$('.card-flip').hover( function () {
  $(this).children('.uk-card').toggleClass('flipped');
});



var currentTab = 0;
var numberOfTabs = 0;

function showTab(n) {
  let allTabs = $(".tab");
  allTabs.eq(currentTab).hide();
  allTabs.eq(n).show();
  fixStepIndicator(n);
  currentTab = n;
}

function fixStepIndicator(n) {
  let allSteps = $(".step");
  allSteps.eq(currentTab).removeClass("uk-active");
  allSteps.eq(n).addClass("uk-active");
  // add option to go back to a previous step
  var value = currentTab;
  allSteps.eq(currentTab).on("click", "a", function (event) {
      showTab(value);
  });
}

function nextTab() {
  if (numberOfTabs === 0) {
    numberOfTabs = $(".tab").length;
  }
  if (currentTab + 1 == numberOfTabs){
    $( "form" ).submit();
  } else {
    showTab(currentTab+1);
  }

}


function selectCard(event) {
  let element = $(event.currentTarget);
  const inputId = element.attr("for");
  const value = element.attr("value");
  $(`#${inputId}`).attr( "value", value);

  // hide the non-used path
  if (value == 'skin') {
    $(".branch-skin").show();
  } else if (value == 'lung') {
    $(".branch-lung").show();
  }

  nextTab();
}
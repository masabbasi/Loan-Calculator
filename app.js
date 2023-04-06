//Define UI Vars
let $ = document;
let form = $.querySelector("#form-loan");
let amount = $.querySelector("#amount");
let interest = $.querySelector("#interest");
let year = $.querySelector("#year");
let monthlyPayment = $.querySelector("#monthly-payment");
let totalPayment = $.querySelector("#total-payment");
let interestPaymentear = $.querySelector("#interest-payment");
let card = $.querySelector(".card-body");
let heading = $.querySelector(".heading");
let clear = $.querySelector(".clearAll");

//Invoke All Events
loadAllEvents();

//Define EventListener Function
function loadAllEvents() {
	//Form Submit
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    $.querySelector(".loading").style.display = "block";
    setTimeout(calculateLoan, 2000);
  });

	//Clear button
  clear.addEventListener("click", clearAll);
}

// Loan Calculate Function
function calculateLoan() {
  let intAmount = parseFloat(amount.value);
  let intInterest = parseFloat(interest.value);
  let intMonth = parseFloat(year.value) * 12;

  let calInterest = (intAmount * intInterest * (intMonth + 1)) / 2400;
  let calMonthlyPayment = (calInterest + intAmount) / intMonth;
  let calTotalPayment = calInterest + intAmount;

  if (isFinite(intAmount) && isFinite(intInterest) && isFinite(intMonth)) {
    monthlyPayment.value = calMonthlyPayment.toFixed(2);
    totalPayment.value = calTotalPayment.toFixed(2);
    interestPaymentear.value = calInterest.toFixed(2);

    $.querySelector(".loading").style.display = "none";
    $.querySelector(".results").style.display = "block";
  } else {
    showError("Please Check The Numbers!");
  }
}

//Check The Numbers Function
function showError(error) {
  $.querySelector(".loading").style.display = "none";
  $.querySelector(".results").style.display = "none";
  let alertError = $.createElement("div");
  alertError.className = "alert alert-danger";
  alertError.textContent = error;
  card.insertBefore(alertError, heading);
  setTimeout(clearError, 3000);
}

//Clear Error Function
function clearError() {
  $.querySelector(".alert").remove();
}

//Clear All Function
function clearAll(e) {
	e.preventDefault();
	$.querySelector(".loading").style.display = "none";
  $.querySelector(".results").style.display = "none";
  amount.value = "";
  interest.value = "";
  year.value = "";
  monthlyPayment.value = "";
  totalPayment.value = "";
  interestPaymentear.value = "";
}

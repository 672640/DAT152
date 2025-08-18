let stack = [];

const push = document.getElementById("pushButton");
const pop = document.getElementById("popButton");
const input = document.getElementById("inputUser");
const span = document.getElementById("spanText");
const dateStart = document.getElementById("dateStart");
const dateEnd = document.getElementById("dateEnd");
const insertDates = document.getElementById("insertDates");
const dateSum = document.getElementById("dateSum");
const suppliedLocale = document.getElementById("suppliedLocale");
const supplyLocale = document.getElementById("supplyLocale");
const locale = document.getElementById("locale");

push.addEventListener("click", function() {
    let inputValue = input.value;
    stack.push(inputValue);
    console.log(stack);
});

pop.addEventListener("click", function() {
    let popped = stack.pop();
    span.innerText = popped;
});

insertDates.addEventListener("click", function() {
    let dateStartValue = new Date(dateStart.value);
    let dateEndValue = new Date(dateEnd.value);

    if((dateStartValue > dateEndValue) || !dateStartValue || !dateEndValue) {
        dateSum.innerText = "Invalid start and end date combination";
    }
    else {
        let dateDifference = dateEndValue - dateStartValue;
        let dateDifferenceDays = dateDifference / (1000 * 60 *60 *24);
        if(dateDifferenceDays == 1) {
            dateSum.innerText = dateDifferenceDays + " day";
        }
        else {
            dateSum.innerText = dateDifferenceDays + " days";
        }
        console.log(dateDifferenceDays);
    }
});

suppliedLocale.addEventListener("click", function() {
    let today = new Date();
    let supplyLocaleValue = supplyLocale.value;

    if(!supplyLocaleValue) {
        supplyLocaleValue = "nb-NO";
    }

        locale.innerText = today.toLocaleDateString(supplyLocaleValue, {
            weekday: "long"
        });
});
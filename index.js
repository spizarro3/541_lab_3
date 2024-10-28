// Grab elements
const billTotal = document.getElementById("billTotal");
const currencySelect = document.getElementById("currency-select");
const questionChecker = document.getElementById("?");

const tipRange = document.getElementById("tipRange")

const tipP = document.getElementById("tipP");
const tipA = document.getElementById("tipA");
const tTips = document.getElementById("tTips");

const photo = document.getElementById("photo")
// add if bill total.value is negative or Nan
// might need to make a function for 
function Main(p){

   // p == undefined ? console.log("0% Tip? WOW"):null;
    displayTip();
    billTotal.value < 0 ? showPhoto():null;
    isNaN(billTotal.value ) ? showPhoto(): null;
    if(billTotal.value > 0 && tipRange.value > 0){
        hidePhoto()
        currencyChecker(tipRange.value)}
    if(billTotal.value > 0 && tipRange.value == 0){
        hidePhoto()
        currencyChecker(0)}
}

 function GrandTotal(tip, currency){
    const currentBillTotal = billTotal.value;
    const totalConverted = currentBillTotal * currency
    const tipConverted = totalConverted*tip
    const total = totalConverted + (tipConverted/100);

    if(tip == 0){
        // should I have a state so we can re-use the code?
        const state = {billUSD:currentBillTotal, tip: tip, currency:currency}
        console.log(state)
        DisplayMoney(0, total)
    }else{
      
        DisplayMoney(tipConverted/100, total)
    }
 }
/**
 * 
 * @param {*} currency 
 * @returns 
 * How to convert currency
 * A - Current Value: currentBillTotal
 * B - Exchange Rate: currency
 * C - Total with excgange rate applied
 * A*B=C(*=multiplied)
 */
function currencyChecker(tip){
    isNaN(tip)?tip = 0:null;
    menu = currencySelect.value
    menu == "Please choose Currency:" ? DisplayMoney(null,null): null;
    menu == "USD" ? GrandTotal(tip, 1) : null;
    menu == "Yen" ? GrandTotal(tip, 149.34) : null;
    menu == "Rupee" ? GrandTotal(tip, 84.08) : null;
}
function displayTip(){
    tipP.value = `${tipRange.value}%`;
}
// this function will target my DOM and show the values
function DisplayMoney(P, tT){
    console.log(P)
    if(P == null || tT.length === 0){
        console.log("Choose a currency")
        tipA.value = 200;
    }
  //  tipA.value = P;
    tTips.value = (Math.round(tT * 100)/100).toFixed(2);
    tipA.value = (Math.round(P * 100)/100).toFixed(2);
}

// Do I still need to fix this??

function showPhoto(){
    photo.style.visibility = "visible";
    window.alert("BillTotal can not be a Negative number or Non-Number")
}

function hidePhoto(){
    console.log("should hide")
    photo.style.visibility = "hidden";
}
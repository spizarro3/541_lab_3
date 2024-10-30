// Grab elements
const billTotal = document.getElementById("billTotal");
const currencySelect = document.getElementById("currency-select");
const questionChecker = document.getElementById("?");

const tipRange = document.getElementById("tipRange")
const tipP = document.getElementById("tipP");
const tipA = document.getElementById("tipA");
const tTips = document.getElementById("tTips");

const photo = document.getElementById("photo")
const msgBox = document.getElementById("msgBox")

// stores every calculated instance
const state = [];


/**
 * Render Main() when BillTotal input value and Tip Range Slider changes
 * @return {currencyChecker(tipRange.value)} Returns function with valid Tip Amount
 */

function Main(){
    // Tip amount will display when TipRange slider changes "onClick"
    displayTip();

    // If billTotal input is Negative or Non-Number return error msg and img
    billTotal.value < 0 || isNaN(billTotal.value)
        ? showPhoto()
        : null;

    // If valid BillTotal and Tip > 0
    if(billTotal.value >= 0 && tipRange.value >= 0){
        hidePhoto()
        return currencyChecker(tipRange.value)
    }
}


/**
 * 
 * @param {Number} tip amount
 * @return {GrandTotal(tip, currency, currencyType)}
 * 
 */

function currencyChecker(tip){
    // this method should never go off and is there just in case
    isNaN(tip)?tip = 0:null;

    // if a currency has been selected return data
    menu = currencySelect.value
    menu == "Choose Currency:" ? DisplayMoney(null,null): null;
    menu == "USD" ? GrandTotal(tip, 1, "$") : null;
    menu == "Yen" ? GrandTotal(tip, 149.34, "¥") : null;
    menu == "Rupee" ? GrandTotal(tip, 84.07, "\u20B9") : null;
}

/**
 * @returns {void} updates tip percentage
 */
function displayTip(){
    tipP.value = `${tipRange.value}%`;
}


/**
 * 
 * @param {Number} tip 
 * @param {Number} currency 
 * @param {String} currencyType 
 * @return {DisplayMoney()} function to display values on form
 */

function GrandTotal(tip, currency, currencyType){
    const instance = {
        billUSD: billTotal.value, 
        tipPercentage: tip/100,
        tipAmount: (billTotal.value * currency)*(tip/100),
        currencyType: currencyType,
        currencyRate: currency,
        totalBillWithTips: ((billTotal.value * currency)*(tip/100)) + (billTotal.value * currency)
    }
    state.push(instance)
    currencyPopUp(currencyType)
    return  DisplayMoney(instance.currencyType, instance.tipAmount, instance.totalBillWithTips)
 }


/**
 * 
 * @param {Number} instance.currencyType
 * @param {Number} instance.tipAmount
 * @param {Number} instance.totalBillWithTips
 */
function DisplayMoney(currencyType, tipAmount, totalBillWithTips){
    if(tipAmount == null || totalBillWithTips.length === 0){
        msgBox.style.display = "block";
        msgBox.innerText = "Choose a currency";

        tipP.value = "0%"
        tipA.value = "0.00"
        tTips.value = "0.00"
    } else {
            tipA.value = `${currencyType} ${tipAmount.toFixed(2)}`
            tTips.value = `${currencyType} ${totalBillWithTips.toFixed(2)}`
    }
}


/**
 * @method changes visiable Html elements to show currency character 
 */

function currencyPopUp (currencyType){
    if (currencyType == "$"){
        msgBox.style.display = "none";
    }
    if (currencyType == "¥"){
        msgBox.style.display = "block";
        msgBox.innerText = "$1 USD = ¥ 149.34 JPY for Yen";
    }
    if (currencyType == "\u20B9"){
        msgBox.style.display = "block";
        msgBox.innerText = "$1 USD = ₹ 84.07 INR for Rupee";
    }
 }    



/**
 * @method changes visiable Html elements to show as an error message
 */
function showPhoto(){
    photo.style.visibility = "visible";
    msgBox.style.display = "block";
    msgBox.innerText ="BillTotal can not be a negative number"
    
    tipP.value = "!"
    tTips.value = "!";
    tipA.value = "!";
}


/**
 * @method changes visiable Html elements to hidden
 */
function hidePhoto(){
    photo.style.visibility = "hidden";
    msgBox.style.display = "none";
}
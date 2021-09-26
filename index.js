var buyingPriceInput = document.querySelector("#buying-price");
var quantityInput = document.querySelector("#quantity");
var currentPriceInput = document.querySelector("#current-price");
var checkBtn = document.querySelector(".check-btn")
var allInputs = document.querySelectorAll("input");
var output = document.querySelector(".output");
var display = document.querySelector("main");
var greenColor = "#D1FAE5";
var redColor = "#FEE2E2";
var defaultColor = "#F3F4F6";

allInputs.forEach((input) => {
    input.oninput = ((event) => {
        output.style.display = "none";
        display.style.backgroundColor = defaultColor ;
        if (event.target.validity.valid) {
            if (allIinputsEntered()) {
                checkBtn.disabled = false;
            } else {
                checkBtn.disabled = true
            }
        } else {
            event.target.value = "";
            checkBtn.disabled = true;
        }
    })
})

function allIinputsEntered() {
    var entries = []
    allInputs.forEach((input) => entries.push(input.value))
    return (entries.includes("") ? false : true)
}

function calcProfitOrLoss(currentPrice, buyingPrice, quantity) {
    if (currentPrice > buyingPrice) {
        var profit = currentPrice - buyingPrice
        var absProfit = profit*quantity;
        var profitPercentage = profit / buyingPrice * 100
        return {
            status: "profit",
            absolute: absProfit,
            percentage: profitPercentage.toFixed(2)
        }
    } else {
        var loss = buyingPrice - currentPrice;
        var absLoss = (loss)*quantity;
        var lossPercentage = loss/buyingPrice*100;
        return {
            status: "loss",
            absolute: absLoss,
            percentage: lossPercentage.toFixed(2)
        }
    }
}

function displayOutput(result){
    if (result.status==="profit"){
        display.style.backgroundColor = greenColor;
        output.style.display = "block"; 
        output.innerText = `The profit is ${result.absolute} and the percentage is ${result.percentage}`;
    } else  {
        display.style.backgroundColor = redColor;
        output.style.display = "block";
        output.innerText = `The loss is ${result.absolute} and the percentage is ${result.percentage}`;
    }
}

function submitHandler(){
    var currentPrice = Number(currentPriceInput.value);
    var buyingPrice = Number(buyingPriceInput.value);
    var quantity = Number(quantityInput.value);
    console.log(currentPrice, buyingPrice, quantity)
    var result = calcProfitOrLoss(currentPrice, buyingPrice, quantity);

    displayOutput(result)

}

checkBtn.addEventListener("click", submitHandler);
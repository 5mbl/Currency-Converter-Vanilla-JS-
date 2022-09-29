// API 
const apiKey = "78c124c62383b433637d25d1"

//DOM
const dropList = document.querySelectorAll(".drop-list select") 
const fromCurrency = document.querySelector(".from select")
const toCurrency = document.querySelector(".to select")
const getButton = document.querySelector("form button")
const exchangeIcon = document.getElementById("switch-icon")

// DROPLIST (FROM-TO)

// iterates over the drop list
for (let i = 0; i < dropList.length; i++) {
    // iterates over all properties in the country_code object
    for(const currency_code in country_code){
        let selected = i == 0 ? currency_code == "USD" ? "selected" : "" : currency_code == "EUR" ? "selected" : "DE";
        // option tag: The <option> tag defines an option in a select list
        let optionTag = `<option value="${currency_code}" ${selected}>${currency_code}</option>`;
        dropList[i].insertAdjacentHTML("beforeend", optionTag)
    }
    dropList[i].addEventListener("change", e =>{
        loadFlag(e.target) // calling loadFlag with passing the target element as an argument
    })
}

// LOAD COUNTRY IMAGE
function loadFlag(element){
    for(let code in country_code){
        if(code == element.value){
            let imgTag = element.parentElement.querySelector("img");
            imgTag.src = `https://flagcdn.com/w80/${country_code[code].toLowerCase()}.png`
        }
    }
}

window.addEventListener("load", () =>{
    getExchangeRate()
})

getButton.addEventListener("click", (e)=>{
    console.log("Button clicked");
    e.preventDefault(); //preventing form from submitting
    getExchangeRate()
})

exchangeIcon.addEventListener("click", () =>{
    console.log("switch icon clicked");
    let tempCode = fromCurrency.value;
    fromCurrency.value = toCurrency.value
    toCurrency.value = tempCode
    loadFlag(fromCurrency)
    loadFlag(toCurrency)
    getExchangeRate()
})

function getExchangeRate(){
    const amount = document.getElementById("inputAmount")
    const amountVal = amount.value

    // 0 or no value we will put 1 by default as a value
    if(amountVal == "" || amountVal == "0"){
        amount.value = "1";
        amountVal = amount.value
    }

    let url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency.value}`
    // fetching api response and returning it 
    fetch(url).then(response => response.json()).then(result =>{
        let exchangeRate = result.conversion_rates[toCurrency.value]
        let totalExRate = (amountVal * exchangeRate).toFixed(2);
        console.log(exchangeRate)

        // render
        const exchangeRateTxt = document.querySelector(".exchange-rate")
        exchangeRateTxt.innerText = `${amountVal} ${fromCurrency.value} = ${totalExRate} ${toCurrency.value}`;
        // 1 EUR = 15,94 TL
    }).catch(()=>{
        exchangeRateTxt.innerText = "Something went wrong"
    })
}
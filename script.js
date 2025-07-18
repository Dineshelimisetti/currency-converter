
const countryList = {
    USD: "US",
    INR: "IN",
    EUR: "EU",
    AUD: "AU",
    CAD: "CA",
    GBP: "GB",
    JPY: "JP",
    CNY: "CN",
    CHF: "CH",
    SGD: "SG",
    NZD: "NZ",
    ZAR: "ZA",
    SAR: "SA",
    AED: "AE",
    RUB: "RU",
    BRL: "BR",
    MXN: "MX",
    KRW: "KR",
    MYR: "MY",
    IDR: "ID",
    THB: "TH"
};

const fromCurrency = document.getElementById("from-currency");
const toCurrency = document.getElementById("to-currency");
const amountInput = document.querySelector("input");
const exchangeBtn = document.querySelector(".btn");
const exchangeMsg = document.querySelector(".msg");

function populateCurrencyOptions() {
    Object.keys(countryList).forEach(code => {
        const option1 = document.createElement("option");
        option1.value = code;
        option1.textContent = code;

        const option2 = option1.cloneNode(true);

        fromCurrency.appendChild(option1);
        toCurrency.appendChild(option2);
    });

    fromCurrency.value = "USD";
    toCurrency.value = "INR";

    updateFlags(); 
}

function updateFlags() {
    document.querySelector(".from img").src = `https://flagsapi.com/${countryList[fromCurrency.value]}/flat/64.png`;
    document.querySelector(".to img").src = `https://flagsapi.com/${countryList[toCurrency.value]}/flat/64.png`;
}

async function getExchangeRate(e) {
    e.preventDefault();

    const amount = parseFloat(amountInput.value);
    const from = fromCurrency.value;
    const to = toCurrency.value;

    if (isNaN(amount) || amount <= 0) {
        exchangeMsg.innerText = "Please enter a valid amount";
        return;
    }

    try {
        const url = `https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`;
        const response = await fetch(url);
        const data = await response.json();

        const rate = data.rates[to];
        exchangeMsg.innerText = `${amount} ${from} = ${rate} ${to}`;
    } catch (err) {
        exchangeMsg.innerText = "Failed to fetch exchange rate.";
        console.error(err);
    }
}

fromCurrency.addEventListener("change", updateFlags);
toCurrency.addEventListener("change", updateFlags);
exchangeBtn.addEventListener("click", getExchangeRate);

populateCurrencyOptions();

const swapIcon = document.getElementById("swap-icon");

swapIcon.addEventListener("click", () => {
    const temp = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = temp;

    updateFlags();

    exchangeBtn.click();
});



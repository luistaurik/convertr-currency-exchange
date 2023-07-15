let calculate = document.querySelector("#calculate")

async function getCurrencyApi() {
    try {
        let endPoint1 = "https://mindicador.cl/api";
        const res = await fetch(endPoint1);
        const data = await res.json();
        const currency = data;
        console.log("the data is ", currency);
        return currency;
    } catch (error) {
        console.log("We have a problem with the API get");
    }
  }

  async function getValue() {
    const currency = await getCurrencyApi();
    let clp = document.querySelector("#amount-input").value;
    let clpInput = parseFloat(clp);
    let exchangeCurrency = document.querySelector("#currency-input").value;
    let exchangeOutput = document.querySelector("#result");
    let euroValue = await currency.euro.valor;
    let dollarValue = await currency.dolar.valor;
    console.log("dolar is ",dollarValue)
    if (isNaN(clpInput) || exchangeCurrency === "SELECT") {
        Swal.fire({
            icon: "info",
            title: "Ooops",
            text: "Check the amount or the currency",
          })
    } else if (exchangeCurrency === "EURO") {
        return exchangeOutput.innerHTML = `€ ${(clpInput / euroValue).toFixed(2)}`;
    } else if (exchangeCurrency === "DOLLAR") {
        return exchangeOutput.innerHTML = `$ ${(clpInput / dollarValue).toFixed(2)}`;
    } else {}
  }

  calculate.addEventListener("click", (event) => {
    event.preventDefault();
    getValue();
  });
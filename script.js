document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const amountInput = document.querySelector("#amount");
  const fromCurrency = document.querySelector("#fromCurrency");
  const toCurrency = document.querySelector("#toCurrency");
  const result = document.querySelector("#result");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const amount = parseFloat(amountInput.value);
    const from = fromCurrency.value;
    const to = toCurrency.value;

    if (isNaN(amount) || amount <= 0) {
      result.textContent = "Please enter a valid amount.";
      return;
    }

    fetch(`https://api.exchangerate-api.com/v4/latest/${from}`)
      .then((response) => response.json())
      .then((data) => {
        const rate = data.rates[to];
        if (rate) {
          const convertedAmount = (amount * rate).toFixed(2);
          result.textContent = `${amount} ${from} = ${convertedAmount} ${to}`;
        } else {
          result.textContent = "Currency not supported.";
        }
      })
      .catch((error) => {
        console.error("Error fetching the exchange rate:", error);
        result.textContent = "Unable to fetch exchange rates. Try again later.";
      });
  });
});

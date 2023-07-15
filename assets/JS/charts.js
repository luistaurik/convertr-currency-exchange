const exchangeInput = document.querySelector("#currency-input")

function getLastTenDays() {
  const today = new Date();
  let lastTenDays = [];

  for (let i = 0; i < 10; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    lastTenDays.push(date.toDateString());
  }

  return lastTenDays;
}

euroData = async () => {
  let endPoint1 = "https://mindicador.cl/api/euro"
  try {
      const res = await fetch(endPoint1)
      const data = await res.json()
      const quoteDate = data.serie
      const daysToShow = 10;
      const startIndex = Math.max(quoteDate.length - daysToShow, 0);
      var euroDate = quoteDate.map((value) => {
          const dates = new Date(value.fecha).toDateString()
          return dates
      })
      const quoteValue = data.serie
      const last10days = quoteValue.slice(startIndex)
      var euroQuote = last10days.map((value) => {
          const pastValue = value.valor
          return pastValue
      })
      return { euroQuote, euroDate }
  } catch (error) {
      console.log(error)
  }
}

usdData = async () => {
    let endPoint2 = "https://mindicador.cl/api/dolar"
    try {
        const res = await fetch(endPoint2);
        const data = await res.json();
        const quoteDate = data.serie;
        const daysToShow = 10;
        const startIndex = Math.max(quoteDate.length - daysToShow, 0);
        var usdDates = quoteDate.map((value) => {
            const dates = new Date(value.fecha).toDateString()
            return dates
        })
        const quoteValue = data.serie
        const last10days = quoteValue.slice(startIndex)
        var usdQuote = last10days.map((value) => {
            const pastValue = value.valor
            return pastValue
        })
        return { usdQuote, usdDates }
    } catch (error) {
        console.log(error)
    }
}

async function chartConfig() {
  const chart = document.querySelector("#chart");
  try {
      euro = await euroData();
      usd = await usdData();
  } catch (error) {
  }
  const labels = getLastTenDays();
  const data = {
      labels: labels,
      datasets: [{
          label: "Select currency",
          backgroundColor: "rgb(112, 102, 224)",
          borderColor: "rgb(255, 255, 255)",
          data: ""
      }]
  };
  const config = {
      type: "line",
      data: data,
      options: {
          scales: {
              x: {
                  ticks: {
                      color: "white",
                      beginAtZero: true,
                      maxTicksLimit: 5,
                  }
              },
              y: {
                  ticks: {
                      color: "white",
                  }
              }
          },
          plugins: {
              legend: {
                  labels: {
                      color: "white",
                  }
              }
          },
          elements: {
              point: {
                  backgroundColor: "white",
              }
          },
          layout: {
              padding: {
                  left: 20,
                  right: 20,
                  top: 20,
                  bottom: 20,
              }
          },
          backgroundColor: "rgb(158, 158, 158)"
      }
  };
  const chartRender = new Chart(chart, config);
  chartRender.render();

  exchangeInput.addEventListener("change", updateChart = () => {
        if (exchangeInput.value === "DOLLAR") {
          chartRender.data.datasets[0].label = "USD quote of last days"
          chartRender.data.datasets[0].data = usd.usdQuote
          chartRender.update();
        } else if (exchangeInput.value === "EURO") {
          chartRender.data.datasets[0].label = "EURO quote of last days"
          chartRender.data.datasets[0].data = euro.euroQuote
          chartRender.update();
        } else {
          chartRender.data.datasets[0].label = "No currency reviewed"
          chartRender.data.datasets[0].data = ""
          chartRender.update()
        }
    })
}

document.addEventListener('DOMContentLoaded', (event) => {
  chartConfig();
});


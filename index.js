window.addEventListener("load", () => {
  function updateRecommendationTable(reading) {
    var table = document.getElementById("table");
    if (table.style.display == "none") {
      table.style.display = "block";
    }

    var psiReadingCell = document.getElementById("psiReading");
    psiReadingCell.textContent = "PSI = " + (reading);

    var recommendationCell = document.getElementById("descPsi");
    var cell5 = document.getElementById("descHealthy");
    var cell6 = document.getElementById("descElderly");
    var cell7 = document.getElementById("descDisease");

    if (reading > 100) {
      recommendationCell.textContent = "PSI is HIGH!";
      cell5.textContent =
        "Reduce prolonged or strenuous outdoor physical exertion";
      cell6.textContent =
        "Minimise prolonged or strenuous outdoor physical exertion";
      cell7.textContent =
        "Avoid prolonged or strenuous outdoor physical exertion";
    }

    if (reading > 50 && reading <= 100) {
      recommendationCell.textContent = "Air quality is moderate.";
      cell5.textContent = "Normal activities";
      cell6.textContent = "Normal activities";
      cell7.textContent = "Normal activities";
    }
    if (reading < 50) {
      recommendationCell.textContent = "Air quality is ok.";
      cell5.textContent = "Normal activities";
      cell6.textContent = "Normal activities";
      cell7.textContent = "Normal activities";
    }
    return table;
  }

  function getPsiReadings(region) {
    const apiUrl = "https://api.data.gov.sg/v1/environment/psi";

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        var psi_readings = data.items[0].readings.psi_twenty_four_hourly;
        // console.log(psi_readings);
        var reading = psi_readings[region];
        // console.log(reading);

        var recommendationTable = updateRecommendationTable(reading);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }

  const form = document.getElementById("myForm");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    var region = document.getElementById("location").value;

    getPsiReadings(region);
  });
});

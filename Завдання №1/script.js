fetch('units.json')
    .then(response => response.json())
    .then(data => {
        const unitFromSelect = document.getElementById("unitFrom");
        const unitToSelect = document.getElementById("unitTo");

        data.units.forEach(unit => {
            const option = document.createElement("option");
            option.value = unit.key;
            option.text = unit.label;
            unitFromSelect.appendChild(option);

            const optionCopy = option.cloneNode(true);
            unitToSelect.appendChild(optionCopy);
        });
    });

function saveDataToFile(data) {
    const jsonData = JSON.stringify(data);
    const blob = new Blob([jsonData], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "converted_data.json";
    a.click();

    URL.revokeObjectURL(url);
}

function convertDistance() {
    const inputDistance = parseFloat(document.getElementById("distanceInput").value);
    const unitFrom = document.getElementById("unitFrom").value;
    const unitTo = document.getElementById("unitTo").value;

    if (isNaN(inputDistance) || unitFrom === "" || unitTo === "") {
        document.getElementById("errorMessage").innerText = "Будь ласка, заповніть всі поля коректно.";
        return;
    }

    document.getElementById("errorMessage").innerText = ""; // Очищаємо повідомлення про помилку

    fetch('conversion_rules.json')
        .then(response => response.json())
        .then(data => {
            const conversionRates = data.conversionRates;

            const sourceUnit = unitFrom;
            const targetUnit = unitTo;

            const convertedDistance = inputDistance * conversionRates[sourceUnit][targetUnit];

            const result = {
                unit: targetUnit,
                value: convertedDistance.toFixed(2)
            };

            document.getElementById("result").innerText = `${inputDistance} ${sourceUnit} = ${result.value} ${result.unit}`;

            saveDataToFile(result);
        });
}

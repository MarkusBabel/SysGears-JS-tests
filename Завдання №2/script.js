// Модуль фільтрації
const FiltersModule = (function () {
  function excludeFilter(data, filters) {
    return data.filter((item) => {
      return !filters.some((filter) => {
        return Object.keys(filter).every((key) => {
          return item[key] === filter[key];
        });
      });
    });
  }

  function includeFilter(data, filters) {
    return data.filter((item) => {
      return filters.some((filter) => {
        return Object.keys(filter).every((key) => {
          return item[key] === filter[key];
        });
      });
    });
  }

  return {
    excludeFilter,
    includeFilter,
  };
})();

// Модуль сортування
const SortingModule = (function () {
  function sortBy(data, keys) {
    return data.sort((a, b) => {
      for (const key of keys) {
        if (a[key] < b[key]) return -1;
        if (a[key] > b[key]) return 1;
      }
      return 0;
    });
  }

  return {
    sortBy,
  };
})();

document.addEventListener("DOMContentLoaded", () => {
  const viewButton = document.getElementById("viewButton");
  const jsonInput = document.getElementById("jsonInput");
  const downloadLink = document.getElementById("downloadLink");
  const outputDiv = document.getElementById("output");

  viewButton.addEventListener("click", () => {
    try {
      const inputString = jsonInput.value;
      const inputData = JSON.parse(inputString);

      const jsonData = inputData.data;
      const condition = inputData.condition;

      let filteredData = jsonData;

      if (condition.exclude && Array.isArray(condition.exclude)) {
        filteredData = FiltersModule.excludeFilter(
          filteredData,
          condition.exclude
        );
      }

      if (condition.include && Array.isArray(condition.include)) {
        filteredData = FiltersModule.includeFilter(
          filteredData,
          condition.include
        );
      }

      if (condition.sortBy && Array.isArray(condition.sortBy)) {
        filteredData = SortingModule.sortBy(filteredData, condition.sortBy);
      }

      const result = { result: filteredData };
      const resultString = JSON.stringify(result, null, 2);
      const cleanedResult = resultString.replace(/[\[\]{}"]/g, "");

      const resultDiv = document.createElement("pre");
      resultDiv.textContent = `Вихідні дані:\n${cleanedResult}`;
      outputDiv.innerHTML = "";
      outputDiv.appendChild(resultDiv);

      // Завантаження результату у форматі JSON
      const blob = new Blob([resultString], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      downloadLink.href = url;
      downloadLink.style.display = "block";
      downloadLink.download = "result.json";
    } catch (error) {
      outputDiv.innerHTML = `<p style="color: red;">Помилка обробки JSON: ${error.message}</p>`;
    }
  });
});

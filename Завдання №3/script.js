// Генерація випадкових координат астероїда
function generateAsteroidLocation() {
  const x = Math.floor(Math.random() * 101); // Від 0 до 100
  const y = Math.floor(Math.random() * 101); // Від 0 до 100
  const z = Math.floor(Math.random() * 101); // Від 0 до 100
  return { x, y, z };
}

// Генерація випадкових координат зондів
function generateProbeCoordinates() {
  const probes = [];
  for (let i = 0; i < 3; i++) {
    const x = Math.floor(Math.random() * 101); // Від 0 до 100
    const y = Math.floor(Math.random() * 101); // Від 0 до 100
    const z = Math.floor(Math.random() * 101); // Від 0 до 100
    probes.push({ x, y, z });
  }
  return probes;
}

// Обчислення відстані між точками в тривимірному просторі
function calculateDistance(point1, point2) {
  const dx = point1.x - point2.x;
  const dy = point1.y - point2.y;
  const dz = point1.z - point2.z;
  return Math.sqrt(dx * dx + dy * dy + dz * dz);
}

// Знаходження координат астероїда та кількість зондів
function findAsteroidLocation() {
  const asteroid = generateAsteroidLocation();
  const probes = generateProbeCoordinates();

  let minDistance = Infinity;
  let closestProbe = null;

  for (const probe of probes) {
    const distance = calculateDistance(probe, asteroid);
    if (distance < minDistance) {
      minDistance = distance;
      closestProbe = probe;
    }
  }

  return {
    location: asteroid,
    probes: { count: probes.length, coordinates: probes },
    closestProbe,
  };
}

// Виведення результату на сторінку
function displayResult() {
  const result = findAsteroidLocation();
  const output = document.getElementById("output");
  const calculations = document.getElementById("calculations");
  const space = document.getElementById("space");

  output.innerHTML = `
      <p><strong>Asteroid Location:</strong> x: ${result.location.x}, y: ${
    result.location.y
  }, z: ${result.location.z}</p>
      <p><strong>Closest Probe:</strong> x: ${result.closestProbe.x}, y: ${
    result.closestProbe.y
  }, z: ${result.closestProbe.z}</p>
      <p><strong>Number of Probes:</strong> ${result.probes.count}</p>
      <p><strong>Probe Coordinates:</strong> ${JSON.stringify(
        result.probes.coordinates
      )}</p>
    `;

  calculations.innerHTML = `
      <p><strong>Calculations:</strong></p>
      <p>Distance from Probe 1: ${calculateDistance(
        result.probes.coordinates[0],
        result.location
      )}</p>
      <p>Distance from Probe 2: ${calculateDistance(
        result.probes.coordinates[1],
        result.location
      )}</p>
      <p>Distance from Probe 3: ${calculateDistance(
        result.probes.coordinates[2],
        result.location
      )}</p>
    `;

  // Відображення графічного зображення
  const asteroidElem = document.createElement("div");
  asteroidElem.className = "object";
  asteroidElem.id = "asteroid";
  asteroidElem.style.left = result.location.x + "px";
  asteroidElem.style.top = result.location.y + "px";
  space.appendChild(asteroidElem);

  for (let i = 0; i < result.probes.coordinates.length; i++) {
    const probeElem = document.createElement("div");
    probeElem.className = "object probe";
    probeElem.style.left = result.probes.coordinates[i].x + "px";
    probeElem.style.top = result.probes.coordinates[i].y + "px";
    space.appendChild(probeElem);
  }
}

const findButton = document.getElementById("findButton");
findButton.addEventListener("click", displayResult);

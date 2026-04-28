let batches = [];

// ADD BATCH
function addBatch() {
  const bottles = document.getElementById("bottles").value;
  const size = document.getElementById("size").value;

  if (!bottles || !size) {
    alert("Please enter bottles and size");
    return;
  }

  batches.push({
    bottles: Number(bottles),
    size: Number(size),
    remaining: Number(bottles) * Number(size),
    sales: []
  });

  renderBatches();
}

// RENDER
function renderBatches() {
  const container = document.getElementById("batchesContainer");
  container.innerHTML = "";

  batches.forEach((batch, index) => {
    const div = document.createElement("div");

    div.innerHTML = `
      <h3>Batch ${index + 1}</h3>
      <p>${batch.bottles} × ${batch.size}L</p>
      <p>Remaining: ${batch.remaining}L</p>

      <input id="name-${index}" placeholder="Customer">
      <input id="litres-${index}" type="number" placeholder="Litres">
      <input id="price-${index}" type="number" placeholder="Price">

      <button onclick="sell(${index})">Record Sale</button>

      <ul id="sales-${index}"></ul>
    `;

    container.appendChild(div);
  });
}

// SELL
function sell(index) {
  const name = document.getElementById(`name-${index}`).value;
  const litres = Number(document.getElementById(`litres-${index}`).value);
  const price = Number(document.getElementById(`price-${index}`).value);

  if (!name || !litres || !price) {
    alert("Fill all fields");
    return;
  }

  const batch = batches[index];

  if (litres > batch.remaining) {
    alert("Not enough stock!");
    return;
  }

  const total = litres * price;

  batch.remaining -= litres;
  batch.sales.push({ name, litres, price, total });

  const url =
    "https://script.google.com/macros/s/AKfycbyF4mN0umsrSU3foFfg42H57PM3YtRms6IR1eoaGaL4BVBB2evfpIK_0SeJuVrSo9M5/exec"
    + `?batch=${batch.bottles}x${batch.size}L`
    + `&customer=${name}`
    + `&litres=${litres}`
    + `&price=${price}`
    + `&total=${total}`;

  fetch(url);

  alert("Sale recorded ✔");
  renderBatches();
}
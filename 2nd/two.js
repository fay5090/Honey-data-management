let batches = [];

// ADD NEW BATCH
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

// RENDER BATCHES
function renderBatches() {
  const container = document.getElementById("batchesContainer");
  container.innerHTML = "";

  batches.forEach((batch, index) => {
    const div = document.createElement("div");
    div.className = "batch";

    div.innerHTML = `
      <h3>Batch ${index + 1}</h3>
      <p>${batch.bottles} bottles × ${batch.size}L</p>
      <div>Remaining: ${batch.remaining}L</div>

      <input id="name-${index}" placeholder="Customer name">
      <input id="litres-${index}" type="number" placeholder="Litres sold">
      <input id="price-${index}" type="number" placeholder="Price per litre">

      <button onclick="sell(${index})">Record Sale</button>

      <ul id="sales-${index}"></ul>
    `;

    container.appendChild(div);

    const list = div.querySelector(`#sales-${index}`);
    batch.sales.forEach(sale => {
      const li = document.createElement("li");
      li.textContent = `${sale.name} bought ${sale.litres}L = ${sale.total}`;
      list.appendChild(li);
    });
  });
}

// SELL FUNCTION (FIXED)
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

  // 🚀 SEND TO GOOGLE SHEETS (WORKING VERSION)
  fetch("https://script.google.com/macros/s/AKfycbyF4mN0umsrSU3foFfg42H57PM3YtRms6IR1eoaGaL4BVBB2evfpIK_0SeJuVrSo9M5/exec", {
    method: "POST",
    body: new URLSearchParams({
      batch: `${batch.bottles}x${batch.size}L`,
      customer: name,
      litres: litres,
      price: price,
      total: total
    })
  })
  .catch(err => console.log("Error:", err));

  alert("Sale recorded ✔");

  renderBatches();
}
let batches = [];

// ADD NEW BATCH
function addBatch() {
  const bottles = document.getElementById("bottles").value;
  const size = document.getElementById("size").value;

  if (!bottles || !size) {
    alert("Please enter bottles and size");
    return;
  }

  const batch = {
    bottles: Number(bottles),
    size: Number(size),
    remaining: Number(bottles) * Number(size),
    sales: []
  };

  batches.push(batch);
  renderBatches();
}

// DISPLAY ALL BATCHES
function renderBatches() {
  const container = document.getElementById("batchesContainer");
  container.innerHTML = "";

  batches.forEach((batch, index) => {
    const div = document.createElement("div");
    div.className = "batch";

    div.innerHTML = `
      <h3>Batch ${index + 1}</h3>
      <p>${batch.bottles} bottles × ${batch.size}L</p>
      <div class="remaining">Remaining: ${batch.remaining}L</div>

      <input type="text" placeholder="Customer name" id="name-${index}">
      <input type="number" placeholder="Litres sold" id="litres-${index}">
      <input type="number" placeholder="Price per litre" id="price-${index}">
      <button onclick="sell(${index})">Record Sale</button>

      <ul id="sales-${index}"></ul>
    `;

    container.appendChild(div);

    // SHOW SALES HISTORY
    const list = div.querySelector(`#sales-${index}`);
    batch.sales.forEach(sale => {
      const li = document.createElement("li");
      li.textContent = `${sale.name} bought ${sale.litres}L for ${sale.total}`;
      list.appendChild(li);
    });
  });
}

// RECORD SALE
function sell(index) {
  const name = document.getElementById(`name-${index}`).value;
  const litres = document.getElementById(`litres-${index}`).value;
  const price = document.getElementById(`price-${index}`).value;

  if (!name || !litres || !price) {
    alert("Fill all fields");
    return;
  }

  const batch = batches[index];
  const litresNum = Number(litres);
  const priceNum = Number(price);
  const total = litresNum * priceNum;

  if (litresNum > batch.remaining) {
    alert("Not enough stock!");
    return;
  }

  batch.remaining -= litresNum;

  batch.sales.push({
    name: name,
    litres: litresNum,
    price: priceNum,
    total: total
  });

  // OPTIONAL: send to Google Sheets (SAFE version)
  fetch("https://script.google.com/macros/s/AKfycbyF4mN0umsrSU3foFfg42H57PM3YtRms6IR1eoaGaL4BVBB2evfpIK_0SeJuVrSo9M5/exec", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      batch: `${batch.bottles}x${batch.size}L`,
      customer: name,
      litres: litresNum,
      price: priceNum,
      total: total
    })
  })
  .catch(err => console.log("Fetch error:", err));

  renderBatches();
}
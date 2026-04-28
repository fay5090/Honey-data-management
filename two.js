let batches = [];

function addBatch() {
  let bottles = document.getElementById("bottles").value;
  let size = document.getElementById("size").value;

  if (!bottles || !size) {
    alert("Enter bottles and size");
    return;
  }

  let batch = {
    bottles: Number(bottles),
    size: Number(size),
    remaining: Number(bottles) * Number(size),
    sales: []
  };

  batches.push(batch);
  renderBatches();
}

function renderBatches() {
  let container = document.getElementById("batchesContainer");
  container.innerHTML = "";

  batches.forEach((batch, index) => {
    let div = document.createElement("div");
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
  });
}

function sell(index) {
  let name = document.getElementById(`name-${index}`).value;
  let litres = document.getElementById(`litres-${index}`).value;
  let price = document.getElementById(`price-${index}`).value;

  if (!name || !litres || !price) {
    alert("Fill all fields");
    return;
  }

  let total = Number(litres) * Number(price);

  let batch = batches[index];

  if (litres > batch.remaining) {
    alert("Not enough stock!");
    return;
  }

  batch.remaining -= litres;

  batch.sales.push({
    name,
    litres,
    price,
    total
  });

  // SEND TO GOOGLE SHEETS
  fetch("https://script.google.com/macros/s/AKfycbyvkUqRK-gsNep0FKWmEQ9WauphmzxqPnFu8X4b2l_SkOscDtfIdcu2Xq8bAd8_Sw/exec", {
    method: "POST",
    body: JSON.stringify({
      batch: `${batch.bottles}x${batch.size}L`,
      customer: name,
      litres: Number(litres),
      price: Number(price),
      total: total
    })
  });

  renderBatches();
}

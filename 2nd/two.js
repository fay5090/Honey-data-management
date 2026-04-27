let batches = JSON.parse(localStorage.getItem("batches")) || [];

/* ADD NEW BATCH */
function addBatch() {
  let bottles = Number(document.getElementById("bottles").value);
  let size = Number(document.getElementById("size").value);

  if (!bottles || !size) {
    alert("Fill all fields!");
    return;
  }

  let batch = {
    id: Date.now(),
    bottles,
    size,
    remaining: bottles * size,
    sales: []
  };

  batches.push(batch);
  localStorage.setItem("batches", JSON.stringify(batches));

  document.getElementById("bottles").value = "";
  document.getElementById("size").value = "";

  updateUI();
}

/* ADD SALE */
function addSale(batchId) {
  let name = prompt("Customer name:");
  let litres = Number(prompt("How many litres?"));
  let price = Number(prompt("Price per litre (default 1500):")) || 1500;

  if (!name || !litres) return;

  let batch = batches.find(b => b.id === batchId);

  if (litres > batch.remaining) {
    alert("Not enough stock!");
    return;
  }

  let sale = {
    name,
    litres,
    total: litres * price
  };

  batch.sales.push(sale);
  batch.remaining -= litres;

  localStorage.setItem("batches", JSON.stringify(batches));
  updateUI();
}

/* DISPLAY EVERYTHING */
function updateUI() {
  let container = document.getElementById("batchesContainer");
  container.innerHTML = "";

  batches.forEach(batch => {
    let div = document.createElement("div");
    div.className = "batch";

    div.innerHTML = `
      <h3>Batch: ${batch.bottles} bottles × ${batch.size}L</h3>
      <div class="remaining">Remaining: ${batch.remaining} L</div>
      <button onclick="addSale(${batch.id})">+ Add Sale</button>

      <ul>
        ${batch.sales.map(s => 
          `<li>${s.name} bought ${s.litres}L — Ksh ${s.total}</li>`
        ).join("")}
      </ul>
    `;

    container.appendChild(div);
  });
}

/* LOAD */
updateUI();
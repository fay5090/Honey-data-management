let imports = JSON.parse(localStorage.getItem("imports")) || [];
let sales = JSON.parse(localStorage.getItem("sales")) || [];

function addImport() {
  let qty = Number(document.getElementById("importQty").value);

  if (!qty) return alert("Enter quantity!");

  imports.push(qty);
  localStorage.setItem("imports", JSON.stringify(imports));

  document.getElementById("importQty").value = "";
  updateUI();
}

function addSale() {
  let name = document.getElementById("customer").value;
  let qty = Number(document.getElementById("saleQty").value);

  if (!name || !qty) return alert("Fill all fields!");

  sales.push({ name, qty });
  localStorage.setItem("sales", JSON.stringify(sales));

  document.getElementById("customer").value = "";
  document.getElementById("saleQty").value = "";

  updateUI();
}

function updateUI() {
  let totalImports = imports.reduce((a, b) => a + b, 0);
  let totalSales = sales.reduce((a, s) => a + s.qty, 0);

  let stock = totalImports - totalSales;

  document.getElementById("stock").innerText =
    "Remaining: " + stock + " kg";

  let list = document.getElementById("salesList");
  list.innerHTML = "";

  sales.forEach(s => {
    let li = document.createElement("li");
    li.textContent = `${s.name} bought ${s.qty} kg`;
    list.appendChild(li);
  });
}

updateUI();
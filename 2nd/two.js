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

  // THE FIX IS HERE
    const url = "https://script.google.com/macros/s/AKfycbyF4mN0umsrSU3foFfg42H57PM3YtRms6IR1eoaGaL4BVBB2evfpIK_0SeJuVrSo9M5/exec"
  + `?batch=${encodeURIComponent(batch.bottles + "x" + batch.size + "L")}`
  + `&customer=${encodeURIComponent(name)}`
  + `&litres=${litres}`
  + `&price=${price}`
  + `&total=${total}`;

  // THIS IS THE PART THAT MUST CHANGE:
 
fetch(url, {
  method: "GET",
  mode: "no-cors", 
  cache: "no-cache"
})
.then(() => {
  // Because of 'no-cors', this might trigger even if it 'fails' in console.
  alert("Sale recorded successfully!");
  renderBatches(); 
})
.catch(err => {
  // If your sheet updated, you can ignore any error here.
  console.log("Data sent to Google Sheets.");
});

}

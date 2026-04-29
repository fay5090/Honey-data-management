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
  const url = "https://script.google.com/macros/s/AKfycbwLws4Ve9UWKinyH6cSqNyd9oBiQ71es1_0E4-sFOlmOUeX7Q-BmPw5DjHIfn4rWugH/exec"
  + `?batch=${encodeURIComponent(batch.bottles + "x" + batch.size + "L")}`
  + `&customer=${encodeURIComponent(name)}`
  + `&litres=${litres}`
  + `&price=${price}`
  + `&total=${total}`;

  // Updated fetch with proper settings to stop the CORS error
   fetch(url, {
  method: "GET",
  mode: "no-cors",
  credentials: "omit"
})
.then(() => {
  alert("Sale recorded! Check your spreadsheet.");
  renderBatches(); 
})
.catch(err => console.log("Ignore this error if data arrived:", err));

}

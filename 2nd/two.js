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
    method: 'GET',
    mode: 'no-cors', // This tells the browser: "Don't worry about the response, just send it."
  })
  .then(() => {
    alert("Sale recorded and sent to Sheets!");
    renderBatches(); // Refresh the screen
  })
  .catch(err => {
    console.error("Error sending data:", err);
    alert("Failed to send data to Sheets.");
  });
}

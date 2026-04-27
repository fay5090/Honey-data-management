let total = litres * price;

fetch("https://script.google.com/macros/s/AKfycbyvkUqRK-gsNep0FKWmEQ9WauphmzxqPnFu8X4b2l_SkOscDtfIdcu2Xq8bAd8_Sw/exec", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    batch: batch.bottles + "x" + batch.size + "L",
    customer: name,
    litres: litres,
    price: price,
    total: total
  })
});

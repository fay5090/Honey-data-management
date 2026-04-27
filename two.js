let total = Number(litres) * Number(price);

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

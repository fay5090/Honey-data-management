function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  var data = JSON.parse(e.postData.contents);

  sheet.appendRow([
    new Date(),
    data.batch,
    data.customer,
    data.litres,
    data.price,
    data.total
  ]);

  return ContentService
    .createTextOutput("Success")
    .setMimeType(ContentService.MimeType.TEXT);
}

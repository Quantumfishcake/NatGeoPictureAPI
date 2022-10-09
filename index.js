const express = require("express");
const puppeteer = require("puppeteer");
const app = express();

//CORS- ISSUE SORTED
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, PATCH, DELETE, OPTIONS");
  next();
});

app.get("/", async function (req, res) {
  var img = "";
  var json = [];
  const browser = await puppeteer.launch({
    headless: true,
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 1200 });
  await page.goto(
    "https://www.nationalgeographic.com/photo-of-the-day"
  );

  const IMAGE_SELECTOR = "div.Gallery img.Gallery__Image";
  let imageHref = await page.evaluate((sel) => {
    return document.querySelector(sel).getAttribute("src")
  }, IMAGE_SELECTOR);

  console.log(imageHref);
  browser.close();
  json.push(imageHref);
  res.send(json);
});
app.listen("8000");
console.log("API is running on http://localhost:8000");
module.exports = app;

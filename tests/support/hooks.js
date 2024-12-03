const {
  Before,
  After,
  AfterStep,
  Status,
  BeforeAll,
  AfterAll,
} = require("@cucumber/cucumber");
const path = require("path");
const { chromium } = require("playwright");
const { POManager } = require("../page_Objects/POManager");
const fs = require("fs");
const logger = require('../logger/logger.js');
const options = {
  slowMo: 10000,
  ignoreHTTPSErrors: true,
};


let browser;
let context;
let page;
let pomanage;

BeforeAll(async function () {
  browser = await chromium.launch({ headless: false });
  context = await browser.newContext();
  page = await context.newPage();
});
Before(async function () {
  this.page = page;
  pomanage = await new POManager(this.page);
  this.pomanage = pomanage;
});

AfterAll(async function () {
  if (browser) {
    await browser.close();
  }
});

AfterStep(async function ({ result }) {
  const screenshotFolder = path.join(__dirname, "screenshots");
  if (!fs.existsSync(screenshotFolder)) {
    fs.mkdirSync(screenshotFolder);
  }
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const fileName = `screenshot_${timestamp}.png`;
  await page.screenshot({ path: path.join(screenshotFolder, fileName) });
  if (result.status == Status.FAILED) {
    //await this.page.screenshot({path:'screenshot1.png'});
    await this.page.screenshot({ path: path.join(screenshotFolder, fileName) });
  }
});

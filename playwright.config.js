// @ts-check
const { devices } = require('@playwright/test');
const { on } = require('events');


const config ={
testDir: './tests',
timeout: 30 * 1000,
expect: {

  timeout: 5000
},
reporter: [
  ["line"],
  [
    "allure-playwright",
    {
      resultsDir: "allure-results",
    },
  ],
],

use:
{
  browserName : 'chromium',
  headless : true,
  screenshot : 'on',
  trace:'on'
},




};
module.exports = config;



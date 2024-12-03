const { Given, When, Then } = require("@cucumber/cucumber");
const { POManager } = require("../../page_Objects/POManager");
require("../../support/hooks");
let logOutPag;
Given("Admin is logged into the appilcation", async function () {
  logOutPag = await this.pomanage.getlogOutPage();
  await logOutPag.urLandlogin();
  console.log("Admin is able to login to application");
});

Given("Admin is in dashboard page", async function () {
  await logOutPag.logoutDashboard();
});

When("Admin clicks on the logout in the menu bar",  {timeout: 2 * 3000},async function () {
  await logOutPag.logoutbutton();
});

Then("Admin should be redirected to login page", {timeout: 2 * 3000}, async function () {
  await logOutPag.redirectToLogin();
});

Given("Admin is logged out of the application", async function () {
  await logOutPag.urLandlogin();
});

When("Admin clicks  browser back button",  {timeout: 2 * 3000},async function () {
  await logOutPag.Browserback();
});

Then("Admin should receive error message",  {timeout: 2 * 3000},async function () {
  await logOutPag.errorMessageForbrowserback();
});

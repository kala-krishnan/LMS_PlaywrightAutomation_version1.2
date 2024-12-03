const { test, expect } = require("@playwright/test");
const { Given, When, Then } = require("@cucumber/cucumber");
const { POManager } = require("../../page_Objects/POManager");

let dashboardPag;

Given("Admin gives correct LMS portal", async function () {
  dashboardPag = await this.pomanage.getDashboardPage();
  await dashboardPag.launchURL();
});

When(
  "Admin enter valid credentials and clicks login button",
  async function () {
    await dashboardPag.validLoginCredentials();
  }
);

Then("Admin should see dashboard", async function () {
  await dashboardPag.admininDashboard();
});

Then(
  "Admin must see {string} name  in this {string} place",
  async function (name, position1) {
    await dashboardPag.dashboardMenuOrderforProgram(name, position1);
  }
);

Then(
  "Admin able to see {string} name  in this {string} place",
  async function (name2, position2) {
    await dashboardPag.dashboardMenuOrderforBatch(name2, position2);
  }
);

Then(
  "Admin should see the {string} name  in this {string} place",
  async function (name3, position3) {
    await dashboardPag.dashboardMenuOrderforClass(name3, position3);
  }
);

Then(
  "Admin  see {string} name  in this {string} place",
  async function (name4, position4) {
    await dashboardPag.dashboardMenuOrderforlogout(name4, position4);
  }
);

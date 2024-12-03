const { test, expect } = require("@playwright/test");

class dashboardPage {
  constructor(page) {
    //constructor is for synchronous properties ..to use await for the locators we have to create
    //a async function explicitly and use await this.page.locator

    this.page = page;
  }
  async launchURL() {
    await this.page.goto(
      "https://playwright-frontend-app-a9ea85794ad9.herokuapp.com/login"
    );
  }

  async validLoginCredentials() {
    this.username = await this.page.locator("#username");
    this.password = await this.page.locator("#password");
    this.loginButton = await this.page.locator("#login");
    await this.username.fill("playwrightuser@gmail.com");
    await this.password.fill("Playwright@1234");
    await this.loginButton.click();
  }

  async admininDashboard() {
    const toolbar = this.page.locator(
      ".mat-toolbar.mat-primary.mat-toolbar-single-row.ng-star-inserted"
    );

    // Validate that the toolbar is visible
    await expect(toolbar).toBeVisible();
    console.log("Admin is in dashboard page ");
  }

  async dashboardMenuOrderforProgram(name, position1) {
    const menuText = await this.page
      .getByText("LMS - Learning Management System ProgramBatchClassLogout")
      .textContent();

    const extractedItems = menuText
      .replace("LMS - Learning Management System", "")
      .trim()
      .split(/(?=[A-Z])/);

    if(true) {
      expect(extractedItems[0]).toBe(name);
      console.log("Program is in the " + position1 + "position");
    } else {
      console.log("its not the required position ");
    }
  }

  async dashboardMenuOrderforBatch(name2, position2) {
    const menuText = await this.page
      .getByText("LMS - Learning Management System ProgramBatchClassLogout")
      .textContent();
    const extractedItems = menuText
      .replace("LMS - Learning Management System", "")
      .trim()
      .split(/(?=[A-Z])/);
    if(true){
      expect(extractedItems[1]).toBe(name2);
      console.log("Batch is in the " + position2 + "position");
    } else {
      console.log("its not the required position ");
    }
  }
  async dashboardMenuOrderforClass(name2, position2) {
    const menuText = await this.page
      .getByText("LMS - Learning Management System ProgramBatchClassLogout")
      .textContent();
    const extractedItems = menuText
      .replace("LMS - Learning Management System", "")
      .trim()
      .split(/(?=[A-Z])/);
    if(true) {
      expect(extractedItems[2]).toBe(name2);
      console.log("Class is in the " + position2 + "position");
    } else {
      console.log("its not the required position ");
    }
  }
  async dashboardMenuOrderforlogout(name3, position3) {
    const menuText = await this.page
      .getByText("LMS - Learning Management System ProgramBatchClassLogout")
      .textContent();
    const extractedItems = menuText
      .replace("LMS - Learning Management System", "")
      .trim()
      .split(/(?=[A-Z])/);
if(true){
    expect(extractedItems[3]).toBe(name3);
    console.log("logout is in the " + position3 + "position");
}
else {
  console.log("its not the required position ");
}
  }
}

module.exports = { dashboardPage };

const { test, expect } = require("@playwright/test");

class logOutPage {
  constructor(page) {
    this.page = page;
  }
async urLandlogin()
{
  await this.page.goto("https://playwright-frontend-app-a9ea85794ad9.herokuapp.com/login");
  this.username = await this.page.locator("#username");
  this.password = await this.page.locator("#password");
  this.loginButton = await this.page.locator("#login");
  await this.username.fill("playwrightuser@gmail.com");
  await this.password.fill("Playwright@1234");
  await this.loginButton.click();
}

async logoutDashboard()
{
  const toolbar = this.page.locator(
    ".mat-toolbar.mat-primary.mat-toolbar-single-row.ng-star-inserted"
  );

  // Validate that the toolbar is visible
  await expect(toolbar).toBeVisible();
  console.log("Admin is in dashboard page ");
}

async logoutbutton()
{
  await this.page.getByRole('button', { name: 'Logout' }).click();
  console.log("Admin clicked login button");
}

async redirectToLogin()
{
  console.log("verify login page ");
      this.titleLocator =await  this.page.locator("//mat-toolbar[@class='mat-toolbar mat-primary mat-toolbar-single-row ng-star-inserted']/span[1]");
        console.log(await this.titleLocator.textContent());
        await expect(await this.titleLocator).toContainText(' LMS - Learning Management System ');
}

async Browserback()
{
 //to go to previous page or hit back in browser 
  await this.page.evaluate(() => window.history.back());
  await this.page.waitForNavigation();
  console.log("admin has click the browser back button ");

}

async errorMessageForbrowserback()
{

   try{
  await this.page.waitForNavigation(); 
    console.log('Back navigation completed. Current URL:', this.page.url());
} 

 catch (error) {
console.error('Error message :', error.message);
}
}

}

module.exports={logOutPage};

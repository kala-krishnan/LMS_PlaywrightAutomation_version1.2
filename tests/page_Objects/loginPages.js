const{test,expect} = require('@playwright/test')
class loginPage
{
    constructor(page)
    {
        this.page = page;
        this.userName = this.page.locator("#username");
        this.passWord = this.page.locator("#password");
        this.loginButton = this.page.locator("#login");
        this.titleLocator = this.page.locator("//mat-toolbar[@class='mat-toolbar mat-primary mat-toolbar-single-row ng-star-inserted']/span[1]");

    }

    async gotoLoginPage()
    {
        await this.page.goto('https://playwright-frontend-app-a9ea85794ad9.herokuapp.com/login');
        console.log(await this.page.locator('.ng-untouched p').textContent());
    }

    async validLoginScenario(userName,passWord)
    {
        await this.userName.fill(userName);
        await this.passWord.fill(passWord);
        await this.loginButton.click();
    }

    async verifyTitlePage()
    {
        console.log(await this.titleLocator.textContent());
        await expect(await this.titleLocator).toContainText(' LMS - Learning Management System ');
    }

}
module.exports={loginPage};
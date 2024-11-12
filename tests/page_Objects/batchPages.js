const{test,expect} = require('@playwright/test')

class batchPage
{
    constructor(page)
    {
    this.page=page;
    this.batchMenu = this.page.locator("//span[normalize-space()='Batch']");
    this.manageBatchTitle = this.page.locator("//div[normalize-space()='Manage Batch']");
    this.clickAddBatchMenuButton = this.page.locator("(//button[normalize-space()='Add New Batch'])[1]");
    this.getAddBatchPageTitle = this.page.locator("#pr_id_9-label");
    this.clickSelectButton = this.page.locator("//input[@placeholder='Select a Program name']");   
    this.batchProgId = this.page.locator("(//input[@id='batchName'])[1]");
    this.batchDesc = this.page.locator("#batchDescription");
    this.batchactiveButton = this.page.locator("(//p-radiobutton[@ng-reflect-input-id='ACTIVE'])[1]");
    this.batchNoofClasses = this.page.locator("#batchNoOfClasses");
    this.saveButton = this.page.locator("//button[@label='Save']");

}
    async clickBatchMenu()
    {

        await this.page.locator("//span[normalize-space()='Batch']").click();
        /*await this.page.waitForLoadState('domcontentloaded');
        await this.batchMenu.waitFor({ timeout: 10000 });
        await this.batchMenu.click(); */
    }
    async getManageBatchTitle()
    {
        await expect(await this.manageBatchTitle).toContainText(' Manage Batch');
       
    }
    async clickAddBatchButton()
    {
        /*await this.page.waitForLoadState('domcontentloaded');
        await this.clickAddBatchMenuButton.waitFor({ timeout: 10000 });*/
       await this.clickAddBatchMenuButton.click();
    }
    async getAddBatchPageTitleName()
    {
       // await this.page.waitForLoadState('domcontentloaded'); 
        await expect(await this.getAddBatchPageTitle).toContainText('Batch Details');
    }
    async validAddBatchDetails()
    {

        await this.clickSelectButton.type('Core Java Program');
       // await this.selctOneProgramOption.getByText('Core Java Program').click();
      

       await this.batchProgId.fill('DEV001');
       await this.batchDesc.fill('Developer');
       await this.batchactiveButton.click();
        await this.batchNoofClasses.fill('1');
        await this.saveButton.click();




    }
}
module.exports={batchPage};
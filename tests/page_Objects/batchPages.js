const{test,expect} = require('@playwright/test')
const{CommonUtils} = require("../Utils/CommonUtils.js")


class batchPage
{
    constructor(page)
    {
    this.page=page;
    if (!this.CommonUtils) {
        this.CommonUtils = new CommonUtils(this.page);
        }
    
    const mess ="";
    
    this.batchMenu = this.page.locator("//span[normalize-space()='Batch']");
    this.manageBatchTitle = this.page.locator("//mat-card-title[@class='mat-card-title']");
    this.clickAddBatchMenuButton = this.page.locator("//button[normalize-space()='Add New Batch']");
    this.getAddBatchPageTitle = this.page.locator("//span[@id='pr_id_2-label']");
    this.clickSelectButton = this.page.locator("(//div[@role='button'])[1]");  
  
    this.getEditBatchPageTitle=this.page.locator("//span[@id='pr_id_229-label']");
    this.batchProgId = this.page.locator("(//input[@id='batchName'])[1]");
    this.batchDesc = this.page.locator("#batchDescription");
    this.batchactiveButton = this.page.locator("(//p-radiobutton[@ng-reflect-input-id='ACTIVE'])[1]");
    this.batchNoofClasses = this.page.locator("#batchNoOfClasses");
    this.saveButton = this.page.locator("//button[@label='Save']");
    this.batchProgName=this.page.locator('//input[@id="batchProg"]');
    this.editbatchProgName=this.page.locator('//input[@id="programName"]'); 
    this.editbatchName=this.page.locator('//input[@id="batchName"]');
    this.deleteBatchYes = this.page.locator("//button[normalize-space()='Yes']");
   
   // this.cilentErrorMessage = this.page.locator("//small[@class='p-invalid ng-star-inserted'])");

}

async launchurl()
{
    await this.page.goto("https://playwright-frontend-app-a9ea85794ad9.herokuapp.com/login");
}
    async clickBatchMenu()
    {
        await this.page.locator("//span[normalize-space()='Batch']").click();
    }
    async getManageBatchTitle()
    {
         expect(await this.manageBatchTitle.textContent()).toContain(' Manage Batch'); 
    }
    async checkBatchNameDisable()
    {
        await expect(await this.batchProgName).toHaveAttribute('readonly', '');
   
    }
    async clickAddBatchButton()
    {
       await this.clickAddBatchMenuButton.click();
    }
    async getAddBatchPageTitleName()
    {
        await expect(await this.getAddBatchPageTitle).toMatch('Batch Details');
    }
    async getFieldName(fieldName)
    { 
        const fields = await page.locator('label:has-text("'+fieldName+'")').textContent();
        console.log(fields.trim());
  
       return fields.trim();

      // const fieldTitle =  await this.page.getByText(fieldName);
       
      // return fieldTitle.textContent();
    }
    async validAddBatchDetails(programName,batchProgId,batchDesc,batchActive,batchNoofclass)
    {
        
        if(programName)
        {
            await this.clickSelectButton.click();
        await this.page.locator("li[aria-label='"+programName+"']").click();
        }
        await this.page.waitForTimeout(1000);
  
        await this.batchProgId.fill(batchProgId);
        await this.batchDesc.fill(batchDesc);
        await this.batchactiveButton.click();
        await this.batchNoofClasses.fill(batchNoofclass);
        await this.saveButton.click();
        const clientErrors = await this.page.locator("//small[@class='p-invalid ng-star-inserted']").all();

        if(clientErrors.length > 0)
        {
            for(const error of clientErrors)
            {
                console.log(await error.textContent());
                expect(await error.textContent()).toBeTruthy();
                return error.textContent();
            }
        }
        //await this.page.waitForTimeout(1000);
        await this.page.locator("//div[contains(@class, 'p-toast-detail')]").waitFor({ state: 'visible', timeout: 5000 });

        const serverErrors =await this.page.locator("//div[contains(@class, 'p-toast-detail')]");
        await serverErrors.waitFor({ state: 'visible', timeout: 5000 });
        console.log(await serverErrors.textContent());
       /* if(serverErrors.length>0)
        {
            console.log('Batch');
            console.log(await serverErrors.textContent());*/
            expect(await serverErrors.textContent()).toBeTruthy();
            return serverErrors.textContent();
       // }

    }
    async clickEditBatchButton(editValue)
    {
        await this.page.waitForTimeout(2000);
       await this.CommonUtils.getListOfElements(editValue,'Edit');
    }
    async getEditBatchDetailsTitle()
    {
        await expect(await this.getEditBatchPageTitle).toMatch('Batch Details');
    }
    async checkNonEditableProgramAndBatch()
    {
        if(( expect(await this.editbatchProgName).toHaveAttribute('readonly', ''))&&(( expect(await this.editbatchName).toHaveAttribute('readonly', ''))))
        {
            return true;
        }
        return false;
    }
    async updateBatchDetails(batchDesc,batchActive,batchNoofclass)
   {
  //  await this.batchProgId.fill(batchProgId);
    await this.batchDesc.fill(batchDesc);
    await this.batchactiveButton.click();
    await this.batchNoofClasses.fill(batchNoofclass);
    await this.saveButton.click();
    const clientErrors = await this.page.locator("//small[@class='p-invalid ng-star-inserted']").all();

    if(clientErrors.length > 0)
    {
        for(const error of clientErrors)
        {
            console.log(await error.textContent());
            expect(await error.textContent()).toBeTruthy();
            return error.textContent();
        }
    }
    //await this.page.waitForTimeout(1000);
    await this.page.locator("//div[contains(@class, 'p-toast-detail')]").waitFor({ state: 'visible', timeout: 5000 });

    const serverErrors =await this.page.locator("//div[contains(@class, 'p-toast-detail')]");
    await serverErrors.waitFor({ state: 'visible', timeout: 5000 });
    console.log(await serverErrors.textContent());
   /* if(serverErrors.length>0)
    {
        console.log('Batch');
        console.log(await serverErrors.textContent());*/
        expect(await serverErrors.textContent()).toBeTruthy();
        return serverErrors.textContent();

   }
   async clickDeleteBatchButton(deleteValue)
    {
        await this.page.waitForTimeout(2000);
       await this.CommonUtils.getListOfElements(deleteValue,'Delete');
    }
    async clickYesDeleteButton()
    {
        await this.page.waitForTimeout(2000);
        await this.deleteBatchYes.click();
    }

    async validLoginScenarioforbatch(userName,passWord)
    {
      this.username =  await this.page.locator("#username");
      this.password = await this.page.locator("#password");
      this.loginButton = await this.page.locator("#login");
        await this.username.fill(userName);
        await this.password.fill(passWord);
        await this.loginButton.click();
       
       
    }

}

module.exports={batchPage};
const { Given, When, Then } = require('@cucumber/cucumber');


    Given('Admin is on the Dashboard page', async function () {
      this.loginPag = this.pomanage.getLoginPage();
      this.batchPag = this.pomanage.getBatchPage();
      await this.loginPag.verifyTitlePage();
  });
  When('Admin clicks Batch on the Menu from the header',{ timeout: 10000 }, async function () {
   await this.batchPag.clickBatchMenu();
  });
  //Then('Admin should be in the Manage Batch Page', async function () {
    //const manageBatchTitle = await this.batchPag.getManageBatchTitle();
  //});
  When('Admin clicks on {string} under the {string} menu bar', async function (string, string2) {
    await this.batchPag.clickAddBatchButton();
  });
  /*Then('Admin should see the Batch Details pop up window', async function () {
    await this.batchPag.getAddBatchPageTitleName();
  });
  Given('Admin is on the Batch Details Pop Up WIndow', async function () {
    //await this.batchPag.getAddBatchPageTitleName();
  });*/
  When('Admin enters the valid data to all the mandatory fields and click save button',async function () {
    await this.batchPag.validAddBatchDetails();
  });
  Then('Admin should get a succesesful message', function () {
  
  });
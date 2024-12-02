const { Given, When, Then } = require('@cucumber/cucumber');
const{test,expect} = require('@playwright/test');
let errorMessage;
let updateErrors;

    Given('Admin is on the Dashboard page', async function () {
      if (!this.loginPag) {
      this.loginPag = this.pomanage.getLoginPage();
      }
      if (!this.batchPag) {
      this.batchPag = this.pomanage.getBatchPage(); 
      }
      await this.loginPag.verifyTitlePage();
  });
  When('Admin clicks Batch on the Menu from the header',{ timeout: 10000 }, async function () {
   await this.batchPag.clickBatchMenu();
   console.log("batch");
  });
  
  Then('Admin should be in the Manage Batch Page', async function () {
  const manageBatchTitle = await this.batchPag.getManageBatchTitle();
  });
  When('Admin clicks on {string} under the {string} menu bar', async function (string, string2) {
    await this.batchPag.clickAddBatchButton();
  });
  Then('Admin should see the Batch Details pop up window', async function () {
    await this.batchPag.getAddBatchPageTitleName();
  });
  

  Then('Validate batch name prefix box is not editable', async function () {
    await this.batchPag.checkBatchNameDisable();
  });

  Then('the popup should display the following fields:', function (dataTable) {
    const expectedFieldName = dataTable.raw().flat();
    let expectedFieldTitle;
    for(const fieldName of expectedFieldName)
    {
      console.log("fieldName" ,fieldName);
      expectedFieldTitle = this.batchPag.getFieldName(fieldName);
      expect(expectedFieldTitle).toBe(fieldName);
    }
    expect(expectedFieldTitle)
  });

  
  When('Admin enters {string}, {string},{string},{string},{string} and click save button', async function (string, string2, string3, string4, string5) {
    errorMessage = await this.batchPag.validAddBatchDetails(string,string2,string3,string4,string5);
  });
  Then('Admin should a message {string}', function (string) {
    console.log(errorMessage);

   expect(errorMessage.trim()).toBe(string);
  });

  When('the admin able to click edit button for the batchName', async function (dataTable) {
    console.log("dataTable" ,dataTable.raw()[0][0]);
   await this.batchPag.clickEditBatchButton(dataTable.raw()[0][0]); 
  });
 
  Then('the admin should see the pop up window for edit Batch', async function () {
    await this.batchPag.getEditBatchDetailsTitle();
  });
  Then('the program name and batch name should be in non-editable mode', async function () {
    await this.batchPag.checkNonEditableProgramAndBatch();
  });
  When('the admin enters {string},{string},{string},{string} and click Edit button in Batch module', async function (string, string2, string3, string4) {
    updateErrors = await this.batchPag.updateBatchDetails(string,string2,string3,string4);
  });
  When('the admin enters {string},{string},{string} and click Save button in Batch module', async function (string, string2, string3) {
    console.log("this.batchpage",this.batchPag)
    updateErrors = await this.batchPag.updateBatchDetails(string,string2,string3);
  });
  Then('the admin should see the error message {string}', function (string) {
    console.log(errorMessage);

   expect(updateErrors.trim()).toBe(string);
  });
  When('the admin able to click Delete button for the batchName', async function (dataTable) {
    console.log("dataTable" ,dataTable.raw()[0][0]);
   await this.batchPag.clickDeleteBatchButton(dataTable.raw()[0][0]); 
  });
  Then('the batch needs to be deleted', async function () {
    await this.batchPag.clickYesDeleteButton();
  });


const { Given, When, Then } = require('@cucumber/cucumber');
const{test,expect} = require('@playwright/test');
const {POManager} = require('../../page_Objects/POManager');
require
(
'../../support/hooks'
);
let errorMessage;
let updateErrors;
let loginPag;
let batchPag;

Given('the user is in the Login Page', async function () {
  if (!loginPag) {
    loginPag = await this.pomanage.getLoginPage();
    }
    if (!batchPag) {
    batchPag = await this.pomanage.getBatchPage(); 
    }

    await batchPag.launchurl();
});
    Given('Admin is on the Dashboard page', async function () {
      await batchPag.validLoginScenarioforbatch("playwrightuser@gmail.com","Playwright@1234");
      await loginPag.verifyTitlePage();
  });
When ('the user enters the username {string} and {string}', async function(userName,passWord){
await batchPag.validLoginScenarioforbatch(userName,passWord);

});
  When('Admin clicks Batch on the Menu from the header',{ timeout: 10000 }, async function () {
   await batchPag.clickBatchMenu();
   console.log("batch");
  });
  
  Then('Admin should be in the Manage Batch Page', async function () {
  const manageBatchTitle = await batchPag.getManageBatchTitle();
  });
  When('Admin clicks on {string} under the {string} menu bar', async function (string, string2) {
    await batchPag.clickAddBatchButton();
  });
  Then('Admin should see the Batch Details pop up window', async function () {
    await batchPag.getAddBatchPageTitleName();
  });
  

  Then('Validate batch name prefix box is not editable', async function () {
    await batchPag.checkBatchNameDisable();
  });

  Then('the popup should display the following fields:', function (dataTable) {
    const expectedFieldName = dataTable.raw().flat();
    let expectedFieldTitle;
    for(const fieldName of expectedFieldName)
    {
      console.log("fieldName" ,fieldName);
      expectedFieldTitle = batchPag.getFieldName(fieldName);
      expect(expectedFieldTitle).toBe(fieldName);
    }
    expect(expectedFieldTitle)
  });

  
  When('Admin enters {string}, {string},{string},{string},{string} and click save button', async function (string, string2, string3, string4, string5) {
    errorMessage = await batchPag.validAddBatchDetails(string,string2,string3,string4,string5);
  });
  Then('Admin should a message {string}', function (string) {
    console.log(errorMessage);

   expect(errorMessage.trim()).toBe(string);
  });

  When('the admin able to click edit button for the batchName', async function (dataTable) {
    console.log("dataTable" ,dataTable.raw()[0][0]);
   await batchPag.clickEditBatchButton(dataTable.raw()[0][0]); 
  });
 
  Then('the admin should see the pop up window for edit Batch', async function () {
    await batchPag.getEditBatchDetailsTitle();
  });
  Then('the program name and batch name should be in non-editable mode', async function () {
    await batchPag.checkNonEditableProgramAndBatch();
  });
  When('the admin enters {string},{string},{string},{string} and click Edit button in Batch module', async function (string, string2, string3, string4) {
    updateErrors = await batchPag.updateBatchDetails(string,string2,string3,string4);
  });
  When('the admin enters {string},{string},{string} and click Save button in Batch module', async function (string, string2, string3) {
    console.log("this.batchpage",this.batchPag)
    updateErrors = await batchPag.updateBatchDetails(string,string2,string3);
  });
  Then('the admin should see the error message {string}', function (string) {
    console.log(errorMessage);

   expect(updateErrors.trim()).toBe(string);
  });
  When('the admin able to click Delete button for the batchName', async function (dataTable) {
    console.log("dataTable" ,dataTable.raw()[0][0]);
   await batchPag.clickDeleteBatchButton(dataTable.raw()[0][0]); 
  });
  Then('the batch needs to be deleted', async function () {
    await batchPag.clickYesDeleteButton();
  });


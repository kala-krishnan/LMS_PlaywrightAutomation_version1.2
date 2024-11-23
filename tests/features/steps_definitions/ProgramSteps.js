const { Given, When, Then } = require('@cucumber/cucumber');
//const { ProgramPage } = require('../../page_Objects/ProgramPages');
const { expect } = require('@playwright/test');

const logger = require('../../logger/logger');


Then('the user navigates to the Program page and get the title for verification', async function () {  
  this.programPag = this.pomanage.getProgramPage();

  await this.programPag.clickProgramMenu();
  logger.info("Clicking on Program Link.............")
  await this.page.keyboard.press('Escape');//Newly added

  //await this.page.getByRole('button', { name: 'Program' }).click();
  //await expect(this.page.getByText('Manage Program')).toHaveText('Manage Program');
  
  await this.programPag.getManageProgramTitle();
});
//----------------------------------------------------------------------------------------
Given('Admin is on Program module', async function () {
  //await expect(this.page.getByText('Manage Program')).toHaveText('Manage Program');
  //await this.page.getByText('Manage Program').click();
  this.programPag = this.pomanage.getProgramPage();

  await this.programPag.clickProgramMenu();

  await this.programPag.getManageProgramTitle();


});

When('Admin clicks on New Program under the Program menu bar', async function () {
  await this.page.getByRole('button', { name: 'Program' }).click();
  await this.page.getByRole('menuitem', { name: 'Add New Program' }).click();

});


  Then('Admin should see window titled {string}', async function (string) {
    //logger.info(string);
    this.progTitleLocator = this.page.locator("//*[@id='pr_id_2-label']");
    logger.info(await this.progTitleLocator.textContent());
    await expect(await this.progTitleLocator).toContainText(string);


  });

  When('Admin enters {string},{string} and status and clicks on Save button for functionality {string}',   {timeout: 2 * 5000},async function (ProgName, ProgDesc,Functionality) {
    await this.page.getByLabel('Name*').click();
    await this.page.getByLabel('Name*').fill(ProgName);

    let isVisible_progErr =false;
    let isVisible_descErr = false;
    // Check if the minimum char is two.
    //logger.info("Length of ProgramName:")
    logger.info ("Length of Program Name : "+ProgName.length);
    if(ProgName.length<2 || Functionality==="Invalid-already available")
    {
    isVisible_progErr = await this.page.locator("//small[@class='p-invalid ng-star-inserted']").isVisible();
    if (isVisible_progErr) {
      logger.info('Error message for program is visible');
      logger.info(await this.page.locator("//small[@class='p-invalid ng-star-inserted']").textContent());

    } else {
      logger.info('Error message for program name is not visible');  
    }
    
   }
    await this.page.getByLabel('Description*').click();
    await this.page.getByLabel('Description*').fill(ProgDesc);
        // Check if the minimum char is two.
    logger.info("Length of ProgramDesc:")
    logger.info (ProgDesc.length);
    if(ProgDesc.length<2)
    {
    isVisible_descErr = await this.page.locator("//small[@class='p-invalid ng-star-inserted']").isVisible();
    if (isVisible_descErr) {
    logger.info('Error message for description is visible');
    logger.info(await this.page.locator("//small[@class='p-invalid ng-star-inserted']").textContent());

    } else {
    logger.info('Error message for description is not visible');  
    }
    }
    

  await this.page.locator('.p-radiobutton-box').first().click();
if(isVisible_progErr||isVisible_descErr)
          await this.page.getByRole('button', { name: 'Cancel' }).click();    

else
{
    await this.page.getByRole('button', { name: 'Save' }).click();    
        this.toastMessageLoc =this.page.locator("//div[contains(@class,'p-toast-detail ng-tns')]");
        let ToastMess = await this.page.locator("//div[contains(@class,'p-toast-detail ng-tns')]").textContent();
        logger.info(ToastMess);
      } 

    });

    Then('The program {string} is saved successfully',  {timeout: 2 * 5000},async function (ProgName) {

    
    await this.page.getByPlaceholder('Search...').click();
    await this.page.getByPlaceholder('Search...').fill(ProgName);
    await this.page.getByPlaceholder('Search...').press('Enter');

    await this.page.waitForTimeout(4000);
    
    let tblVal = await this.page.locator("//tbody[@class='p-datatable-tbody']").textContent();
    logger.info(tblVal);
    if (tblVal.includes(ProgName))
        logger.info(ProgName + " is saved successfully..................")
    else
       logger.info(ProgName + " is not saved successfully..................")

   

  });
  //---------------@TC1----------------------------
  Given('The Admin is on dashboard page after Login', async function () {
    this.programPag = this.pomanage.getProgramPage();
    await this.programPag.verifyDashboardPage();

    
  });



  When('The Admin clicks {string} on the navigation bar', async function (string) {
    
    await this.programPag.clickProgramBtn();

  });



  Then('The Admin should be navigated to Program module', async function () {
    
    await this.programPag.getManageProgramTitle();


  });
  //-------------------------@TC2-------------------------------
 

    Then('Admin should see Logout in menu bar', async function () {
      
      await this.programPag.checkLogoutMenu();

    });



    Then('Admin should see the module names as in order', async function () {
      await this.programPag.checkAllLinks();
    });

    //----------------------@TC3---------------------------------------
    Then('The Admin validates all the elements present in the Manage Program Page', async function () {
      await this.programPag.verifyManageProgramPageValidation();
    });
    //-------------@DeleteProgram-----------------------------
    When('The Admin searches for a program {string}', async function (ProgramName) {
      await this.programPag.searchProgram(ProgramName);
    });



    Then('The Admin does the validations in delete program functionality {string}',  {timeout: 2 * 5000},async function (functionality) {
      logger.info(functionality);
      if(functionality===("Admin clicks on No button"))
        await this.programPag.cancelDeleteProgram();

      if(functionality===("Admin Click on X button"))
        await this.programPag.closeDeleteProgram();

      if(functionality===("Admin succesfully deletes the program"))
        await this.programPag.YesDeleteProgram();

    
      

    });
    //-------------------@EditProgram------------------------
    
    When('Admin edits {string},{string},{string} and status and clicks on Save button for functionality {string}', async function (ProgramName, editProgramName, editProgramDescription,Functionality) {
      await this.programPag.getListOfElements(ProgramName);
      await this.programPag.enterProgramName(editProgramName)
      await this.programPag.enterProgramDesc(editProgramDescription)
      await this.programPag.clickSaveProgram()


    });
    

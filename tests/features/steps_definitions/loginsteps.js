
const { Given,When, Then } = require('@cucumber/cucumber')
const {POManager} = require('../../page_Objects/POManager');
require
(
'../../support/hooks'
);
   
let loginPag;


  Given('Admin launch the browser', async function () {
   
    //launching browser in hooks ...........
    loginPag = await this.pomanage.getLoginPage();
    console.log("admin has launched the browser");
    // const loginPage = this.loginPag;
   
  });

  

When('Admin gives the correct LMS portal URL', {timeout: 2 * 5000},async function ()  {
  
  await loginPag.openURL();
  
});


Then('Admin should land on the login page',  {timeout: 2 * 5000},async()=> {
  await loginPag.verifyTitlePage();
});
//-------------------application error -------------

When('Admin gives the invalid LMS portal URL', async()=> {
await loginPag.invalidurl();
});
Then('Admin should recieve application error', {timeout: 2 * 5000}, async()=> {
  await  loginPag.applicationError();
});
//------------------------broken link -------------------


When('Admin gives the broken link', async()=> {
 
await loginPag.launchBrokenUrl();
});


  Then('HTTP response >= {int}.', {timeout: 2 * 5000},async function (int) {
    await loginPag.brokenUrl(int);
    });
//-----------spell checker -------------------------
  
  Then('Admin should see correct spellings in all fields',  {timeout: 2 * 5000},async()=> {
    await  loginPag.spellCheck();
  });
//--------------admin in LMS page -----------------------
  Then('Admin should see  LMS - Learning Management System',  {timeout: 2 * 5000}, async()=> {
    await loginPag.verifyTitlePage();
  });

//-------------multiple credentials for login---------

Given('the user is in Login Page', async function () { 
    await  loginPag.openURL();
  });

 

  When('the user enters the Credentials and click login button', async function (dataTable) {
  
  const credentialsList = dataTable.hashes();
  console.log('Credentials List:', credentialsList);
  for (const credentials of credentialsList) {
      const { id, pwd } = credentials;
      await loginPag.validLoginScenario(id, pwd); 

  }
  
  });

  Then('Admin should see the message',{timeout: 2 * 5000}, async function () {
           
          await loginPag.message();
    });

  
  Then('the user navigates to the Dashboard page and get the title for verification',  {timeout: 2 * 5000},async function () {
    await loginPag.verifyTitlePage();
  });

  Then('Admin should see company name below the app name', {timeout: 2 * 5000},async function () {
    await loginPag.companyNamevalidation();
    
  });
  Then('Admin should see {string}',  {timeout: 2 * 5000},async function (string) {
   await loginPag.lmsLogin(string);
  });
  Then('Admin should see two text field',  {timeout: 2 * 5000},async function () {
   await loginPag.twotextFields();
  });
//keyboard validation--------------------------------------------------------



         Given('Admin launch the browser and enters LMS portal URL', async function () {
          
          await loginPag.openURL();
         });

 

         When('Admin enters valid credentials and clicks login through keyboard', async function () {
          await loginPag.loginButtonthroughKeyboard();
         });

  

         Then('Admin should land on dashboard page', async function () {
          await loginPag.dashboardPage();
         });
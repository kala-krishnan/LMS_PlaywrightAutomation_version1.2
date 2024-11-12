const {Given,When,Then}=require('@cucumber/cucumber');



Given('the user is in Login Page', async function () {

  
    this.loginPag = this.pomanage.getLoginPage();
    await  this.loginPag.gotoLoginPage();
  });
  When('the user enters the username {string} and {string}',async function (string, string2) {
   
    await  this.loginPag.validLoginScenario(string,string2)
  }); 
  
  Then('the user navigates to the Dashboard page and get the title for verification', async function () {
    await this.loginPag.verifyTitlePage();
  });

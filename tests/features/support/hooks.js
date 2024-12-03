const {Before,After, AfterStep, Status, BeforeAll, AfterAll}=require('@cucumber/cucumber');
const path = require('path');
const{chromium} = require('playwright');
const {POManager} = require('../../page_Objects/POManager');
//const{CommonUtils} = require('../../Utils/CommonUtils.js');
//Aswini
const logger = require('../../logger/logger');



// Launch options.
const options = {
    slowMo: 10000,
    ignoreHTTPSErrors: true,
};

let browser;
let context;
let page;
//let pomanage;

BeforeAll(async function (){
    try {
        browser = await chromium.launch({headless : true});
        context = await browser.newContext();
        page = await context.newPage();
        
    } catch (error) {
        console.error("Error in BeforeAll hook:", error);
        throw error; 
    }
    browser = await chromium.launch({headless : false}
      );
    context = await browser.newContext();
     page = await context.newPage();
     pomanage = new POManager(page);


    
});
Before(async function ({pickle}) {
    
    this.page = page;
    this.pomanage = pomanage;
    //Aswini -- added pickle parameter as well in function parameter
   const scenarioName = pickle.name+pickle.id
   logger.info("SCENARIO::: "+scenarioName)
   //logger.info("Logger is logging...............")

    this.pomanage = new POManager(this.page);
   // this.CommonUtils = new CommonUtils(this.page);
   // this.pomanage = pomanage;
});

// AfterAll(async function()
// {
//     if(browser)
//     {
// await browser.close();
//     }
// });

AfterStep(async function ({result}){
    if(result.status == Status.FAILED)
    {
        await this.page.screenshot({path:'screenshot1.png'});
    }
});

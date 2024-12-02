const {Before,After, AfterStep, Status, BeforeAll, AfterAll}=require('@cucumber/cucumber');
const path = require('path');
const{chromium} = require('playwright');
const {POManager} = require('../../page_Objects/POManager');
//const{CommonUtils} = require('../../Utils/CommonUtils.js');

let browser;
let context;
let page;
//let pomanage;

BeforeAll(async function (){
    try {
        browser = await chromium.launch({headless : false});
        context = await browser.newContext();
        page = await context.newPage();
        
    } catch (error) {
        console.error("Error in BeforeAll hook:", error);
        throw error; 
    }
    
});
Before(async function () {
    
    this.page = page;
    this.pomanage = new POManager(this.page);
   // this.CommonUtils = new CommonUtils(this.page);
   // this.pomanage = pomanage;
});

AfterAll(async function()
{
    if(browser)
    {
await browser.close();
    }
});

AfterStep(async function ({result}){
    if(result.status == Status.FAILED)
    {
        await this.page.screenshot({path:'screenshot1.png'});
    }
});
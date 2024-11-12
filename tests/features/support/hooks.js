const {Before,After, AfterStep, Status, BeforeAll, AfterAll}=require('@cucumber/cucumber');
const path = require('path');
const{chromium} = require('playwright');
const {POManager} = require('../../page_Objects/POManager');

let browser;
let context;
let page;
let pomanage;

BeforeAll(async function (){
    browser = await chromium.launch({headless : false});
    context = await browser.newContext();
     page = await context.newPage();
     pomanage = new POManager(page);

    
});
Before(async function () {
    
    this.page = page;
    this.pomanage = pomanage;
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
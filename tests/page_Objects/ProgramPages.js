const{test,expect} = require('@playwright/test')

const logger = require('../logger/logger');



class programPage
{
    constructor(page)
    {
    this.page=page;
    this.ProgramMenu = this.page.locator("//span[normalize-space()='Program']");
    this.manageProgramTitle = this.page.locator("//div[normalize-space()='Manage Program']");
    this.lmstitleLocator = this.page.locator("//mat-toolbar[@class='mat-toolbar mat-primary mat-toolbar-single-row ng-star-inserted']");
    this.programBtn = this.page.locator("//button[@id='program']");
    this.logoutMenu = this.page.locator("//span[normalize-space()='Logout']");
    this.batchMenu = this.page.locator("//span[normalize-space()='Batch']");
    this.classMenu = this.page.locator("//span[normalize-space()='Class']");

    
    this.delBtn =  this.page.locator('mat-card-title').getByRole('button')
    this.tblHead_checkBox=this.page.locator("//div[@class='p-checkbox-box']");
    this.tblHead_progName=this.page.locator("//th[@psortablecolumn='programName']");
    this.tblHead_progDesc=this.page.locator("//th[@psortablecolumn='programDescription']");
    this.tblHead_progStat=this.page.locator("//th[@psortablecolumn='programStatus']");
    this.searchBtn = this.page.locator("//input[@class='p-inputtext p-component']");
    this.tblPrg = this.page.locator("//tbody[@class='p-datatable-tbody']//tr");
    this.ShowingMsg = this.page.locator("//span[@class='p-paginator-current ng-star-inserted']");
    this.totalEntriesMsg = this.page.locator("//div[@class='p-d-flex p-ai-center p-jc-between ng-star-inserted']");

    this.deleteYesBtn = this.page.locator("//button[@ng-reflect-label='Yes']")
     this.deleteNoBtn = this.page.locator("//button[@ng-reflect-label='No']")
     this.deleteCloseBtn = this.page.locator("//button[@class='ng-tns-c204-7 p-dialog-header-icon p-dialog-header-close p-link ng-star-inserted']")






}

async launchURLprogram()
{
    await this.page.goto("https://playwright-frontend-app-a9ea85794ad9.herokuapp.com/login");
}
    async clickProgramMenu()
    {

        //await this.page.locator("//span[normalize-space()='Program']").click();
         await this.ProgramMenu.click();
         await this.page.keyboard.press('Escape');//Newly added
    }
    async getManageProgramTitle()
    {
        await expect(await this.manageProgramTitle).toContainText(' Manage Program');
       
    }
    async verifyDashboardPage()
    {
        //console.log(await this.lmstitleLocator.textContent());
        
        await expect(await this.lmstitleLocator).toContainText(' LMS - Learning Management System ');

    }
    async clickProgramBtn()
    {
        await this.programBtn.click();
    }
    async checkLogoutMenu()
    {
         let isLogoutVisible = await (this.logoutMenu).isVisible();
         logger.info("Logout menu is visible :"+isLogoutVisible);

    }
    async checkAllLinks()
    {
        let isProgramVisible = await (this.ProgramMenu).isVisible();
        logger.info("Program menu is visible :"+isProgramVisible);
        
        let isBatchVisible = await (this.batchMenu).isVisible();
        logger.info("Batch menu is visible :"+isBatchVisible);

        let isClassVisible = await (this.classMenu).isVisible();
        logger.info("Class menu is visible :"+isClassVisible);

        let isLogoutVisible = await (this.logoutMenu).isVisible();
        logger.info("Logout menu is visible :"+isLogoutVisible);


    }
    async verifyManageProgramPageValidation()
    {
        let delBtn_Visible = await (this.delBtn).isVisible();
        logger.info("Delete button is visible in Manage Program:"+delBtn_Visible);

        
        let searchBtn_Visible = await (this.searchBtn).isVisible();
        logger.info("Search button is visible in Manage Program:"+searchBtn_Visible);
        const placeholderValue = await (this.searchBtn).evaluate(node => node.placeholder);
        logger.info("Placeholder value in Search button::::"+placeholderValue)



        
        let tblHead_checkBoxVisible = await (this.tblHead_checkBox).isVisible();
        logger.info("CheckBox is visible in table header:"+tblHead_checkBoxVisible);

        let tblHead_progNameVisible = await (this.tblHead_progName).isVisible();
        logger.info("Program Name is visible in table header:"+tblHead_progNameVisible);
        let tblHead_progDescVisible = await (this.tblHead_progDesc).isVisible();
        logger.info("Program Description is visible in table header:"+tblHead_progDescVisible);
        let tblHead_progStatVisible = await (this.tblHead_progStat).isVisible();
        logger.info("Program Status is visible in table header:"+tblHead_progStatVisible);
        
        // Locate the table and count the number of rows
        const tblrowCount = await (this.tblPrg).count();
        logger.info("Number of rows in Program Table: "+tblrowCount );
        if (tblrowCount===5)
            logger.info("Program Table has 5 records...")
        else
            logger.error("Program Table does not have 5 records..")

            
            let ShowingMsg_Visible = await (this.ShowingMsg).isVisible();
            logger.info("Message showing entries is visible in Manage Program:"+ShowingMsg_Visible);
            const showingMsgValue = await (this.ShowingMsg).textContent();
            logger.info("Message showing entries is::::"+showingMsgValue)
    
            let totalEntriesMsg_Visible = await (this.totalEntriesMsg).isVisible();
            logger.info("Message showing total entries is visible in Manage Program:"+totalEntriesMsg_Visible);
            const totalEntriesMsgValue = await (this.totalEntriesMsg).textContent();
            logger.info("Message showing entries is::::"+totalEntriesMsgValue)

    }
    async searchProgram(progName)
    {
          // Press the Escape key
        await this.page.keyboard.press('Escape');

        await this.page.getByPlaceholder('Search...').click();
        await this.page.getByPlaceholder('Search...').fill(progName);
        await this.page.getByPlaceholder('Search...').press('Enter');
    
        await this.page.waitForTimeout(4000);
        
        let tblVal = await this.page.locator("//tbody[@class='p-datatable-tbody']").textContent();
        logger.info(tblVal);
        if (tblVal.includes(progName))
            logger.info(progName + " is present..................")
        else
           logger.error(progName + " is not present..................")
    
    }
    async deleteProgram()
    {
        if(this.page.locator("//button[@id='deleteProgram']").isVisible())
        {
            await this.page.locator("//button[@id='deleteProgram']").click();
            logger.info("Delete button is clicked successfully")
        }    
        else
        {
        logger.info("Delete button is not clicked successfully")
        }
            await this.page.waitForTimeout(2000);


        // Highlight the element
        await (this.page.locator("//button[@ng-reflect-label='Yes']")).evaluate(element => {
            element.style.border = '2px solid red';
            });
    
            // Wait for a few seconds to see the highlight
            //await this.page.waitForTimeout(3000);
        

        //await this.page.locator("//button[@ng-reflect-label='Yes']").click();
        //
        if (this.page.locator("//button[@ng-reflect-label='Yes']").isVisible())
        {
            await this.page.locator("//button[@ng-reflect-label='Yes']").click();
        }
        else
        {
            if(this.page.locator("//button[@id='deleteProgram']").isVisible())
                {
                    await this.page.locator("//button[@id='deleteProgram']").click();
                    logger.info("Delete button is clicked successfully")
                    await this.page.locator("//button[@ng-reflect-label='Yes']").click();
                }   
        }

        //
        logger.info("Delete Yes button is clicked successfully...")


    }
    async cancelDeleteProgram()
    {
        await this.page.locator("//button[@id='deleteProgram']").click();
        await this.page.waitForTimeout(2000);
        
                // Highlight the element
                await (this.page.locator("//button[@ng-reflect-label='No']")).evaluate(element => {
                    element.style.border = '2px solid red';
                    });
            
                    // Wait for a few seconds to see the highlight
                    await this.page.waitForTimeout(3000);
        
        await this.page.locator("//button[@ng-reflect-label='No']").click();
        //this.deleteNoBtn.click();
        logger.info("Delete Cancel button is clicked successfully...")


    }
    async closeDeleteProgram()
    {
        await this.page.locator("//button[@id='deleteProgram']").click();
        await this.page.waitForTimeout(2000);
        // Highlight the element
        await (this.deleteCloseBtn).evaluate(element => {
        element.style.border = '2px solid red';
        });

        // Wait for a few seconds to see the highlight
        await this.page.waitForTimeout(3000);


        this.deleteCloseBtn.click();
        logger.info("Delete Close button is clicked successfully...")


    }
    async YesDeleteProgram()
    {
        await this.page.locator("//button[@id='deleteProgram']").click();
        await this.page.waitForTimeout(1000);
        
        await this.page.locator("//button[@id='deleteProgram']").click();
        await this.page.waitForTimeout(1000);
            
        await this.page.locator("//button[@ng-reflect-label='Yes']").click();
        //this.deleteNoBtn.click();
        logger.info("Delete Yes button is clicked successfully...")


    }
//---------------------------------------------------------------------
    async enterProgramName(progName)
    {
        if (progName!=null)
        {
            await this.page.getByLabel('Name*').click();
            await this.page.getByLabel('Name*').fill(progName);
        
        }
    }
    async enterProgramDesc(progDesc)
    {
        if (progDesc!=null)
        {
            await this.page.getByLabel('Description*').click();
            await this.page.getByLabel('Description*').fill(progDesc);
                
        }
    }
    async clickSaveProgram()
    {
        await this.page.getByRole('button', { name: 'Save' }).click();    

    }




    //---------------------------------------------------------------------------------------------
    // GIven by kala to search for Batch/Program
    async getListOfElements(batchValue) {
  
        const rowsCountText = await this.page.locator("//div[@class='p-d-flex p-ai-center p-jc-between ng-star-inserted']").textContent(); 
  console.log("text is ",rowsCountText);     
 
        const formatValue = rowsCountText.split('are');
        const value = formatValue[1].split('programs'||'batches');//added or programs by Aswini
        const totalNoOfRows = parseInt(value[0].trim(), 10);
        let flag =0;
 
       
       
        const noOfRowsPerPage = (await this.page.locator("//table//tbody[@class='p-datatable-tbody']/tr")).count();
        console.log("totalNoOfRows is ",totalNoOfRows);
        console.log("noOfRowsPerPage is ",noOfRowsPerPage);
        let totalNoOfPages = Math.ceil(totalNoOfRows / 5);
        console.log("totalNoOfPages is ",totalNoOfPages);
        for (let i = 1; i <= totalNoOfPages; i++) {
            for (let j = 1; j <= 5; j++) {
                try {
                    
                    const rowXPath = `//table/tbody/tr[${j}]/td[2]`;
                   
                    await this.page.locator(rowXPath).waitFor({
                        state: 'visible', 
                        timeout: 10000    
                    });
                    const rowP= this.page.locator(rowXPath);
                    const batchNameDetail = await this.page.locator(rowXPath).textContent();
                    console.log(batchNameDetail)
                    if (batchNameDetail === batchValue) {
                   
                      flag=1;
                        break;
                    }
                } catch (err) {
                    // Handle case where fewer rows are on the page
                    console.log(`Error finding row ${j} on page ${i}: ${err.message}`);
                    break;
                }
                console.log("flag ..", flag);
            }

            
            if (i < totalNoOfPages) {
              console.log("flag ..", flag);
              if(flag==1)
              {
                break;
              }
              else
              {

                  try {
                    const nextPageButtonXPath = `//p-paginator/div/span[2]/button[text()='${i + 1}']`;
                   
                   await this.page.locator(nextPageButtonXPath).waitFor({
                        state: 'visible', 
                        timeout: 10000    
                    });
                      await this.page.locator(nextPageButtonXPath).click();
                } catch (err) {
                    console.log(`Error navigating to page ${i + 1}: ${err.message}`);
                   
                }
              }
            }
        }
        if(flag==1)
        {
         console.log("click before..");
         const overlay = this.page.locator('//div[contains(@class, "cdk-overlay-container")]'); 
         if (await overlay.isVisible()) {
             await overlay.click();
             console.log("Overlay dismissed.");
         }
        
         



         await this.page.locator("//tr[@class='ng-star-inserted']/td[2][text()='"+batchValue+"']/following-sibling::td/div/span/button/span[@class='p-button-icon pi pi-pencil']").waitFor
          ({
                  state: 'visible', // Wait until the element is visible
                  timeout: 5000 
          })

         await this.page.locator("//tr[@class='ng-star-inserted']/td[2][text()='"+batchValue+"']/following-sibling::td/div/span/button/span[@class='p-button-icon pi pi-pencil']").hover();
          await this.page.locator("//tr[@class='ng-star-inserted']/td[2][text()='"+batchValue+"']/following-sibling::td/div/span/button/span[@class='p-button-icon pi pi-pencil']").click();
        }
}


 }
module.exports={programPage};
const{test,expect} = require('@playwright/test')



class CommonUtils
{
    constructor(page)
    {
    this.page=page;
    }


async getListOfElements(batchValue) {
  
        const rowsCountText = await this.page.locator("//div[@class='p-d-flex p-ai-center p-jc-between ng-star-inserted']").textContent(); 
  console.log("text is ",rowsCountText);     
 
        const formatValue = rowsCountText.split('are');
        const value = formatValue[1].split('batches');
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
module.exports={CommonUtils};
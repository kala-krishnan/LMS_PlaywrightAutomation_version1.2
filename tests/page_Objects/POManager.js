const {loginPage} = require("./loginPages.js");
const{batchPage} = require("./batchPages.js");
 const{dashboardPage} = require("./DashboardPage.js");
 const {logOutPage} = require("./logoutpage.js");
const{programPage} = require("./ProgramPages");

class POManager{

    constructor(page)
    {
        this.page = page;
       this.loginPage = null;
       this.batchPage = null;
       this.dashboardPage = null; 
       this.prgrm = null;
       this.logOutPage = null;
       
    }
    async getLoginPage()
    {
        
        if(!this.loginPage)
        {
            this.loginPage=new loginPage(this.page);
        }
       
        return this.loginPage;
    }
    getProgramPage()
    {
        if(!this.programPage)
            {
                this.programPage=new programPage(this.page);
            }
        return this.programPage;
    }
    async getBatchPage()
    {
        if(!this.batchPage)
            {
                this.batchPage=new batchPage(this.page);
            }
        return this.batchPage;
    }

    async getDashboardPage()
    {
        if(!this.dashboardPage)
            {
                this.dashboardPage=new dashboardPage(this.page);
            }
        return this.dashboardPage;
    }

    async getlogOutPage()
    {
        if(!this.logOutPage)
            {
                this.logOutPage=new logOutPage(this.page);
            }
        return this.logOutPage;
    }
}
module.exports={POManager};
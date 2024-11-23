const {loginPage} = require("./loginPages");
const{batchPage} = require("./batchPages");
const{programPage} = require("./ProgramPages");

 

class POManager{

    constructor(page)
    {
        this.page = page;
       this.loginPage = null;;
       this.batchPage = null;;
       this.programPage = null;
       
    }
    getLoginPage()
    {
        if(!this.loginPage)
        {
            this.loginPage=new loginPage(this.page);
        }
        return this.loginPage;
    }
    getBatchPage()
    {
        if(!this.batchPage)
            {
                this.batchPage=new batchPage(this.page);
            }
        return this.batchPage;
    }
    getProgramPage()
    {
        if(!this.programPage)
            {
                this.programPage=new programPage(this.page);
            }
        return this.programPage;
    }
}
module.exports={POManager};
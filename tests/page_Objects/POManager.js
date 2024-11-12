const {loginPage} = require("./loginPages");
const{batchPage} = require("./batchPages");
 

class POManager{

    constructor(page)
    {
        this.page = page;
       this.loginPage = null;;
       this.batchPage = null;;
       
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
}
module.exports={POManager};
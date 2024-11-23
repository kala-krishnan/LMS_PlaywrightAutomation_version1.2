const{test,expect} = require('@playwright/test')
const spellchecker = require('spellchecker');
const tesseract = require('tesseract.js');
const fs = require('fs');

class loginPage
{

    constructor(page)
    {
      //constructor is for synchronous properties ..to use await for the locators we have to create
      //a async function explicitly and use await this.page.locator
      
        this.page = page;
        this.inccorectWords=[];
        this.response = null; // function initializes the browser, context, and page.hence calling in the constructor.


    }

    async openURL()
    {
        await this.page.goto("https://playwright-frontend-app-a9ea85794ad9.herokuapp.com/login");
        //console.log(await this.page.locator('.ng-untouched p').textContent());
    }

    //-------------------------------------Verify Admin with invalid url ----------------------------
    async invalidurl()
    {
      await this.page.waitForLoadState("domcontentloaded");
      try{
      await this.page.goto("playwright-frontend-app-a9ea85794ad9.herokuapp.com/lo@gin");
      
      await console.log("page has invalidurl or missing protocol ");
      }
      catch(error)
      {
        await console.log(error.message)
      }
    }

    async applicationError()
    {
      this.titleLocator =await  this.page.locator("//mat-toolbar[@class='mat-toolbar mat-primary mat-toolbar-single-row ng-star-inserted']/span[1]");
        console.log(await this.titleLocator.textContent());

        await expect(await this.titleLocator).not.toContainText(' LMS - Learning Management System ');
      
      //console.log("application error");
    }
    //----------------Broken link-----------------

    async launchBrokenUrl()
    {
      await this.page.goto('https://playwright-frontend-app-a9ea85794ad9.herokuapp.com/level');
    }
async brokenUrl(int){
    try {
      const response = await this.page.goto("https://playwright-frontend-app-a9ea85794ad9.herokuapp.com/log");
      await console.log(`Response status code: ${response.status()}`); // Should print 404
      if (response.status() === int) {
        await console.log('Broken URL test passed: 404 Not Found');
      } else {
        await console.log('Unexpected status code:', response.status());
      }
    } catch (error) {
      await console.error('Failed to load URL:', error.message);
    }
}


    //-------------------login page verification----------------------------
   
    //------------------------------------spell checker ---------------------
   async spellCheck()
   {
    const textElements = await this.page.locator('body *').allInnerTexts();
    for (const text of textElements) {
      const words = text.split(/\s+/); // Split text into individual words
      for (const word of words) {
        if (spellchecker.isMisspelled(word)) {
          this.inccorectWords.push(word);
        }
      }
    }
  
    // Assert that there are no misspelled words
    expect(this.inccorectWords.length).toBe(0);
  
    // If there are misspelled words, log them for debugging
    if (this.inccorectWords.length > 0) {
      console.log('Misspelled words found:', this.inccorectWords);
    }

    else 
    {
      console.log("there are no misspelled words in login page ");
    }
  }
   //-----------------------------------------------multiple credentials to login into lms portal---
    async validLoginScenario(userName,passWord)
    {
      this.username =  await this.page.locator("#username");
      this.password = await this.page.locator("#password");
      this.loginButton = await this.page.locator("#login");
        await this.username.fill(userName);
        await this.password.fill(passWord);
        await this.loginButton.click();
       
       
    }

async message()
{
   //locating the error message // this location is  similar to  =>WebDriver ele=driver.findelement(by.xpath(id=))
  
  const errormsg= await this.page.locator("#errormessage");
  await errormsg.waitFor({ state: 'visible', timeout: 50000 });
  //here retrieveing the text message ..justlike ele.getText();
  const errorText = await errormsg.textContent();
  
  console.log(errorText);
  if (errorText.includes('Invalid username and password')) {
    console.log('Error message displayed for invalid credentials');
    // screenshot !!!!!!
    await this.page.screenshot({ path: 'error_screenshot.png' });
  } else {
   
    console.log('entered valid credentials , and page is been redirected to dashboard page ');
   
  }
}


    async verifyTitlePage()
    {
      console.log("verify title");
      this.titleLocator =await  this.page.locator("//mat-toolbar[@class='mat-toolbar mat-primary mat-toolbar-single-row ng-star-inserted']/span[1]");
        console.log(await this.titleLocator.textContent());
        await expect(await this.titleLocator).toContainText(' LMS - Learning Management System ');
    }
//------------------------------company name validation in the text -------------
async companyNamevalidation()
{
  const elementHandle = await this.page.locator('.images');
  await elementHandle.screenshot({ path: 'image.png' });


  
  //to extract text from image to english language 
  tesseract.recognize('image.png', 'eng')
  .then(({ data: { text } }) => {
    console.log('Extracted Text:', text);
   
          // Assert the extracted text
    
    if (text.includes('NumpyNinja')) {
      console.log('Text found in the image under application name');
    } else {
      console.error('Expected text not found!');
    }
  })
  .catch(error => {
    //optional character recognition 
    console.error('Error during OCR:', error);
  })
}

//----------------------admin should see lms login 
async lmsLogin(string)
{
  
    // Wait for the element to be visible
    const actualText =await this.page.locator('text="Please login to LMS application"').textContent();

    // Validate the text
    if (actualText.trim() !==string.trim()) {
      console.log('Validation not  successful: Admin cannot see the required string');
    }

    console.log('Validation successful:  actual text " Please login " is visible.');
  }
  //------------------------------------valid two text fields 

  async twotextFields()
  {
    this.usernameField =  await this.page.locator("#username");
    this.passwordField = await this.page.locator("#password");

     if (!this.usernameField.isVisible()  || !this.passwordField.isVisible()) {
      throw new Error('One or both text fields are not visible');
    }
    
    console.log('Validation successful: Username and Password fields are present.');


  }

async loginButtonthroughKeyboard()
{
  this.username =  await this.page.locator("#username");
      this.password = await this.page.locator("#password");
      this.loginButton = await this.page.locator("#login");
        await this.username.fill("playwrightuser@gmail.com");
        await this.password.fill("Playwright@1234");

       
  await expect(this.loginButton).toBeVisible();

  
  await this.loginButton.focus();

  // checking the login button with keyboard 
  await this.page.keyboard.press('Enter');
  console.log("login button clicked through keyboard");

  
}

async dashboardPage()
{
  
  await expect(this.page).toHaveURL('https://playwright-frontend-app-a9ea85794ad9.herokuapp.com/'); 
  console.log("page is redirected to dashboard page");
}

}



module.exports={loginPage};

         

         




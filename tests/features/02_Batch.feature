Feature: Add Batch Feature

Background: Login to LMS
Given the user is in Login Page
When the user enters the username "playwrightuser@gmail.com" and "Playwright@1234"
Then the user navigates to the Dashboard page and get the title for verification

Scenario: Verify Admin Navigate to Batch Page successfully
Given Admin is on the Dashboard page
When Admin clicks Batch on the Menu from the header
When  Admin clicks on "Add New batch" under the "batch" menu bar 
When  Admin enters the valid data to all the mandatory fields and click save button
Then  Admin should get a succesesful message 

	


 	

 	

 	


 	
 
 	

 	



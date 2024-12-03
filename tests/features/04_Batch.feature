@AddBatch
Feature: Add Batch Feature

Background: Login to LMS
Given the user is in Login Page
When the user enters the username "playwrightuser@gmail.com" and "Playwright@1234"
Then the user navigates to the Dashboard page and get the title for verification

Scenario: Validate all the fields exist in pop up
Given Admin is on the Dashboard page
When Admin clicks Batch on the Menu from the header
When  Admin clicks on "Add New batch" under the "batch" menu bar 

Then Admin should see the Batch Details pop up window


Then the popup should display the following fields:
    | Program Name    | 
    | Batch Name      |
    | Description     |
    | Status          |
    | Number of Classes |

Then Validate batch name prefix box is not editable

    
    
    
    

Scenario Outline: Verify Admin Navigate to Batch Page successfully
Given Admin is on the Dashboard page
When Admin clicks Batch on the Menu from the header
When  Admin clicks on "Add New batch" under the "batch" menu bar 
When  Admin enters "<ProgramName>", "<BatchName>","<BatchDesc>","<Status>","<NoofClasses>" and click save button
Then  Admin should a message "<ErrorMessage>"

Examples:
    | ProgramName       | BatchName | BatchDesc  | Status | NoofClasses|ErrorMessage|
    |                   |  1277         | Developer  | Active | 12|Program Name is required.|
    | DataAnalyst       |             | Developer  | Active | 12|Batch Name is required.|
    | DataAnalyst       |1277         |            | Active | 12|Batch Description is required.|
    | DataAnalyst       | 1277          | Developer  | Active |   |Number of classes is required.|
    | DataAnalyst       | #$#$        | Developer  | Active | 12|This field accept only numbers and max 5 count. |
    | DataAnalyst       | 1277          | 12####     | Active | 12|This field should start with an alphabet and min 2 character.|
    | DataAnalyst      | 1277           | Developer  | Active | 12| Batch Created Successfully|



 	

 	

 	


 	
 
 	

 	



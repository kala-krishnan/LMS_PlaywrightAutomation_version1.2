@EditBatch
Feature: Edit Batch Feature

Background: Login to LMS
Given the user is in Login Page
When the user enters the username "playwrightuser@gmail.com" and "Playwright@1234"
Then the user navigates to the Dashboard page and get the title for verification

Scenario: Validate the admin lands on the manage batch page
Given Admin is on the Dashboard page
When Admin clicks Batch on the Menu from the header
Then Admin should be in the Manage Batch Page

Scenario: Validate all the fields exist in pop up
Given Admin is on the Dashboard page
When Admin clicks Batch on the Menu from the header
When the admin able to click edit button for the batchName
|DataAnalyst167|
Then the admin should see the pop up window for edit Batch

Then the program name and batch name should be in non-editable mode


Scenario Outline: Validate all the fields exist in pop up
Given Admin is on the Dashboard page
When Admin clicks Batch on the Menu from the header
When the admin able to click edit button for the batchName
|DataAnalyst167|
When the admin enters "<BatchDesc>","<Status>","<NoofClasses>" and click Save button in Batch module
Then the admin should see the error message "<ErrorMessage>"

Examples:
    | BatchDesc  | Status | NoofClasses|ErrorMessage|      
    |            | Active | 12         |Batch Description is required.|
    |Developer   | Active |            |Number of classes is required.|    
    |12####      | Active | 12         |This field should start with an alphabet and min 2 character.|
    |Developer   | Active | 12         |batch Updated|


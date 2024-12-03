@DeleteBatch
Feature: Delete Batch Feature

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
When the admin able to click Delete button for the batchName
|DataAnalyst1267|
Then the batch needs to be deleted


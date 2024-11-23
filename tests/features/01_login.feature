@login
Feature: Login Feature

Scenario: Verify Admin is able to land on login page

Given Admin launch the browser
When Admin gives the correct LMS portal URL
Then Admin should land on the login page


Scenario: Verify Admin is able to land on home page with invalid URL
Given Admin launch the browser
When Admin gives the invalid LMS portal URL
Then Admin should recieve application error


Scenario: Verify for broken link
Given Admin launch the browser
When Admin gives the broken link 
Then HTTP response >= 400.

Scenario: Verify the text spelling in the page 
Given Admin launch the browser
When Admin gives the correct LMS portal URL
Then Admin should see correct spellings in all fields 

Scenario: Verify application name
Given Admin launch the browser
When Admin gives the correct LMS portal URL
Then Admin should see  LMS - Learning Management System


Scenario: Verify company name
Given Admin launch the browser
When Admin gives the correct LMS portal URL
Then Admin should see company name below the app name

Scenario: Validate sign in content
Given Admin launch the browser
When Admin gives the correct LMS portal URL
Then Admin should see "Please login to LMS application"

Scenario: Verify text field present 
Given Admin launch the browser
When Admin gives the correct LMS portal URL 
Then Admin should see two text field

Scenario: verify login button action through keyboard
Given Admin launch the browser and enters LMS portal URL
When Admin enters valid credentials and clicks login through keyboard
Then Admin should land on dashboard page

Scenario Outline: Login Page verification
Given the user is in Login Page
When the user enters the Credentials and click login button 
|id        |pwd    |
| <id>     |<pwd>  |
Then Admin should see the message

Examples:
    | id                             | pwd                | 
    | playwrightuser1@gmail.com      | Playwright@1234    |
    | playwrightuser@gmail.com       | Playwright@123     |
    | playwrightuser12@gmail.com     | Playwrigh!t@1234   |
    | playwrightuser@gmail.com       | Playwright@1234    |






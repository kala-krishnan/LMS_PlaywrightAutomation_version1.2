
Feature: Login Feature
@login
Scenario: Login Page verification
Given the user is in Login Page
When the user enters the username "playwrightuser@gmail.com" and "Playwright@1234"
Then the user navigates to the Dashboard page and get the title for verification


@dashboard
Feature: Dashboard Page

Background:
Given Admin gives correct LMS portal 
When Admin enter valid credentials and clicks login button

Scenario: Verify after login Admin lands on dashboard page
Then Admin should see dashboard

Scenario: Validate navigation bar order 1st program
Then Admin must see "Program" name  in this "first" place

Scenario: Validate navigation bar order 2nd batch
Then Admin able to see "Batch" name  in this "second" place

Scenario: Validate navigation bar order  3rd class
Then Admin should see the "Class" name  in this "third" place

Scenario: Validate navigation bar order 4th logout
Then Admin  see "Logout" name  in this "fourth" place












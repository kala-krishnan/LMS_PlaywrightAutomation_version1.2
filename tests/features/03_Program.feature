@Program
Feature:  Program Feature

Background: Login to LMS
Given the user is in Login Page
When the user enters the username "playwrightuser@gmail.com" and "Playwright@1234"
#Then the user navigates to the Program page and get the title for verification


@TC1
Scenario: Navigation -Verify that Admin is able to navigate to Program module
Given The Admin is on dashboard page after Login
When The Admin clicks "Program" on the navigation bar
Then The Admin should be navigated to Program module

@TC2
Scenario:MenuBar - Verify the buttons on the menu bar
Given The Admin is on dashboard page after Login
When The Admin clicks "Program" on the navigation bar
Then Admin should see Logout in menu bar
Then Admin should see the module names as in order

@TC3
Scenario: Manage Program Page validation - Verify all the elements present in the Manage Program Page	
Given The Admin is on dashboard page after Login
When The Admin clicks "Program" on the navigation bar
Then The Admin validates all the elements present in the Manage Program Page

@AddProgram
Scenario Outline: Verify add New Program
 Given Admin is on Program module
 When Admin clicks on New Program under the Program menu bar
 Then Admin should see window titled "Program Details"
  When Admin enters "<ProgramName>","<ProgramDescription>" and status and clicks on Save button for functionality "<Functionality>"
 
 Then The program "<ProgramName>" is saved successfully
Examples: 
|Functionality|ProgramName| ProgramDescription|
|Valid |ProB| program for beginner level|
|Invalid-ProgName|z|Program Description|
|Invalid-ProgDesc|ProgramPP|z|
|Invalid-already available|ProB|dd|


@EditProgram
Scenario Outline: Verify Edit Program
  Given Admin is on Program module
  When Admin edits "<ProgramName>","<editProgramName>","<editProgramDescription>" and status and clicks on Save button for functionality "<Functionality>"
 
Examples: 
|Functionality|ProgramName| editProgramName|editProgramDescription|
|Valid|ProB| Edited ProgrammeA|edited ProgrammeF for beginner level|

 @DeleteProgram
 Scenario Outline: Manage Program - Delete Program Validations
  Given Admin is on Program module
  When The Admin searches for a program "<ProgramName>"
  Then The Admin does the validations in delete program functionality "<Functionality>"
  Examples:
  |Functionality|ProgramName|
  |Admin clicks on No button|ProB|
  |Admin Click on X button|ProB|
  |Admin succesfully deletes the program|ProB|



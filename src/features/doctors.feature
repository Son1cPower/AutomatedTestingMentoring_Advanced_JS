@Doctors
Feature: Doctors

    @SmokeTest
    @E2Etest
    @UItest
    Scenario Outline: Should add new doctor and check it
        When I open "dashboard" page
        And I click "Doctors" link from the side menu
        And I click add new doctor button from list header
        Then modal window should be displayed

        And I input "<Name>" to doctor "name" in modal window
        And I input "<Phone>" to doctor "phone" in modal window
        And I input "<Email>" to doctor "email" in modal window
        And I input "<Education>" to doctor "education" in modal window
        And I input "<Designation>" to doctor "designation" in modal window


        When I click "save" button in modal window
        Then modal window should not be displayed

        Then Specialist Card ID="<SpecialistCardID>" should 'contain' name "<Name>"
        Then Specialist Card ID="<SpecialistCardID>" should 'be equal to' education "<Education>"

        And I wait 3 seconds

        Examples:
            | SpecialistCardID | Name        | Phone      | Email          | Education                   | Designation |
            | 8                | John Bartel | 0509866161 | test1@test.com | BASIC                       | text 1      |
            | 9                | Eric Manum  | 0999907273 | test2@test.com | MD, DM, FACC, FICC          | text 2      |
            | 10               | Scot Raccel | 0661407777 | test3@test.com | MBBS, DNB (FAMILY MEDICINE) | text 3      |


    @E2Etest
    @UItest
    Scenario: Dashboard page should have "Appointment Planner - Syncfusion Angular Components Showcase App" title
        When I open "Dashboard" page
        Then Page title should "be equal to" "Appointment Planner - Syncfusion Angular Components Showcase App"
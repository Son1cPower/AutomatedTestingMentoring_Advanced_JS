@Siutes
Feature: Check launches for Launch page

    @E2Etest
    Scenario Outline: Check Siute ID:"<siuteID>" for Launch ID:"<launchesID>"
        Given I LogIn to Report Portal and selected my project
        When I open launch ID:"<launchesID>"
        Then "name" for Siute ID:"<siuteID>" "be equal to" "<name>"
        And "total tests" for Siute ID:"<siuteID>" "be equal to" "<total>"
        And "passed tests" for Siute ID:"<siuteID>" "be equal to" "<passed>"
        And "failed tests" for Siute ID:"<siuteID>" "be equal to" "<failed>"
        And "product bug" for Siute ID:"<siuteID>" "be equal to" "<productBug>"
        And "automation bug" for Siute ID:"<siuteID>" "be equal to" "<automationBug>"
        And "to investigate issue" for Siute ID:"<siuteID>" "be equal to" "<toInvestigate>"


        Examples:
            | launchesID | siuteID | name                    | total | passed | failed | productBug | automationBug | toInvestigate |
            | 5          | 278     | Sharing tests           | 5     | 5      |        |            |               |               |
            | 4          | 142     | Suite with retries      | 1     |        | 1      | 1          |               |               |
            | 4          | 148     | Suite with nested steps | 1     |        | 1      |            | 1             |               |
            | 4          | 160     | beforeSuite             |       |        |        |            |               |               |
            | 4          | 179     | Launch Tests            | 5     | 5      |        |            |               |               |
            | 4          | 200     | beforeSuite             |       |        |        |            |               | 1             |
            | 4          | 201     | Permission tests        | 5     | 2      | 3      | 3          |               | 1             |



    @SmokeTest
    Scenario Outline: Check total count of Launches and exist Launches IDs
        Given I LogIn to Report Portal and selected my project
        Then total count of Launches should "be equal to" "5"
        And exist Launches IDs should "be equal to" "1, 2, 3, 4, 5"

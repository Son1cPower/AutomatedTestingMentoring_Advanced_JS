@launches
Feature: Check launches for Launche page

    @launches
    Scenario Outline: Check all items for Launches ID:"<launchesID>"
        Given I LogIn to Report Portal and selected my project
        # Given I open login page and LogIn
        # Then Page title should "be equal to" "Report Portal"
        # And I select my project
        # Then Page url should "contain" "project_js"
        # And I open launches on SideBar
        # Then Page url should "contain" "/launches/all"
        When I open launches ID:"<launchesID>"
        Then name for Siute ID:"<siuteID>" "be equal to" "<name>"
        And total tests for Siute ID:"<siuteID>" "be equal to" "<total>"
        And passed tests for Siute ID:"<siuteID>" "be equal to" "<passed>"
        And failed tests for Siute ID:"<siuteID>" "be equal to" "<failed>"
        And product bug for Siute ID:"<siuteID>" "be equal to" "<productBug>"
        And automation bug for Siute ID:"<siuteID>" "be equal to" "<automationBug>"
        And to investigate issue for Siute ID:"<siuteID>" "be equal to" "<toInvestigate>"


        Examples:
            | launchesID | siuteID | name                    | total | passed | failed | productBug | automationBug | toInvestigate |
            | 5          | 278     | Sharing tests           | 5     | 5      |        |            |               |               |
            | 4          | 142     | Suite with retries      | 1     |        | 1      | 1          |               |               |
            | 4          | 148     | Suite with nested steps | 1     |        | 1      |            | 1             |               |
            | 4          | 160     | beforeSuite             |       |        |        |            |               |               |
            | 4          | 179     | Launch Tests            | 5     | 5      |        |            |               |               |
            | 4          | 200     | beforeSuite             |       |        |        |            |               | 1             |
            | 4          | 201     | Permission tests        | 5     | 2      | 3      | 3          |               | 1             |

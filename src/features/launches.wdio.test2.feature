@launches
Feature: Check launches for Launche page

    @launches
    Scenario Outline: Check all items for Launches ID:"<launchesID>"
        Given I LogIn to Report Portal and selected my project
        # Then Page title should "be equal to" "Report Portal"
        # And I select my project
        # Then Page url should "contain" "project_js"
        # And I open launches on SideBar
        # Then Page url should "contain" "/launches/all"
        Then name for Launche ID:"<launchesID>" "be equal to" "<name>"
        And total tests for Launche ID:"<launchesID>" "be equal to" "<total>"
        And passed tests for Launche ID:"<launchesID>" "be equal to" "<passed>"
        And failed tests for Launche ID:"<launchesID>" "be equal to" "<failed>"
        And skipped tests for Launche ID:"<launchesID>" "be equal to" "<skipped>"
        And product bug for Launche ID:"<launchesID>" "be equal to" "<productBug>"
        And automation bug for Launche ID:"<launchesID>" "be equal to" "<automationBug>"
        And system issue for Launche ID:"<launchesID>" "be equal to" "<systemIssue>"
        And to investigate issue for Launche ID:"<launchesID>" "be equal to" "<toInvestigate>"



        Examples:
            | launchesID | name           | total | passed | failed | skipped | productBug | automationBug | systemIssue | toInvestigate |
            | 1          | Demo Api Tests | 10    | 1      | 9      |         |            | 1             | 8           | 5             |
            | 2          | Demo Api Tests | 15    | 5      | 9      | 1       | 1          | 5             | 4           | 8             |
            | 3          | Demo Api Tests | 20    | 10     | 8      | 2       | 4          | 4             |             | 10            |
            | 4          | Demo Api Tests | 25    | 20     | 5      |         | 4          | 1             |             | 2             |
            | 5          | Demo Api Tests | 30    | 30     |        |         |            |               |             |               |



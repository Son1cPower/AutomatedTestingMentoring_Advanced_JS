@Launches
Feature: Check launches for Launch page

    @E2Etest
    Scenario Outline: Check all items for Launch ID:"<launchesID>"
        Given I LogIn to Report Portal and selected my project
        Then "name" for Launch ID:"<launchesID>" "be equal to" "<name>"
        And "total tests" for Launch ID:"<launchesID>" "be equal to" "<total>"
        And "passed tests" for Launch ID:"<launchesID>" "be equal to" "<passed>"
        And "failed tests" for Launch ID:"<launchesID>" "be equal to" "<failed>"
        And "skipped tests" for Launch ID:"<launchesID>" "be equal to" "<skipped>"
        And "product bug" for Launch ID:"<launchesID>" "be equal to" "<productBug>"
        And "automation bug" for Launch ID:"<launchesID>" "be equal to" "<automationBug>"
        And "system issue" for Launch ID:"<launchesID>" "be equal to" "<systemIssue>"
        And "to investigate issue" for Launch ID:"<launchesID>" "be equal to" "<toInvestigate>"



        Examples:
            | launchesID | name           | total | passed | failed | skipped | productBug | automationBug | systemIssue | toInvestigate |
            | 1          | Demo Api Tests | 10    | 1      | 9      |         |            | 1             | 8           | 5             |
            | 2          | Demo Api Tests | 15    | 5      | 9      | 1       | 1          | 5             | 4           | 8             |
            | 3          | Demo Api Tests | 20    | 10     | 8      | 2       | 4          | 4             |             | 10            |
            | 4          | Demo Api Tests | 25    | 20     | 5      |         | 4          | 1             |             | 2             |
            | 5          | Demo Api Tests | 30    | 30     |        |         |            |               |             |               |



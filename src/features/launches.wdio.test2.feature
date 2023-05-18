@launches
Feature: Check launches for Launche page

    @launches
    Scenario Outline: Check all items for Launches ID
        # Given I open login page and LogIn
        # Then Page title should "be equal to" "Report Portal"
        # And I select my project
        # Then Page url should "contain" "project_js"
        # And I open launches on SideBar
        # Then Page url should "contain" "/launches/all"
        And Name for Launche ID:"<launchesID>" "be equal to" "<name>"
        # And exist Launches IDs should "be equal to" "<ExistLaunchesIDs>"





        Examples:
            | launchesID | name           | total | passed | failed | skipped | productBug | automationBug | systemIssue | toInvestigate |
            | 1          | Demo Api Tests | 10    | 1      | 9      |         | 1          |               | 8           | 5             |
            | 2          | Demo Api Tests | 15    | 5      | 9      | 1       | 1          | 5             | 4           | 8             |
            | 3          | Demo Api Tests | 20    | 10     | 8      | 2       | 4          | 4             |             | 10            |
            | 4          | Demo Api Tests | 25    | 20     | 5      |         | 4          | 1             |             | 2             |
            | 5          | Demo Api Tests | 30    | 30     | 8      |         |            |               |             |               |



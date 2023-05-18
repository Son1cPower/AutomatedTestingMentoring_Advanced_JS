@launches
Feature: Launches page

  @launches
  Scenario Outline: Check total count of Launches and exist Launches IDs
    # Given I open login page and LogIn
    # Then Page title should "be equal to" "Report Portal"
    # And I select my project
    # Then Page url should "contain" "project_js"
    # And I open launches on SideBar
    # Then Page url should "contain" "/launches/all"
    And total count of Launches should "be equal to" "<TotalCountOfLaunches>"
    And exist Launches IDs should "be equal to" "<ExistLaunchesIDs>"

    Examples:
      | TotalCountOfLaunches | ExistLaunchesIDs |
      | 5                    | 1, 2, 3, 4, 5    |

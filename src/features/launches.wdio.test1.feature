@SmokeTest
Feature: Launches page

  @E2Etest
  Scenario Outline: Check total count of Launches and exist Launches IDs
    Given I LogIn to Report Portal and selected my project
    Then total count of Launches should "be equal to" "<TotalCountOfLaunches>"
    And exist Launches IDs should "be equal to" "<ExistLaunchesIDs>"

    Examples:
      | TotalCountOfLaunches | ExistLaunchesIDs |
      | 5                    | 1, 2, 3, 4, 5    |

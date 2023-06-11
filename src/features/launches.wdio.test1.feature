@SmokeTest
Feature: Launches page

  @E2Etest
  Scenario: Check total count of Launches and exist Launches IDs
    Given I LogIn to Report Portal and selected my project
    Then total count of Launches should "be equal to" "5"
    And exist Launches IDs should "be equal to" "1, 2, 3, 4, 5"


Feature: Diff editor

    User can easily compare different versions of the schema

    Scenario: User wants to compare two versions
        Given User is in the diff view

        When He selects version on the left
        And User selects version on the right

        Then Differences should be visible in diff editor
        And Both schemas should be sorted Alphabetically
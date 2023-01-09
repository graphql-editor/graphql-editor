Feature: Easiliy create new fields for union node

    The user can use edit mode of the active union node
    Scenario: User wants add an union member field.
        Given User is in the schema graph view edit mode is on and union node is selected
        And there are types in the schema and union node
        When User clicks add field
        And chooses a field
        Then Union field is added to the selected node
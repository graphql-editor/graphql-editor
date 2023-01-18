Feature: Easiliy create new fields and use node editor

    The user can use edit mode of the active node

    Scenario: User wants type to implement interfaces
        Given User is in the schema graph view edit mode is on and node is selected
        And there are interfaces in the schema

        When User clicks Implement interfaces
        And chooses one interface

        Then Interface appears in the interfaces line
        And fields of the interface are added to the selected node

    Scenario: User wants type to be the main Query, Subscription, Mutation
        Given User is in the schema graph view 
        And edit mode is on 
        And node is selected
        And The type of the node is "type"

        When User selects "query"

        Then Schema "query" type is the type of selected node
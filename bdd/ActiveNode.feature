Feature: Easiliy create new fields and use node editor

    The user can use edit mode of the active node
    Scenario: User wants to create a field
        Given User is in the schema graph view edit mode is on and node is selected
        When He clicks create field
        And Writes "firstName"
        And Clicks "Enter"
        Then field of type "String" with name "firstName" is created
    Scenario: User wants main type to implement directives
        Given User is in the schema graph view edit mode is on and node is selected
        And Schema has some directives
        When User clicks add directives
        And Selects the directives
        Then directive is visible and implemented under the title
    Scenario: User wants to expand fields type
        Given User is in the schema graph view edit mode is on and node is selected and expanded node is of different type excluding scalars
        And User clicks expand
        Then new active node appears on top of active selected node
    Scenario: User wants to expand fields type
        Given User is in the schema graph view edit mode is on and node is selected and expanded field is same type that selected node
        Then Expand icon should not be visible
    Scenario: User wants to change field type
        Given User is in the schema graph view edit mode is on and node is selected
        And Selected node has any fields
    Scenario: User wants to change field name
        Given User is in the schema graph view edit mode is on and node is selected
        And Selected node has any fields
        When user clicks on the field name
        And edits it
        And Clicks Enter/Tab or blurs the input
        Then name is changed
    Scenario: User wants to extend node
        Given User is in the schema graph view edit mode is on and node is selected
        When User opens details menu
        And Clicks extend node
        Then new node with same type but extend is created
    Scenario: User wants to edit description
        Given User is in the schema graph view edit mode is on and node is selected
        When User clicks description field
        And Edits the content
        And Clicks Enter/Tab or blurs the input
        Then content is changedf
    
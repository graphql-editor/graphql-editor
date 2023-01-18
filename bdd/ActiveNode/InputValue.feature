Feature: Input Value

    As a user of the GraphQL Editor app, I want to be able to add input values as arguments for fields in my GraphQL scheme,
    so that I can specify additional information for my fields.

    Scenario: Adding an input value to a field
        Given a user has a GraphQL scheme open in the editor
        And some inputs exists

        When the user selects a field in the scheme
        And the user clicks the "+" button to add a new input value
        And the user enters "testValue" as the input value name and selects "Boolean" as the input value type

        Then the selected field should have an input value of "testValue: Boolean" added to it
        And the generated code for the field should include the input value of "testValue: Boolean"

    Scenario: Adding multiple input values to a field
        Given a user has a GraphQL scheme open in the editor

        When the user selects a field in the scheme
        And the user clicks the "+" button to add new input value multiple times
        And the user enters "testValue1" as the first input value name and selects "Boolean" as the input value type
        And the user enters "testValue2" as the second input value name and selects "String" as the input value type

        Then the selected field should have input values of "testValue1: Boolean" and "testValue2: String" added to it
        And the generated code for the field should include the input values of "testValue1: Boolean" and "testValue2: String"


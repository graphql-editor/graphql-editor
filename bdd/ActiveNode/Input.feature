Feature: Input

    As a user of the GraphQL Editor app, I want to be able to create inputs in my GraphQL scheme, so that I can add additional information or functionality to my queries.

    Scenario: Creating an input
        Given a user has a GraphQL scheme open in the editor

        When the user clicks the "+" button to create a new input
        And the user enters "inputName" as the input name and selects "String" as the field type

        Then a new input named "inputName" with a field of type "String" should be added to the scheme
        And the generated code for the input should include the field of type "String"

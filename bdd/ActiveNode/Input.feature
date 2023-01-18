Feature: Input

    As a user of the GraphQL Editor app, I want to be able to create inputs in my GraphQL scheme, so that I can add additional information or functionality to my queries.

    Scenario: Creating an input
        Given a user has a GraphQL scheme open in the editor
        And He is in code pane

        When the user creates input 
        And input name is "submitForm"
        And add field "name" with type String

        Then a new input named "submitForm"  with field "name" should be added to the scheme
        And user should be able to add submitForm input to his nodes

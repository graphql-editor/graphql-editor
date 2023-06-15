Feature: Duplicate Node

    As a user of the GraphQL Editor app, I want to be able to duplicate a node in my GraphQL scheme, so that I can easily create a copy of a node with similar properties.

    Scenario: Duplicating a node
        Given a user has a GraphQL scheme open in the editor with a node present

        When the user selects the node
        And the user clicks the "Duplicate" button

        Then a copy of the selected node should be created in the scheme
        And the generated code for the scheme should include the duplicated node
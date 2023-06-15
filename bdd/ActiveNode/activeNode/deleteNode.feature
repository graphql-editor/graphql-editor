Feature: Delete Node

    As a user of the GraphQL Editor app, I want to be able to delete a node from my GraphQL scheme.

    Scenario: Deleting a node
        Given a user has a GraphQL scheme open in the editor with a node present

        When the user selects the node
        And the user clicks the "Delete" button

        Then the selected node should be removed from the scheme
        And the generated code for the scheme should no longer include the deleted node
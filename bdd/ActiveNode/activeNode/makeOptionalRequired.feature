Feature: Make All Fields Required/Optional

    As a user of the GraphQL Editor app, I want to be able to make all fields in an active node in my GraphQL scheme required or optional, so that I can easily update the fields in a node.

    Scenario: Making all fields required
        Given a user has a GraphQL scheme open in the editor with an active node

        When the user clicks the "Make All Fields Required" button

        Then all fields in the active node should be updated to be required
        And the generated code for the node should include the "!" symbol after each field to indicate that they are required

    Scenario: Making all fields optional
        Given a user has a GraphQL scheme open in the editor with an active node

        When the user clicks the "Make All Fields Optional" button

        Then all fields in the active node should be updated to be optional
        And the generated code for the node should no longer include the "!" symbol after each field to indicate that they are optional
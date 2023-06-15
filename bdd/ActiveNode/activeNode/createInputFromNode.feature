Feature: Create Input from Node

    As a user of the GraphQL Editor app, I want to be able to create an input object from a node in my GraphQL scheme, so that I can reuse the properties of a node in other parts of my schema.

    Scenario: Creating an input from a node
        Given a user has a GraphQL scheme open in the editor with an active node

        When the user selects the Type node
        And the user clicks the "Create Input" button

        Then an input object should be created in the scheme with the same fields as the selected node
        And the generated code for the scheme should include the new input object
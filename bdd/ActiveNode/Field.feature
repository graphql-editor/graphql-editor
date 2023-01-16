Feature: Field

    As a user of the GraphQL Editor app, I want to be able to add fields to nodes in my GraphQL scheme, so that I can add additional information or functionality to the scheme.

    Scenario: Adding a field to a node
        Given a user has a GraphQL scheme open in the editor

        When the user selects a node in the scheme
        And the user clicks the "+" button to add a new field
        And the user enters "name" as the field name and selects "String" as the field type

        Then the selected node should have a new "name" field of type "String" added to it
        And the generated code in code section for the node should include the "name" field of type "String"

    Scenario: Adding a custom field to a node
        Given a user has a GraphQL scheme open in the editor
        And node with type Person exists in the scheme

        When the user selects a node in the scheme
        And the user clicks the "+" button to add a new field
        And the user enters "randomGuy" as the field name and selects "Person" as the field type

        Then the selected node should have a new "randomGuy" field of type "Person" added to it
        And the generated code in code section for the node should include the "randomGuy" field of type "Person"
Feature: External Library

    As a user of the GraphQL Editor app, I want to be able to add external libraries to my GraphQL scheme, so that I can use pre-built nodes in my scheme.

    Scenario: Viewing external nodes in relation view
        Given a user has a GraphQL scheme open in the editor with external library added

        When the user selects the "Relation Mode" option

        Then the external library nodes should be displayed differently in the relation view(border should be dashed)
        And the external library nodes should be labeled properly
        And the nodes should be read-only
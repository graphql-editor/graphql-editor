Feature: Toggle Scalars

    As a user of the GraphQL Editor app, I want to be able to toggle the display of scalar fields in nodes in the relation view of my GraphQL scheme.

    Scenario: Toggling scalars on
        Given a user has a GraphQL scheme open in the editor

        When the user clicks the "Toggle Scalars"

        Then the scalar fields in nodes should be displayed in the relation view

    Scenario: Toggling scalars off
        Given a user has a GraphQL scheme open in the editor

        When the user clicks the "Toggle Scalars"
        And the scalar fields are currently displayed in the relation view

        Then the scalar fields in nodes should be hidden in the relation view
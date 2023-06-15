Feature: Export to PNG

    As a user of the GraphQL Editor app, I want to be able to export my GraphQL scheme, including all nodes displayed in the relation view, to a PNG image.

    Scenario: Exporting the scheme to a PNG
        Given a user has a GraphQL scheme open in the editor in relation view

        When the user clicks the "Export to PNG" button

        Then the scheme, including all nodes displayed in the relation view, should be exported to a PNG image
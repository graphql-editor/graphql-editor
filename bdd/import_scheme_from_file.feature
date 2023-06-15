Feature: Import scheme from file

    User should be able to upload his scheme from the file

    Scenario: Importing a valid scheme from a file
        Given a user has the GraphQL Editor app open

        When the user clicks the "Import From File" button
        And selects a valid GraphQL scheme file

        Then the scheme from the file should be loaded into the editor
        And the user should be able to view and edit the imported scheme

    Scenario: Importing an invalid scheme from a file
        Given a user has the GraphQL Editor app open

        When the user clicks the "Import From File" button
        And selects an invalid GraphQL scheme file

        Then an error message should be displayed
        And the scheme should not be loaded into the editor
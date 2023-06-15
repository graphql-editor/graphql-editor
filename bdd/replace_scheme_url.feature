Feature: Replace scheme from URL

    The user can import scheme from URL

    Scenario: The user wants to replace scheme from file to his existing project
        Given The user is in project and is more than viewer
        And He has already prepared graphql endpoint
        And user is able to add some headers
        And There is a tool to replace scheme like a input for URL

        When The user input the URL

        Then The scheme should be replaced with the new one
        But If imported schema is wrong, an error message should be displayed
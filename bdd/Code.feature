Feature: Code

    As a user of the GraphQL Editor app, I want to be able to toggle a code section and create my own GraphQL schema, fields, queries, etc by adding code.

    Scenario: Toggling the code section
        Given a user has a GraphQL scheme open in the editor

        When the user clicks the "Toggle Code" button

        Then the code section should be displayed
        And the user should be able to edit the code
        But If user clicks again the "Toggle Code" button
        Then the code section should close

    Scenario: Creating a schema using code
        Given a user has the code section open

        When the user enters the following code:
        '''
        type Query {
        hello: String
        }
        '''
        And the user saves the code

        Then a new schema should be created with a "hello" query of type "String"
        And the node with a "hello" query of type "String" should be displayed in relation mode

    Scenario: Creating nodes using code
        Given a user has the code section open

        When the user enters the following code:
        '''
        type Query {
        hello: String
        }

        interface IPost{
        title: String
        message: String
        }
        '''
        And the user saves the code

        Then a new interface "IPost" should be created with an input value of "title: String" and "message: String"
        And the node with should be displayed in relation mode witch matched fields with the entered code
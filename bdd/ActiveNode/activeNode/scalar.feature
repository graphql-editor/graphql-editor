
Feature: Scalar

    As a user of the GraphQL Editor app, I want to be able to add scalar types to my GraphQL scheme, so that I can specify the type of data that is being passed in my queries and mutations.

    Scenario: Adding a custom scalar to the scheme
        Given a user has a GraphQL scheme open in the editor

        When the user creates a new scalar type in code pane

        Then a new scalar named "customScalar" of type "Scalar" should be added to the scheme
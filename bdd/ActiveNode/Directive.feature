Feature: Directives

    As a user of the GraphQL Editor app, I want to be able to add directives to nodes in my GraphQL scheme, so that I can add additional information or functionality to the scheme.

    Scenario: Adding a key directive to a node
        Given a user has a GraphQL scheme open in the editor

        When the user selects a node in the scheme
        And the user selects the "Add Directive" option
        And the user enters "key" as the directive name

        Then the selected node should have the "key" directive added to it

    Scenario: Adding a extends directive to a node
        Given a user has a GraphQL scheme open in the editor

        When the user selects a node in the scheme
        And the user selects the "Add Directive" option
        And the user enters "extends" as the directive name

        Then the selected node should have the "extends" directive added to it
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

    Scenario: Creating a directive
        Given a user has a GraphQL scheme open in the editor

        When the user clicks the "new node" button to create a new directive
        And the user enters "auth" as the directive name and selects "object" as the placement option
        And the user adds a field "role" of type "String" to the directive

        Then a new directive "auth" with a field "role" of type "String" and placement on "object" should be added to the scheme
        And the generated code for the directive should include the field "role" of type "String"

    Scenario: Creating a directive with multiple placements
        Given a user has a GraphQL scheme open in the editor

        When the user clicks the "new node" button to create a new directive
        And the user enters "auth" as the directive name and selects "object" and "field_definition" as the placement options
        And the user adds a field "role" of type "String" to the directive

        Then a new directive "auth" with a field "role" of type "String" and placement on both "object" and "field_definition" should be added to the scheme
        And the generated code for the directive should include the field "role" of type "String" and the placement options "object" and "field_definition"
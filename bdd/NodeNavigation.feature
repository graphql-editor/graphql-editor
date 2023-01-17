Feature: Easiliy navigate using node navigation

    The user can navigate the nodes in the Node Navigation Pane on the right

    Scenario: User wants to hide/show node navigation
        Given User is in the schema graph view without selected node

        When He clicks toggle node navigation

        Then Node Navigation shows/hide

    Scenario: User wants to search nodes
        Given User is in the any view except full screen code with schema opened

        When He inputs a node name

        Then Nodes are filtered in node navigation

    Scenario: User wants to select a node
        Given User is in the any view except full screen code with schema opened

        When They select a node in node navigation

        Then Node is selected

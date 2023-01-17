Feature: Easiliy navigate using sidebar

    The user can navigate the nodes in the sidebar between docs, graph, code, diff

    Scenario: User wants to hide/show code view
        Given User is in the schema graph view

        When He clicks toggle code

        Then Code pane shows/hide

    Scenario: User wants to see docs view
        Given User has the schema graph view opened

        When He clicks docs view

        Then He is navigated to the docs view

    Scenario: User wants to see diff view
        Given User has the schema graph view opened

        When He clicks diff view

        Then He is navigated to the diff view

    Scenario: User wants to hide/show sidebar
        Given User has the sidebar opened

        When user clicks an arrow caret on the sidebar

        Then Sidebar shrinks

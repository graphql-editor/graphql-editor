Feature: Easiliy navigate in Relation view

    The user can navigate the nodes in relation view

    Scenario: User wants to pan
        Given User is in the schema graph view without selected node

        When He clicks and moves the mouse

        Then View should pan

    Scenario: User wants to zoom with scroll
        Given User is in the schema graph view without selected node

        When He holds Ctrl/Cmd Button
        And Uses Mouse scroll

        Then The view should zoom in and out

    Scenario: User wants to zoom with zoom buttons
        Given User is in the schema graph view without selected node

        When He click + or - on the top bar

        Then The view should zoom in and out

    Scenario: User wants to use scroll to pan
        Given User is in the schema graph view without selected node

        When He uses either mouse vertical scroll or horizontal(touchpad)

        Then The view should pan

    Scenario: User wants to toggle the scalar fields
        Given User is in the schema graph view without selected node

        When He clicks scalars

        Then Scalar fields should disappear from nodes so String Int Id Float Boolean and scalar type

    Scenario: User wants to toggle the enum fields
        Given User is in the schema graph view without selected node

        When He clicks enums

        Then Enum fields should disappear from nodes

    Scenario: User wants to enter the edit mode without selected node
        Given User is in the schema graph view without selected node

        When He clicks edit mode
        And selects a node

        Then Active editable node should appear in the top left corner

    Scenario: User wants to enter the edit mode with selected node
        Given User is in the schema graph view with selected node

        When He clicks edit mode

        Then Active editable node should appear in the top left corner it should hide on another click in edit mode

    Scenario: User sees the new node menu
        Given User is in the schema graph view with edit mode on

        Then New node button should be visible

    Scenario: User doesnt see the new node menu
        Given User is in the schema graph view with edit mode off

        Then New node button should not be visible

    Scenario: User wants to navigate via relation link to the field type
        Given User is in the schema graph view with edit mode off
        And has selected a node

        When User clicks the line connected to the field

        Then It navigates them to the clicked link node

    Scenario: User wants to create a node
        Given User is in the schema graph view with edit mode off

        When He clicks new node
        And Clicks type +
        And Inputs "MyNode"
        And Clicks "Enter"

        Then New node should appear as an active node with new field menu open


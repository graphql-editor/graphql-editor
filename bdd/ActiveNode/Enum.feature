Feature: Easiliy control enum active node

    The user can use edit mode of the active node on enum node

    Scenario: User wants to create a value of an enum

        Given User is in the schema graph view 
        And edit mode is on 
        And enum node is selected

        When He clicks create field

        Then Enum fields get created

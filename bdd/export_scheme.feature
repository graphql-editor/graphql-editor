Feature: Export a scheme

    The user can export a scheme as a .ggl file 

    Scenario: User wants to export a scheme from "scheme-bdd" project
        Given User is in project
        And He is more than a viewer
        And There is a tool to export scheme like button
        
        When He interact with this tool
        
        Then The schema should be exported to file(workspaceName-projectName.ggl) and downloaded
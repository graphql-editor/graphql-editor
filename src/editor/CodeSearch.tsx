import { Selection } from "react-ace";

export interface CodeSearchQuery {
  subject?: string;
  parent?: string;
}

interface AceSelection {
  selectionAnchor: any;
  selectionLead: any;
  doc: any;
}

export function findSelectionQuery(selection: Selection): CodeSearchQuery | undefined {

  const aceSelection = (selection as unknown) as AceSelection;
  if (!aceSelection.selectionAnchor || !aceSelection.selectionLead || !aceSelection.doc) {
    return;
  }
  if (aceSelection.selectionAnchor.row !== aceSelection.selectionLead.row) {
    return;
  }

  const line = aceSelection.doc.$lines[aceSelection.selectionAnchor.row] as string;
  const selStart = Math.min(
    aceSelection.selectionAnchor.column,
    aceSelection.selectionLead.column
  );
  const selEnd = Math.max(aceSelection.selectionAnchor.column, aceSelection.selectionLead.column);

  const attributeLineMatch = line.match(/^\s*(\w+)\s*\:\s*\[?\s*(\w+)\s*\]?\s*$/);
  if (attributeLineMatch) {
    const selectedText = line.substr(selStart, selEnd - selStart);
    if (selectedText.indexOf(':') > -1) {
      return;
    }
    const [, name, value] = attributeLineMatch;
    const colonPos = line.indexOf(':');
    if (selEnd < colonPos) {
      let lineNumber = aceSelection.selectionAnchor.row;
      while (lineNumber >= 0) {
        const analyzedLine = aceSelection.doc.$lines[lineNumber] as string;
        const parentLineMatch = analyzedLine.match(
          /^\s*(?:type|input|scalar){0,1}\s*(\w+)(?:\{|\()\s*$/
        );
        if (parentLineMatch) {
          const [, parentName] = parentLineMatch;
          return {
            parent: parentName,
            subject: name
          };
        }
        lineNumber--;
      }
    }
    if (selStart > colonPos) {
      return {
        subject: value
      };
    }
  }

  const fieldLineMatch = line.match(/^\s*(\w+)\s*\(\s*$$/);
  if (fieldLineMatch) {
    const [, name] = fieldLineMatch;
    return {
      subject: name
    };
  }

  const definitionMatch = line.match(/^\s*(?:type|input|scalar)\s*(\w+)(?:\{|\(){0,1}\s*$/);
  if (definitionMatch) {
    const [, name] = definitionMatch;
    return {
      subject: name
    };
  }
}

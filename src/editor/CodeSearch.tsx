import { Selection } from 'brace';

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
  const selStart = Math.min(aceSelection.selectionAnchor.column, aceSelection.selectionLead.column);
  const selEnd = Math.max(aceSelection.selectionAnchor.column, aceSelection.selectionLead.column);

  const attributeLineMatch = line.match(/^\s*(\w+)\s*\:\s*\[?\s*(\w+)\s*\!?\]?\!?\s*$/);
  const fieldLineMatch = line.match(/^\s*(\w+)\s*\(\s*$$/);
  const definitionMatch = line.match(/^\s*(?:scalar|type|interface|union|enum|input)\s*(\w+)(?:\{|\(){0,1}\s*$/);
  const returnTypeMatch = line.match(/^\s*[^\w]*\s*\:\s*\[?\s*(\w+)\s*\!?\]?\!?\s*$/);

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
          /^\s*(?:scalar|type|interface|union|enum|input){0,1}\s*(\w+)(?:\{|\()\s*$/
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

  if (fieldLineMatch) {
    const [, name] = fieldLineMatch;
    return {
      subject: name
    };
  }

  if (definitionMatch) {
    const [, name] = definitionMatch;
    return {
      subject: name
    };
  }

  if (returnTypeMatch) {
    const [, name] = returnTypeMatch;
    return {
      subject: name
    };
  }
}

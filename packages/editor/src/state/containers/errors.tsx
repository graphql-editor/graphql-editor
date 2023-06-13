import { createContainer } from "unstated-next";
import React, { useEffect, useState } from "react";
import { EditorError } from "@/validation";
import { ErrorItem } from "@/shared/errors/ErrorItem";
const useErrorsStateContainer = createContainer(() => {
  const [codeErrors, setCodeErrors] = useState<EditorError[]>([]);
  const [grafEditorErrors, setGrafEditorErrors] = useState<EditorError[]>([]);
  const [grafErrors, setGrafErrors] = useState<string>();
  const [grafErrorSchema, setGrafErrorSchema] = useState<string>();
  const [errorRowNumber, setErrorRowNumber] = useState<number>();
  const [errorNodeNames, setErrorNodeNames] = useState<string[]>();
  const [errorsItems, setErrorsItems] = useState<JSX.Element[]>();

  const transformCodeError = (errors: EditorError[]) => {
    errors.forEach((a) => {
      if (a.row && a.row < 0) {
        a.row = undefined;
        a.column = undefined;
        a.position = undefined;
        a.libraryError = "Already defined in library.";
      }
    });
    return errors;
  };

  useEffect(() => {
    if (codeErrors) {
      const errors = codeErrors.map((e, i) => <ErrorItem key={i} error={e} />);
      setErrorsItems(errors);
    }
  }, [codeErrors]);

  return {
    codeErrors,
    setCodeErrors,
    grafErrors,
    setGrafErrors,
    transformCodeError,
    errorRowNumber,
    setErrorRowNumber,
    errorNodeNames,
    setErrorNodeNames,
    grafEditorErrors,
    setGrafEditorErrors,
    grafErrorSchema,
    setGrafErrorSchema,
    setErrorsItems,
    errorsItems,
  };
});

export const useErrorsState = useErrorsStateContainer.useContainer;
export const ErrorsStateProvider = useErrorsStateContainer.Provider;

import { createContainer } from "unstated-next";
import React, { useEffect, useState } from "react";
import { EditorError } from "@/validation";
import { ErrorItem } from "@/shared/errors/ErrorItem";
const useErrorsStateContainer = createContainer(() => {
  const [codeErrors, setCodeErrors] = useState<EditorError[]>([]);
  const [grafEditorErrors, setGrafEditorErrors] = useState<EditorError[]>([]);
  const [grafErrors, setGrafErrors] = useState<string>();
  const [grafErrorSchema, setGrafErrorSchema] = useState<string>();
  const [lockGraf, setLockGraf] = useState<string>();
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

  const generateErrorsText = () => {
    if (lockGraf) {
      const lockGrafArray = lockGraf.split("}").filter((ee) => ee);
      const errors = lockGrafArray.map((e, i) => (
        <ErrorItem key={i} error={e} />
      ));
      setErrorsItems(errors);
    }
  };

  useEffect(() => {
    generateErrorsText();
  }, [lockGraf]);

  return {
    codeErrors,
    setCodeErrors,
    grafErrors,
    setGrafErrors,
    lockGraf,
    setLockGraf,
    transformCodeError,
    errorRowNumber,
    setErrorRowNumber,
    errorNodeNames,
    setErrorNodeNames,
    grafEditorErrors,
    setGrafEditorErrors,
    grafErrorSchema,
    setGrafErrorSchema,
    generateErrorsText,
    setErrorsItems,
    errorsItems,
  };
});

export const useErrorsState = useErrorsStateContainer.useContainer;
export const ErrorsStateProvider = useErrorsStateContainer.Provider;

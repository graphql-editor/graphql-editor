import { createContainer } from "unstated-next";
import React, { useEffect, useState } from "react";
import { ErrorItem } from "@/shared/errors/ErrorItem";
import { EditorError } from "graphql-editor-worker/lib/validation";
const useErrorsStateContainer = createContainer(() => {
  const [codeErrors, setCodeErrors] = useState<EditorError[]>([]);
  const [errorRowNumber, setErrorRowNumber] = useState<number>();
  const [errorNodeNames, setErrorNodeNames] = useState<string[]>();
  const [errorsItems, setErrorsItems] = useState<JSX.Element[]>();

  useEffect(() => {
    if (codeErrors) {
      const errors = codeErrors.map((e, i) => <ErrorItem key={i} error={e} />);
      setErrorsItems(errors);
    }
  }, [codeErrors]);

  return {
    codeErrors,
    setCodeErrors,
    errorRowNumber,
    setErrorRowNumber,
    errorNodeNames,
    setErrorNodeNames,
    setErrorsItems,
    errorsItems,
  };
});

export const useErrorsState = useErrorsStateContainer.useContainer;
export const ErrorsStateProvider = useErrorsStateContainer.Provider;

import { createContainer } from 'unstated-next';
import { useState } from 'react';
import { EditorError } from '@/validation';
const useErrorsStateContainer = createContainer(() => {
  const [codeErrors, setCodeErrors] = useState<EditorError[]>([]);
  const [grafErrors, setGrafErrors] = useState<string>();
  const [lockGraf, setLockGraf] = useState<string>();
  const [lockCode, setLockCode] = useState<string>();
  const [errorRowNumber, setErrorRowNumber] = useState<number>();

  const transformCodeError = (errors: EditorError[]) => {
    errors.forEach((a) => {
      if (a.row && a.row < 0) {
        a.row = undefined;
        a.column = undefined;
        a.position = undefined;
        a.libraryError = 'Already defined in library.';
      }
    });
    return errors;
  };

  return {
    codeErrors,
    setCodeErrors,
    grafErrors,
    setGrafErrors,
    lockGraf,
    lockCode,
    setLockGraf,
    setLockCode,
    transformCodeError,
    errorRowNumber,
    setErrorRowNumber,
  };
});

export const useErrorsState = useErrorsStateContainer.useContainer;
export const ErrorsStateProvider = useErrorsStateContainer.Provider;

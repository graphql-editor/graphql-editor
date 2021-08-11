import { createContainer } from 'unstated-next';
import { useState } from 'react';
import { EditorError } from '@/validation';
const useErrorsStateContainer = createContainer(() => {
  const [codeErrors, setCodeErrors] = useState<EditorError[]>([]);
  const [grafErrors, setGrafErrors] = useState<string>();
  const [lockGraf, setLockGraf] = useState<boolean>(false);
  const [lockCode, setLockCode] = useState<boolean>(false);
  return {
    codeErrors,
    setCodeErrors,
    grafErrors,
    setGrafErrors,
    lockGraf,
    lockCode,
    setLockGraf,
    setLockCode,
  };
});

export const useErrorsState = useErrorsStateContainer.useContainer;
export const ErrorsStateProvider = useErrorsStateContainer.Provider;

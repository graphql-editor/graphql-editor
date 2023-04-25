import { createContainer } from 'unstated-next';
import { useState } from 'react';

const useRelationsContainer = createContainer(() => {
  const [baseTypesOn, setBaseTypesOn] = useState(true);
  const [inputsOn, setInputsOn] = useState(true);
  const [fieldsOn, setFieldsOn] = useState(true);
  const [editMode, setEditMode] = useState('');

  return {
    setBaseTypesOn,
    baseTypesOn,
    editMode,
    setEditMode,
    fieldsOn,
    setFieldsOn,
    inputsOn,
    setInputsOn,
  };
});

export const useRelationsState = useRelationsContainer.useContainer;
export const RelationsProvider = useRelationsContainer.Provider;

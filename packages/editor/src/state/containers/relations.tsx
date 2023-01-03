import { createContainer } from 'unstated-next';
import { useState } from 'react';

const useRelationsContainer = createContainer(() => {
  const [baseTypesOn, setBaseTypesOn] = useState(true);
  const [enumsOn, setEnumsOn] = useState(true);
  const [editMode, setEditMode] = useState(true);

  return {
    setBaseTypesOn,
    baseTypesOn,
    enumsOn,
    setEnumsOn,
    editMode,
    setEditMode,
  };
});

export const useRelationsState = useRelationsContainer.useContainer;
export const RelationsProvider = useRelationsContainer.Provider;

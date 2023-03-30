import { createContainer } from 'unstated-next';
import { useState } from 'react';

const useRelationsContainer = createContainer(() => {
  const [baseTypesOn, setBaseTypesOn] = useState(true);
  const [editMode, setEditMode] = useState('');

  return {
    setBaseTypesOn,
    baseTypesOn,
    editMode,
    setEditMode,
  };
});

export const useRelationsState = useRelationsContainer.useContainer;
export const RelationsProvider = useRelationsContainer.Provider;

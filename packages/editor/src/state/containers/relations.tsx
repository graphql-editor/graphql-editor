import { createContainer } from 'unstated-next';
import { useState } from 'react';

const useRelationsContainer = createContainer(() => {
  const [baseTypesOn, setBaseTypesOn] = useState(true);
  const [editMode, setEditMode] = useState('');
  const [largeSimulationLoading, setLargeSimulationLoading] = useState(false);

  return {
    setBaseTypesOn,
    baseTypesOn,
    editMode,
    setEditMode,
    largeSimulationLoading,
    setLargeSimulationLoading,
  };
});

export const useRelationsState = useRelationsContainer.useContainer;
export const RelationsProvider = useRelationsContainer.Provider;

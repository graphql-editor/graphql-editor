import { createContainer } from 'unstated-next';
import { useState } from 'react';

const useRelationsContainer = createContainer(() => {
  const [baseTypesOn, setBaseTypesOn] = useState(false);
  const [enumsOn, setEnumsOn] = useState(false);

  return {
    setBaseTypesOn,
    baseTypesOn,
    enumsOn,
    setEnumsOn,
  };
});

export const useRelationsState = useRelationsContainer.useContainer;
export const RelationsProvider = useRelationsContainer.Provider;

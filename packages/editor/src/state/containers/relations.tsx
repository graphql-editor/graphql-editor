import { createContainer } from "unstated-next";
import { useState } from "react";

const useRelationsContainer = createContainer(() => {
  const [baseTypesOn, setBaseTypesOn] = useState(true);
  const [inputsOn, setInputsOn] = useState(true);
  const [fieldsOn, setFieldsOn] = useState(true);
  const [ctrlToZoom, setCtrlToZoom] = useState(true);
  const [editMode, setEditMode] = useState("");
  const [libraryNodesOn, setLibraryNodesOn] = useState(true);
  const [printPreviewActive, setPrintPreviewActive] = useState(false);
  const [printPreviewReady, setPrintPreviewReady] = useState(false);

  return {
    setBaseTypesOn,
    baseTypesOn,
    editMode,
    setEditMode,
    fieldsOn,
    setFieldsOn,
    inputsOn,
    setInputsOn,
    ctrlToZoom,
    setCtrlToZoom,
    libraryNodesOn,
    setLibraryNodesOn,
    printPreviewActive,
    setPrintPreviewActive,
    printPreviewReady,
    setPrintPreviewReady,
  };
});

export const useRelationsState = useRelationsContainer.useContainer;
export const RelationsProvider = useRelationsContainer.Provider;

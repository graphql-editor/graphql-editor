import { createContainer } from "unstated-next";
import { useState } from "react";
import { OmitNodes } from "@/Relation/shared/models";

const useRelationsContainer = createContainer(() => {
  const [baseTypesOn, setBaseTypesOn] = useState(true);
  const [fieldsOn, setFieldsOn] = useState(true);
  const [ctrlToZoom, setCtrlToZoom] = useState(true);
  const [editMode, setEditMode] = useState("");
  const [libraryNodesOn, setLibraryNodesOn] = useState(true);
  const [printPreviewActive, setPrintPreviewActive] = useState(false);
  const [printPreviewReady, setPrintPreviewReady] = useState(false);
  const [omitNodes, setOmitNodes] = useState<OmitNodes>();

  return {
    setBaseTypesOn,
    baseTypesOn,
    editMode,
    setEditMode,
    fieldsOn,
    setFieldsOn,
    ctrlToZoom,
    setCtrlToZoom,
    libraryNodesOn,
    setLibraryNodesOn,
    printPreviewActive,
    setPrintPreviewActive,
    printPreviewReady,
    setPrintPreviewReady,
    omitNodes,
    setOmitNodes,
  };
});

export const useRelationsState = useRelationsContainer.useContainer;
export const RelationsProvider = useRelationsContainer.Provider;

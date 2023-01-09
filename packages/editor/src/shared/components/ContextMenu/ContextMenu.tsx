import React from 'react';
import { useLayer, TriggerProps, LayerProps } from 'react-laag';

export const ContextMenu: React.FC<{
  isOpen: boolean;
  close: () => void;
  Trigger: ({ triggerProps }: { triggerProps: TriggerProps }) => JSX.Element;
  children: ({ layerProps }: { layerProps: LayerProps }) => JSX.Element;
}> = ({ children, Trigger, isOpen, close }) => {
  // helper function to close the menu
  const { renderLayer, triggerProps, layerProps } = useLayer({
    isOpen,
    onOutsideClick: close, // close the menu when the user clicks outside
    auto: true,
    placement: 'bottom-start',
    // automatically find the best placement
  });

  // Again, we're using framer-motion for the transition effect
  return (
    <>
      {Trigger({ triggerProps })}
      {renderLayer(<>{isOpen && children({ layerProps })}</>)}
    </>
  );
};

import React from 'react';
import { style } from 'typestyle';
import { themed } from '@/Theming/utils';
import { fontFamily } from '@/vars';
import { useTheme } from '@/state/containers';

const Interfaces = themed(({ colors }) =>
  style({
    color: colors.interface,
    fontFamily,
    fontSize: 14,
    paddingLeft: 4,
    cursor: 'pointer',
  }),
);

const InterfacesWrapper = style({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
});

const Title = themed(({ backgroundedText }) =>
  style({
    color: backgroundedText,
    fontFamily,
    fontSize: '1vw',
  }),
);

interface InterfacesListI {
  interfacesList: string[];
  setNode: (nodeName: string) => void;
}

export const InterfacesList: React.FC<InterfacesListI> = ({
  interfacesList,
  setNode,
}) => {
  const { theme } = useTheme();

  return (
    <>
      <h3 className={`${Title(theme)}`}>Interfaces</h3>
      <div className={`${InterfacesWrapper}`}>
        {interfacesList.map((name) => (
          <p className={`${Interfaces(theme)}`} onClick={() => setNode(name)}>
            {name}
          </p>
        ))}
      </div>
    </>
  );
};

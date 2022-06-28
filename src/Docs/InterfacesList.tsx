import React from 'react';
import { style } from 'typestyle';
import { themed } from '@/Theming/utils';
import { fontFamily, transition } from '@/vars';
import { useTheme } from '@/state/containers';

const Interfaces = themed(({ colors, text }) =>
  style({
    color: colors.interface,
    fontFamily,
    fontSize: 14,
    padding: `4px 12px`,
    margin: 0,
    marginRight: 4,
    cursor: 'pointer',
    border: `1px solid`,
    borderRadius: 4,
    transition: transition,
    $nest: {
      '&:hover': {
        color: text,
      },
    },
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
          <p
            key={name}
            className={`${Interfaces(theme)}`}
            onClick={() => setNode(name)}
          >
            {name}
          </p>
        ))}
      </div>
    </>
  );
};

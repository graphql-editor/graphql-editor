import { DefaultDiagramTheme, DiagramTheme } from 'graphsource';
import { fontFamily } from '@/vars';
import { themed } from '@/Theming/utils';
import { enrichWithScalarColors } from '@/GraphQL/Compile';
export const theme = themed<DiagramTheme>(
  ({
    colors: {
      colors,
      backgrounds,
      background: { mainFurthest, mainFar, mainFurther, mainClose, mainCloser },
      backgroundedText,
      text,
      info,
      success,
      grey: { greyFurther, greyFurthest, greyCloser },
      hover,
    },
  }) => ({
    ...DefaultDiagramTheme,
    fontFamily,
    node: {
      ...DefaultDiagramTheme.node,
      nameSize: 25,
      typeSize: 21,
      width: 280,
      spacing: {
        ...DefaultDiagramTheme.node.spacing,
      },
    },
    description: {
      ...DefaultDiagramTheme.description,
    },
    help: {
      ...DefaultDiagramTheme.help,
    },
    colors: {
      background: mainFurthest,
      description: {
        background: mainClose,
        text,
      },
      minimap: {
        background: mainFurther,
        borders: hover,
        node: hover,
        visibleArea: mainFar,
      },
      help: {
        ...DefaultDiagramTheme.colors.help,
      },
      link: {
        main: greyCloser,
        active: hover,
        hover: hover,
      },
      node: {
        ...DefaultDiagramTheme.colors.node,
        background: mainCloser,
        type: text,
        name: backgroundedText,
        hover: {
          type: hover,
        },
        selected: hover,
        types: enrichWithScalarColors(colors),
        backgrounds: enrichWithScalarColors(backgrounds),
        options: {
          required: success,
          array: info,
        },
      },
    },
  }),
);

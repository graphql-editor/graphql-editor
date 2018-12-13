import { style, media } from 'typestyle';

export const Projects = style(
  {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gridGap: 20
  },
  media(
    { maxWidth: 1400 },
    {
      gridTemplateColumns: '1fr 1fr '
    }
  ),
  media(
    { maxWidth: 800 },
    {
      gridTemplateColumns: '1fr'
    }
  )
);

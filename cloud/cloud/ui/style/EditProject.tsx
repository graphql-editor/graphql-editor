import { style } from 'typestyle';

export const EditProject = style({
  display: 'grid',
  gridGap: 10,
  gridTemplateColumns: '1fr 2fr 1fr',
  gridTemplateAreas: `
  "label label shareLabel"
  "name tags share"
  "description description share"
  "publicLabel publicLabel share"
  "public public share"
  "typeLabel typeLabel share"
  "type type share"
  "url url share"
  "header header share"
  "actions actions share"
  `
});
export const Name = style({
  gridArea: 'name',
});
export const Tags = style({
  gridArea: 'tags'
});
export const Description = style({
  gridArea: 'description'
});
export const Type = style({
  gridArea: 'type'
});
export const Url = style({
  gridArea: 'url'
});
export const Header = style({
  gridArea: 'header'
});
export const Public = style({
  gridArea: 'public'
});
export const Actions = style({
  gridArea: 'actions',
  display:'flex',
  flexFlow:'row nowrap',
  justifyContent:'flex-end'
});
export const Share = style({
  gridArea: 'share'
});

export const ShareLabel = style({
  gridArea: 'shareLabel'
});

export const Label = style({
  gridArea: 'label'
});

export const PublicLabel = style({
  gridArea: 'publicLabel'
});

export const TypeLabel = style({
  gridArea: 'typeLabel'
});

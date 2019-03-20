import { style } from 'typestyle';

export const EditTeam = style({
  display: 'grid',
  gridGap: 10,
  gridTemplateColumns: '1fr 1fr 1fr',
  gridTemplateAreas: `
    "name help"
    "addMembers help"
    "members help"
    "actions help"
    `
});

export const Name = style({
  gridArea: 'name',
});
export const AddMembers = style({
  gridArea: 'addMembers',
});
export const Actions = style({
  gridArea: 'actions',
});
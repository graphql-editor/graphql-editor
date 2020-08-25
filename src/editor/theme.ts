import { Colors, mix } from '../Colors';
export const GraphQLColors: Record<string, string> = {
  type: Colors.main[0],
  union: Colors.main[0],
  input: Colors.blue[0],
  scalar: Colors.green[0],
  interface: mix(Colors.blue[0], Colors.grey[0]),
  enum: mix(Colors.blue[0], Colors.main[0]),
  directive: mix(Colors.main[0], Colors.grey[0]),
  extend: Colors.yellow[0],
  String: Colors.green[0],
  Int: Colors.green[0],
  Boolean: Colors.green[0],
  ID: Colors.green[0],
  Float: Colors.green[0],
};

export const GraphQLBackgrounds: Record<string, string> = {
  type: Colors.main[6],
  union: Colors.main[7],
  input: Colors.blue[6],
  scalar: Colors.green[5],
  interface: mix(Colors.blue[6], Colors.grey[3]),
  enum: mix(Colors.blue[6], Colors.main[6]),
  directive: mix(Colors.main[6], Colors.grey[3]),
  extend: Colors.yellow[6],
  String: Colors.green[6],
  Int: Colors.green[6],
  Boolean: Colors.green[6],
  ID: Colors.green[6],
  Float: Colors.green[6],
};

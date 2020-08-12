import { Colors, mix } from '../Colors';
export const GraphQLColors = {
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
} as const;

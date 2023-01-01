[![GraphQLEditor Editor](assets/logo.gif)](https://graphqleditor.com)

[![npm](https://img.shields.io/npm/v/graphql-editor.svg?style=flat-square)](https://www.npmjs.com/package/graphql-editor) [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=flat-square)](http://commitizen.github.io/cz-cli/) [![npm downloads](https://img.shields.io/npm/dt/graphql-editor.svg?style=flat-square)](https://www.npmjs.com/package/graphql-editor)

GraphQLEditor makes it easier to understand GraphQL schemas. Create a schema by using visual blocks system. GraphQL Editor will transform them into code.

With GraphQL Editor you can create visual diagrams without writing any code or present your schema in a nice way!

### Cloud version

Here is a [cloud version](https://graphqleditor.com) of GraphQL Editor.

## SaaS Docs

Here is a [guide](https://guide.graphqleditor.com) for GraphQL Editor SaaS

## How it works

Create GraphQL nodes and connect them to generate a database schema. You can also use builtin text IDE with GraphQL syntax validation

[<img src="assets/demo.gif">](http://graphqleditor.com/)

## Table of contents

- [SaaS Docs](#saas-docs)
- [How it works](#how-it-works)
- [Table of contents](#table-of-contents)
- [License](#license)
- [Installation](#installation)
- [GraphQL SDL Editor](#graphql-sdl-editor)
  - [Usage](#usage)
  - [GraphQLEditor component props](#graphqleditor-component-props)
- [GraphQL Gql Editor](#graphql-gql-editor)
  - [Usage](#usage-1)
  - [GraphQLGqlEditor component props](#graphqlgqleditor-component-props)
- [Support](#support)
- [Team](#team)
- [Underlying Parsing technology](#underlying-parsing-technology)
- [GraphQL Tutorials](#graphql-tutorials)
- [Authors](#authors)

## License

MIT

## Installation

```
npm i -D worker-loader css-loader file-loader webpack
```

```
npm i  graphql-editor react react-dom monaco-editor @monaco-editor/react
```

## GraphQL SDL Editor

### Usage

```tsx
import React, { useState } from 'react';
import { render } from 'react-dom';
import { GraphQLEditor, PassedSchema } from 'graphql-editor';

const schemas = {
  pizza: `
type Query{
	pizzas: [Pizza!]
}
`,
  pizzaLibrary: `
type Pizza{
  name:String;
}
`,
};

export const App = () => {
  const [mySchema, setMySchema] = useState<PassedSchema>({
    code: schemas.pizza,
    libraries: schemas.pizzaLibrary,
  });
  return (
    <div
      style={{
        flex: 1,
        width: '100%',
        height: '100%',
        alignSelf: 'stretch',
        display: 'flex',
        position: 'relative',
      }}
    >
      <GraphQLEditor
        setSchema={(props) => {
          setMySchema(props);
        }}
        schema={mySchema}
      />
    </div>
  );
};

render(<App />, document.getElementById('root'));
```

### GraphQLEditor component props

**GraphQLEditor**

| property      | type                                                  | description                                                                            | required | default   |
| ------------- | ----------------------------------------------------- | -------------------------------------------------------------------------------------- | -------- | --------- |
| schema        | `PassedSchema`                                        | value of the schema                                                                    | true     |           |
| setSchema     | `(props: PassedSchema, isInvalid?: boolean) => void;` | Function to be called when schema is set by the editor                                 | true     |           |
| readonly      | `boolean`                                             | lock editing                                                                           | false    | false     |
| diffSchemas   | `Record<string, string>`                              | Record containing graphql schemas with "name" as a key and graphql schema as a "value" | false    |           |
| theme         | `EditorTheme`                                         | current theme                                                                          |          | MainTheme |
| routeState    | `EditorRoutes`                                        | listen to route changes. Don't bind it with routeState though!                         | false    |           |
| onStateChange | `( r: EditorRoutes ) => void;`                        | on route state changed                                                                 | false    |           |
| onTreeChange  | `(tree: ParserTree) => void`                          | Function that could be fired if tree changes                                           | false    |           |
| placeholder   | `string`                                              | placeholder - empty editor                                                             | false    |           |

**PassedSchema**

| property  | type     | description                    |
| --------- | -------- | ------------------------------ |
| code      | `string` | value of the schema code       |
| libraries | `string` | value of the current libraries |

**ActivePane**

`"relation" | "diagram" | "diff"`

## GraphQL Gql Editor

### Usage

```tsx
import React, { useState } from 'react';
import { render } from 'react-dom';
import { GraphQLEditor, PassedSchema } from 'graphql-editor';

const schema = `
type Query{
	pizzas: [Pizza!]
}
`;

export const App = () => {
  const [gql, setGql] = useState('');
  return (
    <div
      style={{
        flex: 1,
        width: '100%',
        height: '100%',
        alignSelf: 'stretch',
        display: 'flex',
        position: 'relative',
      }}
    >
      <GraphQLGqlEditor
        gql={gql}
        setGql={(gqlString) => setGql(gqlString)}
        schema={{ code: schema }}
      />
    </div>
  );
};

render(<App />, document.getElementById('root'));
```

### GraphQLGqlEditor component props

**GraphQLEditor**

| property    | type                                                  | description                | required | default   |
| ----------- | ----------------------------------------------------- | -------------------------- | -------- | --------- |
| schema      | `PassedSchema`                                        | value of the schema        | true     |           |
| gql         | `string`                                              | value of the gql           | true     |           |
| placeholder | `string`                                              | placeholder - empty editor | false    | undefined |
| setGql      | `(props: PassedSchema, isInvalid?: boolean) => void;` | set value of the gql       | true     | undefined |
| readonly    | `boolean`                                             | lock editing               | false    | false     |
| theme       | `EditorTheme`                                         | current theme              | false    | MainTheme |

## Support

[Join our Discord Channel](https://discord.gg/wVcZdmd)

## Team

[GraphQL Editor Website](https://graphqleditor.com)

## Underlying Parsing technology

Whole graphql-editor parsing stuff is based on underlying [zeus](https://github.com/graphql-editor/graphql-zeus) technology.

## GraphQL Tutorials

[Interactive GraphQL Tutorial](https://app.graphqleditor.com/?step=intro)

[GraphQL Blog](https://blog.graphqleditor.com/)

## Authors

- [Artur Czemiel](https://github.com/aexol)
- [GraphQL Editor](https://graphqleditor.com)
- [Aexol](https://aexol.com)

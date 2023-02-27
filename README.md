[![GraphQLEditor Editor](assets/logo.gif)](https://graphqleditor.com)

<h3 align="center">Graph sorcery, that makes reading GraphQL schemas easier!</h3>
<div align="center">

[![License](https://img.shields.io/badge/license-MIT-blue.svg?style=for-the-badge&label=license)](https://www.apache.org/licenses/LICENSE-2.0.html)
[![stars](https://img.shields.io/github/stars/graphql-editor/graphql-editor?style=for-the-badge&label=stars)](https://github.com/apache/incubator-streampark/stargazers)
[![npm](https://img.shields.io/npm/v/graphql-editor.svg?style=for-the-badge)](https://www.npmjs.com/package/graphql-editor)
[![npm downloads](https://img.shields.io/npm/dt/graphql-editor.svg?style=for-the-badge)](https://www.npmjs.com/package/graphql-editor)
[![Twitter](https://img.shields.io/twitter/follow/GraphQLEditor?label=follow&logo=twitter&style=for-the-badge)](https://twitter.com/GraphQLEditor)

**[Website](https://graphqleditor.com)**&nbsp;&nbsp;|&nbsp;&nbsp;
**[Docs](https://graphqleditor.com/docs)**

![graphql-editor-gif](https://user-images.githubusercontent.com/779748/217845783-0f3c5cc3-d74d-4589-bfcb-79b49664935c.gif)

</div>

GraphQLEditor makes it easier to understand GraphQL schemas. Create a schema by using visual blocks system. GraphQL Editor will transform them into code.

With GraphQL Editor you can create visual diagrams without writing any code or present your schema in a nice way!

## How it works

Create GraphQL nodes and connect them to generate a database schema. You can also use builtin text IDE with GraphQL syntax validation

## 💡 What is GraphQL Editor?

<h4>GraphQL Editor is Graph based system for reading and designing the GraphQL schema</h4>

> GraphQL Editor is a GraphQL visualizer and designer. It allows you to create and display GraphQL schemas as a visual graph.

## 🚀 Features

- Visual GraphQL Editing.
- GraphQL Monaco based IDE
- Selection observer. When node is clicked in visual Graph it automatically scrolls the code to the same node. When cursor is moved in code space
- Automatically bound interfaces. When interface is implemented on type fields of the interface add to the type. If it is already implemented editing interface edits all implementing nodes
- Writing,generating and displaying GraphQL Documentation in markdown. Generating GraphQL docs out of GraphQL descriptions in markdown
- Comparing different versions of GraphQL schemas with special node-sort sorting nodes and its fields to show the real difference in GraphQL Schema on AST omitting line numbers

## Table of contents

- [How it works](#how-it-works)
- [💡 What is GraphQL Editor?](#-what-is-graphql-editor)
- [🚀 Features](#-features)
- [Table of contents](#table-of-contents)
- [License](#license)
- [Installation](#installation)
- [GraphQL SDL Editor](#graphql-sdl-editor)
  - [Usage](#usage)
  - [GraphQLEditor component props](#graphqleditor-component-props)
- [GraphQL Gql Editor](#graphql-gql-editor)
  - [Usage](#usage-1)
  - [GraphQLGqlEditor component props](#graphqlgqleditor-component-props)
  - [GraphQL Embedded Readonly Editor](#graphql-embedded-readonly-editor)
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
  return ( ||
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

### GraphQL Embedded Readonly Editor

If you only want to view the schema and embed it somewhere in your app you can use our embedded editor for that reason

```tsx
import React from 'react';
import { EmbeddedGraphQLEditor } from 'graphql-editor';
import * as schemas from '../schema';

export const embeddedEditor = () => {
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
      <EmbeddedGraphQLEditor
        schema={{
          code: schemas.googleDirectionsNew,
          libraries: '',
        }}
      />
    </div>
  );
};
```

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

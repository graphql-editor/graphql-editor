[![GraphQLEditor Editor](assets/logo.gif)](https://graphqleditor.com)

[![npm](https://img.shields.io/npm/v/graphql-editor.svg?style=flat-square)](https://www.npmjs.com/package/graphql-editor) [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=flat-square)](http://commitizen.github.io/cz-cli/) [![npm downloads](https://img.shields.io/npm/dt/graphql-editor.svg?style=flat-square)](https://www.npmjs.com/package/graphql-editor)

GraphQLEditor makes it easier to understand GraphQL schemas. Create a schema by using visual blocks system. GraphQL Editor will transform them into code.

With GraphQL Editor you can create visual diagrams without writing any code or present your schema in a nice way!

### Cloud version

Here is a [cloud version](https://graphqleditor.com) of GraphQL Editor.

## Docs

Here is a [guide](https://guide.graphqleditor.com) for GraphQL Editor.

## How it works

Create GraphQL nodes and connect them to generate a database schema. You can also use builtin text IDE with GraphQL syntax validation

![demo](assets/demo.gif)

## Table of contents

- [Docs](#docs)
- [How it works](#how-it-works)
- [Table of contents](#table-of-contents)
- [License](#license)
  - [Installation](#installation)
  - [Usage](#usage)
  - [GraphQLEditor component props](#graphqleditor-component-props)
- [Support](#support)
- [Team](#team)
- [Underlying Parsing technology](#underlying-parsing-technology)
- [GraphQL Tutorials](#graphql-tutorials)

## License

MIT

### Installation

```
npm i -D worker-loader css-loader file-loader webpack
```

```
npm i  graphql-editor react react-dom monaco-editor @monaco-editor/react
```

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
        onSchemaChange={(props) => {
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

| property      | type                                                      | description             |
| ------------- | --------------------------------------------------------- | ----------------------- |
| schema        | `PassedSchema`                                            | value of the schema     |
| setSchema     | `(props: PassedSchema, isInvalid?: boolean) => void;`     | set value of the schema |
| readonly      | `boolean`                                                 | lock editing            |
| diffSchemas   | `{ oldSchema: PassedSchema; newSchema: PassedSchema}`     | view state              |
| theme         | `EditorTheme`                                             | current theme           |
| state         | `{ pane: ActivePane, code: boolean }`                     | view state              |
| onStateChange | `( state?:{ pane: ActivePane, code: boolean } ) => void;` | on state changed        |
| onTreeChange  | `(tree: ParserTree) => void`                              | on tree state changed   |

**PassedSchema**

| property  | type     | description                    |
| --------- | -------- | ------------------------------ |
| code      | `string` | value of the schema code       |
| libraries | `string` | value of the current libraries |

**ActivePane**

`"relation" | "diagram" | "hierarchy"`

## Support

[Join our Discord Channel](https://discord.gg/wVcZdmd)

## Team

[GraphQL Editor Website](https://graphqleditor.com)

## Underlying Parsing technology

Whole graphql-editor parsing stuff is based on underlying [zeus](https://github.com/graphql-editor/graphql-zeus) technology.

## GraphQL Tutorials

Interactive GraphQL Tutorial [here](https://app.graphqleditor.com/?step=intro)

GraphQL Editor Guide [here](https://guide.graphqleditor.com/)

GraphQL Blog [here](https://blog.graphqleditor.com/)

[![GraphQLEditor Editor](assets/logo.gif)](https://graphqleditor.com)

[![npm](https://img.shields.io/npm/v/graphql-editor.svg?style=flat-square)](https://www.npmjs.com/package/graphql-editor) [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=flat-square)](http://commitizen.github.io/cz-cli/) [![npm downloads](https://img.shields.io/npm/dt/graphql-editor.svg?style=flat-square)](https://www.npmjs.com/package/graphql-editor)

GraphQLEditor makes it easier to understand GrapHQL schemas. Create a schema by joining visual blocks. GraphQLEditor will transform them into code. With GraphQLEditor you can create visual diagrams without writing any code or present your schema in a nice way!

## How it works

### Create GraphQL Schemas

[![GraphQLEditor Editor](assets/create.gif)](https://app.graphqleditor.com/?visibleMenu=code)

### Explore Large GraphQL Schemas

[![GraphQLEditor Editor](assets/explore.gif)](https://app.graphqleditor.com/explore/github-schema-visualised?visibleMenu=code)

### Live demo

Here is a [live demo](https://graphqleditor.com) example of GraphQLEditor.

## Table of contents
- [How it works](#how-it-works)
  - [Create GraphQL Schemas](#create-graphql-schemas)
  - [Explore Large GraphQL Schemas](#explore-large-graphql-schemas)
  - [Live demo](#live-demo)
- [Table of contents](#table-of-contents)
- [Developer Docs](#developer-docs)
- [License](#license)
- [How It Works](#how-it-works)
- [Develop or use standalone](#develop-or-use-standalone)
  - [Use with schema and make readonly display of graph](#use-with-schema-and-make-readonly-display-of-graph)
  - [Use with schema and make readonly display of graph with code](#use-with-schema-and-make-readonly-display-of-graph-with-code)
- [Support](#support)
- [Contribute](#contribute)
- [Team](#team)
- [Underlying Diagram technology](#underlying-diagram-technology)
- [Underlying Parsing technology](#underlying-parsing-technology)
- [GraphQL Tutorials](#graphql-tutorials)

## Developer Docs

If you wish to contribute docs from `typedoc` are availble on [https://graphql-editor.github.io/graphql-editor/](https://graphql-editor.github.io/graphql-editor/)

## License

MIT

## How It Works

Create GraphQL nodes and connect them to generate a database schema. You can also use builtin text IDE with GraphQL syntax validation

## Develop or use standalone

Install dependencies

```
npm i react react-dom monaco-editor
```

and if you are using webpack

```
npm i -D monaco-editor-webpack-plugin worker-loader css-loader file-loader
```

```
npm i graphql-editor
```

```tsx
import * as React from 'react';
import { render } from 'react-dom';
import { Editor } from '../src/index';

class App extends React.Component<
  {},
  {
    editorVisible: boolean;
  }
> {
  state = {
    editorVisible: true
  };
  render() {
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'grid',
          gridTemplateColumns: this.state.editorVisible ? `auto 1fr` : '1fr',
          gridTemplateRows: '1fr'
        }}
      >
        <Editor editorVisible={this.state.editorVisible} />
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
```

### Use with schema and make readonly display of graph
```tsx
import * as React from 'react';
import { render } from 'react-dom';
import { Editor } from '../src/index';

const schema = `
type Query{
  hello: String!
}
schema{
  query: Query
}
`

class App extends React.Component<
  {},
  {
    editorVisible: boolean;
  }
> {
  state = {
    editorVisible: true
  };
  render() {
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'grid',
          gridTemplateColumns: this.state.editorVisible ? `auto 1fr` : '1fr',
          gridTemplateRows: '1fr'
        }}
      >
      <Editor editorVisible={false} readonly={true} schema={schema} />
      </div>
    );
  }
}
```
### Use with schema and make readonly display of graph with code

Same as in preceeding example but `editorVisible` is true

```tsx
<Editor editorVisible={true} readonly={true} schema={schema} />
```
## Support 

[Join our Slack Channel](https://join.slack.com/t/graphqleditor/shared_invite/enQtNDkwOTgyOTM5OTc1LWI4YjU3N2U5NGVkNzQ2NzY5MGUxMTJiNjFlZDM1Zjc2OWRmNTI0NDM3OWUxYTk4Yjk3MzZlY2QwOWUzZmM2NDI)

## Contribute

For a complete guide to contributing to GraphQL Editor, see the [Contribution Guide](CONTRIBUTING.md).

1.  Fork this repo
2.  Create your feature branch: git checkout -b feature-name
3.  Commit your changes: git commit -am 'Add some feature'
4.  Push to the branch: git push origin my-new-feature
5.  Submit a pull request

## Team 

[GraphQL Editor Website](https://graphqleditor.com)

## Underlying Diagram technology

Whole graphql-editor is based on underlying [diagram](https://github.com/graphql-editor/diagram) technology. We need much more help there feel free to contribute!

## Underlying Parsing technology

Whole graphql-editor parsing stuff is based on underlying [zeus](https://github.com/graphql-editor/graphql-zeus) technology. We need much more help there feel free to contribute!

## GraphQL Tutorials

Best GraphQL tutorials [here](https://blog.graphqleditor.com/top-graphql-tutorials-reviewed-2019)

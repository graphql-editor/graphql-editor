![GraphQLEditor Editor](assets/graphql-header.jpg)

GraphQLEditor makes it easier to understand GrapHQL schemas. Create a schema by joining visual blocks. GraphQLEditor will transform them into code.

With GraphQLEditor you can create visual diagrams without writing any code.

![GraphQLEditor Features: GraphQL Super Easy, Think Visually, No Code Solution, Tool For Business Managers, Complex GraphQL Code, Merge All Query and Mutations](assets/graphql-features.jpg)

## Live Demo [![Tweet](https://img.shields.io/twitter/url/http/shields.io.svg?style=social)](https://twitter.com/intent/tweet?text=First%20visual%20GraphQL%20Editor&url=https://github.com/slothking-online/graphql-editor)

Here is a [live demo](https://app.graphqleditor.com) example of GraphQLEditor.

## Cloud Backend

[GraphQL Editor Website](https://graphqleditor.com)

As cloud backend is coming soon, please do subscribe on our website to stay tuned.

## Setup

Clone the repository

```
$ git clone https://github.com/slothking-online/graphql-editor
$ cd graphql-editor
```

Install with npm package manager

```
$ npm install
```

## Running

```
$ npm run start
```

After that the editor should be running on localhost:
```
http://localhost:1569
```

## How It Works

Create GraphQL nodes and connect them to generate a database schema.

![GraphQLEditor GIF showing how to connect nodes](assets/graphl-features-gif.gif)

To create nodes press and hold *spacebar*, then hover mouse button on chosen category. Click the mouse button on node to create it. Connect nodes with each other.

### Controls

- **Create** - Press and hold *spacebar* and choose *category* » *node* and *Left Mouse Button click*
- **Pan** - Press and hold *Left Mouse Button* and move mouse
- **Move** - Press and hold *Left Mouse Button* on node
- **Rename** - To rename node simply start typing when one node is selected
- **Connect** - Click and hold desired node output and move it to other node's output then release mouse button
  IMPORTANT: Every node is connectable only if it creates a valid schema. Experiment to test it.
- **Node Properties** - Click right mouse button on node
- ⌘/Ctrl + *Left Mouse Button click* - select multiple nodes
- **Delete** - Click *delete* button when node/nodes are selected or right click » *delete*

### Small Tutorial

1.  Create *graph* » *type* node
2.  Rename it to "Cat"
3.  Create *fields* » *"String"* node
4.  Rename it to "name"
5.  Connect "name"

## Contribute

Feel free to contact us and contribute in this GraphQL Editor project. aexol@aexol.com

1.  Fork this repo
2.  Create your feature branch: git checkout -b feature-name
3.  Commit your changes: git commit -am 'Add some feature'
4.  Push to the branch: git push origin my-new-feature
5.  Submit a pull request

![GraphQLEditor Roadmap](assets/roadmap-graphql-header.jpg)
![GraphQLEditor Roadmap Features: Generate Queries For Frontend, GraphQL To Backend, Ready To Use Fake Backend, Backend In One place](assets/roadmap-graphql-features.jpg)

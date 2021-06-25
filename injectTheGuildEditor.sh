#!/bin/bash
git clone https://github.com/the-guild-org/the-guild-components
cp -r the-guild-components/packages/monaco-graphql-editor/src/* src/editor/code/guild
rm -rf the-guild-components
rm src/editor/code/guild/editor/Editor.stories.tsx

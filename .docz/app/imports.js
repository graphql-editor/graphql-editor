export const imports = {
  'index.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "index" */ 'index.mdx'),
  'Components/Editor.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "components-editor" */ 'Components/Editor.mdx'),
  'Examples/FakeTwitterExample.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "examples-fake-twitter-example" */ 'Examples/FakeTwitterExample.mdx'),
  'VisualTool/index.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "visual-tool-index" */ 'VisualTool/index.mdx'),
}

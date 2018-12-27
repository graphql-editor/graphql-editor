export const imports = {
  'Editor.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "editor" */ 'Editor.mdx'),
  'FakerExample.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "faker-example" */ 'FakerExample.mdx'),
  'index.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "index" */ 'index.mdx'),
}

export class DOM {
  static lock = false;
  static panLock = false;
  static classes = {
    node: 'DOMNode',
    nodeSelected: 'DOMSelectedNode',
  };
  static deselectAllNodes() {
    if (DOM.lock) return;
    document.querySelectorAll(`.${DOM.classes.node}`).forEach((n) => n.classList.remove(DOM.classes.nodeSelected));
  }
  static selectNodeByIndex(index: number) {
    if (DOM.lock) return;
    document.querySelectorAll(`.${DOM.classes.node}`).forEach((n, i) => {
      if (i === index) {
        DOM.selectNode(n);
      }
    });
  }
  static selectNode(node: Element) {
    if (DOM.lock) return;
    node.classList.add(DOM.classes.nodeSelected);
  }
}

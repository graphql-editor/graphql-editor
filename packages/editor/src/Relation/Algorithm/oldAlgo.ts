type StackNodeType = {
  value: any;
  next: any;
};
type EdgeType = any;

const StackNode = (value: any): StackNodeType => {
  return {
    value,
    next: null,
  };
};

const Stack = () => {
  let N = 0;
  let first: StackNodeType | null = null;
  const _push = function (x: StackNodeType | null, a: StackNodeType['value']) {
    if (x == null) {
      N++;
      return StackNode(a);
    }
    var oldX = x;
    N++;
    x = StackNode(a);
    x.next = oldX;
    return x;
  };
  const push = function (a: StackNodeType['value']) {
    first = _push(first, a);
  };
  const pop = function () {
    if (first === null) {
      return undefined;
    }
    const oldFirst = first;
    const item = oldFirst.value;
    first = oldFirst.next;
    N--;
    return item;
  };
  const size = () => N;
  const isEmpty = () => N === 0;
  const peep = () => (first === null ? undefined : first.value);
  const toArray = () => {
    const result = [];
    let x = first;
    while (x !== null) {
      result.push(x.value);
      x = x.next;
    }
    return result;
  };
  return {
    push,
    pop,
    size,
    peep,
    toArray,
    isEmpty,
  };
};

export const Graph = function (numberOfVertices: number) {
  let V: number = numberOfVertices;
  const adjList: Array<number[]> = [];
  const nodeInfo: Array<{ label?: string }> = [];
  const edges: Record<string, EdgeType> = {};
  for (let i = 0; i < V; ++i) {
    adjList.push([]);
    nodeInfo.push({});
  }
  const addEdge = function (v: number, w: number) {
    adjList[v].push(w);
    adjList[w].push(v);
    var edge_id = v + '_' + w;
    if (v > w) {
      3;
      edge_id = w + '_' + v;
    }
    edges[edge_id] = Edge(v, w, 0);
  };
  const adj = function (v: number) {
    return adjList[v];
  };
  const node = function (v: number) {
    return nodeInfo[v];
  };
  const edge = function (v: number, w: number) {
    let edge_id = v + '_' + w;
    if (v > w) {
      edge_id = w + '_' + v;
    }
    if (edge_id in edges) {
      return edges[edge_id];
    }
    return null;
  };
  return {
    V,
    addEdge,
    adj,
    node,
    edge,
    edges,
  };
};
const Edge = function (node1: number, node2: number, edgeWeight?: number) {
  let v = node1;
  let w = node2;
  let weight = edgeWeight;
  const either = function () {
    return v;
  };
  const other = function (x: number) {
    return x == v ? w : v;
  };
  const from = function () {
    return v;
  };
  const to = function () {
    return w;
  };
  return {
    either,
    other,
    from,
    to,
    v,
    w,
    weight,
  };
};

export const DepthFirstSearch = function (
  G: ReturnType<typeof Graph>,
  st: number,
) {
  let s = st;
  let V = G.V;
  const marked: boolean[] = [];
  const edgeTo: number[] = [];
  for (var v = 0; v < V; ++v) {
    marked.push(false);
    edgeTo.push(-1);
  }
  const hasPathTo = function (v: number) {
    return marked[v];
  };
  const pathTo = function (v: number) {
    var path = Stack();
    if (v == s) return [v];

    for (var x = v; x != s; x = edgeTo[x]) {
      path.push(x);
    }
    path.push(s);
    return path.toArray();
  };
  const dfs = function (G: ReturnType<typeof Graph>, v: number) {
    marked[v] = true;
    var adj_v = G.adj(v) || 0;
    for (var i = 0; i < adj_v.length; ++i) {
      var w = adj_v[i];
      if (!marked[w]) {
        edgeTo[w] = v;
        dfs(G, w);
      }
    }
  };
  dfs(G, s);
  return {
    dfs,
    pathTo,
    hasPathTo,
  };
};

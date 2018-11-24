type Header = {
  key: string;
  value?: string;
};

type SourceUploadInfo = {
  filename?: string;
  putUrl: string;
  headers?: Header[];
};

type FakerSource = {
  filename?: string;
  contents?: string;
  checksum?: string;
};

type FakerSourceConnection = {
  pageInfo: PageInfo;
  sources?: FakerSource[];
};

type Endpoint = {
  uri?: string;
};

type Namespace = {
  public?: boolean;
  slug?: string;
  projects?: (
    props: {
      last?: string;
      limit?: number;
    }
  ) => ProjectConnection;
};

type User = {
  id?: string;
  namespace?: Namespace;
  username?: string;
};

type Project = {
  name: string;
  id: string;
  owner?: User;
  public?: boolean;
  endpoint?: Endpoint;
  sources?: (
    props: {
      last?: string;
      limit?: number;
    }
  ) => FakerSourceConnection;
  slug?: string;
};

type PageInfo = {
  last?: string;
  limit?: number;
  next?: boolean;
};

type ProjectConnection = {
  pageInfo: PageInfo;
  projects?: Project[];
};

type NewSource = {
  filename?: string;
  contentLength?: number;
  contentType?: string;
  checksum?: string;
};

type Query = {
  listProjects: (
    props: {
      owned?: boolean;
      last?: string;
      limit?: number;
    }
  ) => ProjectConnection;
  getProject: (
    props: {
      project: string;
    }
  ) => Project;
  getUser: (
    props: {
      username: string;
    }
  ) => User;
};

type Mutation = {
  createUser: (
    props: {
      namespace: string;
      public?: boolean;
    }
  ) => User;
  createProject: (
    props: {
      public?: boolean;
      name: string;
    }
  ) => Project;
  updateSources: (
    props: {
      project: string;
      sources?: NewSource[];
    }
  ) => SourceUploadInfo[];
};
type Func<P extends any[], R> = (...args: P) => R;
type ArgsType<F extends Func<any, any>> = F extends Func<infer P, any> ? P : never;

type F<T extends Func<any, any>> = (props: ArgsType<T>[0]) => ReturnType<T>;

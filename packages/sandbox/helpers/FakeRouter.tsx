import { useState } from 'react';
import * as qs from 'query-string';

export interface Routes {
  code?: string;
  pane?: string;
  n?: string;
  a?: string;
}

export const useRouter = () => {
  const resolvePath = () => {
    const { code, pane, n } = qs.default.parse(
      window.location.search,
    ) as Routes;
    return {
      code,
      pane,
      n,
    };
  };

  const [path, setPath] = useState<{ p: Routes; source?: 'internal' }>({
    p: resolvePath(),
  });

  const route = ({
    path = window.location.pathname,
    location = window.location.search,
    fullPath,
  }: {
    path?: string;
    location?: string;
    fullPath?: string;
  }) => {
    const finalPath = `/${fullPath ?? [path, location].join('')}`;
    window.history.pushState({}, '', finalPath);
  };
  const composePath = (r: Routes, p: Routes, skipCleanup?: true) => {
    let path = {
      ...p,
      ...r,
    };

    let fullPath = '';

    const params: string[] = [];
    const iterableParams: Array<keyof Routes> = ['code', 'pane', 'n', 'a'];
    iterableParams
      .filter((ip) => path[ip])
      .forEach((ip) => {
        params.push(`${ip}=${path[ip]}`);
      });
    if (params.length) {
      fullPath += `?${params.join('&')}`;
    }
    return { fullPath, path };
  };

  const changeRoute = (r: Routes, source?: 'internal') => {
    setPath((p) => {
      const { fullPath, path } = composePath(r, p.p);
      route({ fullPath });
      return {
        p: path,
        source,
      };
    });
  };

  return {
    route,
    changeRoute,
    path,
    setPath,
    resolvePath,
  };
};

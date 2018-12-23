import * as ReactGA from 'react-ga';

export class Analytics {
  static init = () => {
    ReactGA.initialize('UA-127595045-4', {
      debug: process.env.NODE_ENV === 'development'
    });
  };
  static page = (path: string) => ReactGA.pageview(path);
  static events = {
    project: (args: Pick<ReactGA.EventArgs, 'action' | 'label'>) => {
      ReactGA.event({
        category: 'projects',
        ...args
      });
    },
    user: (args: Pick<ReactGA.EventArgs, 'action' | 'label'>) => {
      ReactGA.event({
        category: 'user',
        ...args
      });
    },
    faker: (args: Pick<ReactGA.EventArgs, 'action' | 'label'>) => {
      ReactGA.event({
        category: 'faker',
        ...args
      });
    },
    code: (args: Pick<ReactGA.EventArgs, 'action' | 'label'>) => {
      ReactGA.event({
        category: 'code',
        ...args
      });
    },
    ui: (args: Pick<ReactGA.EventArgs, 'action' | 'label'>) => {
      ReactGA.event({
        category: 'ui',
        ...args
      });
    }
  };
}

import * as ReactGA from 'react-ga';

class AnalyticsClass {
  initDone = false;
  init = () => {
    if (this.initDone) {
      return;
    }
    this.initDone = true;
    ReactGA.initialize('UA-127595045-5', {
      debug: process.env.NODE_ENV === 'development'
    });
  };
  page = (path: string) => {
    if (!this.initDone) {
      this.init();
    }
    return ReactGA.pageview(path);
  };
}

export const Analytics = new AnalyticsClass();

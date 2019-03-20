import * as React from 'react';
import { Subscribe } from 'unstated';
import { Cloud } from '../Container';
import { TopBarIcon } from './components';
import { TopBarCustom } from './TopBarCustom';
export type TopBarNewProjectProps = {
};
export class TopBarNewProject extends React.Component<TopBarNewProjectProps> {
  render() {
    return (
      <Subscribe to={[Cloud]}>
        {(cloud: typeof Cloud) => {
          return (
            <TopBarCustom
              left={
                <TopBarIcon
                  onClick={() =>
                    cloud.setState({
                      category: 'my'
                    })
                  }
                  name="arrowLeft"
                />
              }
              center="Create new project +"
            />
          );
        }}
      </Subscribe>
    );
  }
}

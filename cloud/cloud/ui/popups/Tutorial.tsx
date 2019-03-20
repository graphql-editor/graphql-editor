import * as React from 'react';
import { Subscribe } from 'unstated';
import { Cloud } from '../../Container';
import { Popup } from '../components';
import { TutorialsWidget } from '../../Tutorial/Tutorials';
import { lessons } from '../../Tutorial/lessons';
export class Tutorial extends React.Component {
  componentDidMount() {}
  render() {
    return (
      <Subscribe to={[Cloud]}>
        {(cloud: typeof Cloud) => {
          return (
            <Popup onClose={() => cloud.setState({ popup: null })}>
              <TutorialsWidget lessons={lessons} />
            </Popup>
          );
        }}
      </Subscribe>
    );
  }
}

import * as React from 'react';
import { OverlayButton } from '../ui/OverlayButton';
import { Overlay } from '../ui/Overlay';
import { Subscribe } from 'unstated';
import { CloudContainer, Cloud } from '../Container';
import { Project } from 'cloud/ui/Project';

type OverlayMenuState = {
  visible: boolean;
};

export class OverlayMenu extends React.Component<{}, OverlayMenuState> {
  state: OverlayMenuState = {
    visible: false
  };
  render() {
    return (
      <Subscribe to={[CloudContainer]}>
        {(cloud: typeof Cloud) => (
          <React.Fragment>
            <div
              style={{
                display: this.state.visible ? 'none' : 'block',
                position: 'absolute',
                right: 10,
                bottom: 10
              }}
            >
              <OverlayButton
                onClick={() => {
                  this.setState({ visible: !this.state.visible });
                }}
              >{`projects`}</OverlayButton>
            </div>
            {this.state.visible && (
              <Overlay>
                {cloud.state.projects &&
                  cloud.state.projects.projects.map((p) => <Project {...p} />)}
              </Overlay>
            )}
          </React.Fragment>
        )}
      </Subscribe>
    );
  }
}

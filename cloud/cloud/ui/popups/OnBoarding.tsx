import * as React from 'react';
import { Subscribe } from 'unstated';
import { Cloud } from '../../Container';
import { Actions, Popup, ExampleOnPopup } from '../components';
import { Analytics } from '../../analytics';
import * as styles from '../components/style/Popup';
export class OnBoarding extends React.Component {
  componentDidMount() {
    Analytics.events.ui({
      action: 'open',
      label: 'onboarding'
    });
  }
  render() {
    return (
      <Subscribe to={[Cloud]}>
        {(cloud: typeof Cloud) => {
          return (
            <Popup onClose={() => cloud.setState({ popup: null })}>
              <h3>Hello</h3>
              <p>
                If you are new to<b> GraphQL </b>. Try one of our examples or start a tutorial.
              </p>
              <div className={styles.DialogProjects}>
                {cloud.state.cloud.exampleProjects &&
                  cloud.state.cloud.exampleProjects.slice(0, 4).map((ep) => (
                    <ExampleOnPopup
                      key={ep.id}
                      name={ep.name!.slice(0, 13)}
                      onClick={() => {
                        cloud.loadProject(ep);
                      }}
                    />
                  ))}
              </div>
              <h3>Tutorial</h3>
              <p>
                Create your first project with an already implemented <b>mock backend</b> from{' '}
                <b>GraphQL </b>
                code. In this 10 lesson tutorial you will learn basics of <b>GraphQL</b> and using
                our editor.
              </p>
              <Actions>
                <ExampleOnPopup
                  name={`start tutorial`}
                  onClick={() => {
                    cloud.setState({
                      popup: 'tutorial'
                    });
                  }}
                />
              </Actions>
            </Popup>
          );
        }}
      </Subscribe>
    );
  }
}

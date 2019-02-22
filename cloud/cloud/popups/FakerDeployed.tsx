import * as React from 'react';
import { Subscribe } from 'unstated';
import { Cloud } from '../Container';
import { Popup, Actions } from '../ui/Popup';
import { VerticalSpacer } from '../ui/VerticalSpacer';
import { TopButton } from '../ui/TopButton';
export class FakerDeployed extends React.Component {
  render() {
    return (
      <Subscribe to={[Cloud]}>
        {(cloud: typeof Cloud) => {
          return (
            <Popup onClose={() => cloud.setState({ popup: null })}>
              <h2>Success</h2>
              <h3>faker cloud has been deployed</h3>
              <VerticalSpacer height={30} />
              <p>
                Use button below to open your newly created faker graphql cloud. Later on you can
                use Faker Cloud button on top to access faker. Maximum deployment time is 30 seconds.
              </p>
              <Actions>
                <TopButton
                  variant={'PinkFull'}
                  big
                  onClick={() => {
                    cloud.setState({ popup: null });
                  }}
                  target="_blank"
                  href={`https://faker.graphqleditor.com/${
                    cloud.state.currentProject.endpoint.uri
                  }/graphql`}
                >
                  Open URL
                </TopButton>
              </Actions>
            </Popup>
          );
        }}
      </Subscribe>
    );
  }
}

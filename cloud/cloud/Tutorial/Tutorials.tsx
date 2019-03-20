import * as React from 'react';
import { Subscribe } from 'unstated';
import { Cloud } from '../Container';
import { ExampleOnPopup,Actions } from '../ui/components';
import { Lesson } from './Models';
import { TutorialWidget } from './TutorialWidget';
import { findBreakingChanges, buildASTSchema, parse, BreakingChange } from 'graphql';

export interface TutorialsProps {
  lessons: Lesson[];
}
interface TutorialsState {
  currentLesson: number;
  errors?: BreakingChange[];
  done?: boolean;
}

export class TutorialsWidget extends React.Component<TutorialsProps, TutorialsState> {
  state: TutorialsState = {
    currentLesson: 0
  };
  componentDidMount() {}
  render() {
    const { lessons } = this.props;
    const currentLesson = lessons[this.state.currentLesson]
    return (
      <Subscribe to={[Cloud]}>
        {(cloud: typeof Cloud) => {
          return (
            <>
              <TutorialWidget
                lesson={currentLesson}
                number={this.state.currentLesson}
                max={lessons.length}
              />
              <Actions>
                <ExampleOnPopup
                  name={`check`}
                  onClick={() => {
                    const changes = findBreakingChanges(
                      buildASTSchema(parse(currentLesson.schema)),
                      buildASTSchema(parse(cloud.state.code))
                    );
                    if (changes.length > 0) {
                      console.log(changes)
                      this.setState({
                        errors: changes
                      });
                      return;
                    }
                  }}
                />
                <ExampleOnPopup
                  name={`skip`}
                  onClick={() => {
                    this.setState({
                      currentLesson: (this.state.currentLesson + 1) % lessons.length
                    });
                  }}
                />
              </Actions>
            </>
          );
        }}
      </Subscribe>
    );
  }
}

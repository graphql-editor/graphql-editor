import * as React from 'react';
import { Subscribe } from 'unstated';
import { Cloud } from '../Container';
import {  Actions, PopupButton } from '../ui/components';
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
    const currentLesson = lessons[this.state.currentLesson];
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
                <PopupButton
                  name={`check`}
                  type="Green"
                  icon={{
                    name: 'arrowRight'
                  }}
                  onClick={() => {
                    const changes = findBreakingChanges(
                      buildASTSchema(parse(currentLesson.schema)),
                      buildASTSchema(parse(cloud.state.code))
                    );
                    if (changes.length > 0) {
                      this.setState({
                        errors: changes
                      });
                      return;
                    }
                  }}
                />
                <PopupButton
                  name={`skip`}
                  type="Yellow"
                  icon={{
                    name: 'drink'
                  }}
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

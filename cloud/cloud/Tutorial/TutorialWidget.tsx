import * as React from 'react';
import AceEditor from 'react-ace';
import { DialogCode } from '../ui/components/style/Popup';
import { Lesson } from './Models';

export interface TutorialProps {
  lesson: Lesson;
  max: number;
  number: number;
}
interface TutorialState {}

export class TutorialWidget extends React.Component<TutorialProps, TutorialState> {
  state: TutorialState = {};
  componentDidMount() {}
  render() {
    const { name, description, schema, task } = this.props.lesson;
    const { number, max } = this.props;
    return (
      <>
        <h3> {`Lesson ${number + 1}/${max} - ${name}`}</h3>
        <p>{description}</p>{' '}
        <div className={DialogCode}>
          <AceEditor
            ref={(ref) => {}}
            style={{
              background: 'transparent',
              width: 300,
              overflowX: 'visible'
            }}
            mode={'graphqlschema'}
            maxLines={schema.split(/\r\n|\r|\n/).length}
            editorProps={{
              $blockScrolling: Infinity
            }}
            setOptions={{
              showLineNumbers: false,
              highlightActiveLine: false,
              tabSize: 2,
              readOnly: true
            }}
            showGutter={false}
            theme={'twilight'}
            value={schema}
          />
        </div>
        <h3>task</h3>
        <p>{task}</p>
      </>
    );
  }
}

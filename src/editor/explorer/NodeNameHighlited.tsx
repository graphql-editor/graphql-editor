import cx from 'classnames';
import React from 'react';
import * as styles from './style/Explorer';

interface NodeNameHighlightedProps {
  name: string;
  searchPhrase: string;
}

export const NodeNameHighlighted: React.FC<NodeNameHighlightedProps> = ({ name = '', searchPhrase = '' }) => {
  if (!searchPhrase || name.toLowerCase().indexOf(searchPhrase.toLowerCase()) < 0) {
    return <>{name}</>;
  }

  const searchStartIndex = name.toLowerCase().indexOf(searchPhrase.toLowerCase());
  const searchEndIndex = searchStartIndex + searchPhrase.length;

  return (
    <>
      {name.substring(0, searchStartIndex)}
      <span className={cx(styles.Highlight)}>{name.substring(searchStartIndex, searchEndIndex)}</span>
      {name.substr(searchEndIndex)}
    </>
  );
};

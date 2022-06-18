import React, { useState } from 'react';
import { PassedSchema } from '@/Models';
import * as schemas from '../schema';
import { GraphQLGqlEditor } from '@/editor';

export const Gql = () => {
  const [mySchema] = useState<PassedSchema>({
    code: schemas.food,
    libraries: '',
  });
  const [gql, setGql] = useState('');
  return (
    <div
      style={{
        flex: 1,
        width: '100%',
        height: '100%',
        alignSelf: 'stretch',
        display: 'flex',
        position: 'relative',
      }}
    >
      <GraphQLGqlEditor gql={gql} setGql={(e) => setGql(e)} schema={mySchema} />
    </div>
  );
};

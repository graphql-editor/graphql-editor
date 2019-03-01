import { userApi, Cloud } from '../Container';
import { Project, State, NewSource } from '../types/project';
import { Schemas } from '../models';

export const autoSaveProject = (instance: typeof Cloud) => ({
  project,
  schemas
}: {
  project: State<Project>;
  schemas: Pick<Schemas, 'graphql'>;
}) => {
  const files = [
    new File(
      [
        new Blob([schemas.graphql], {
          type: 'application/graphql'
        })
      ],
      'schema.graphql'
    )
  ];
  const sources: {
    file: File;
    source: NewSource;
  }[] = [
    {
      file: files[0],
      source: {
        filename: 'schema.graphql',
        contentLength: files[0].size,
        contentType: 'application/graphql'
      }
    }
  ];
  console.log(`Autosaving: ${project.endpoint.uri}`, schemas.graphql);
  return userApi(instance.state.token)
    .Mutation.updateSources({
      project: project.id,
      sources: sources.map((s) => s.source)
    })({
      filename: true,
      headers: {
        key: true,
        value: true
      },
      putUrl: true
    })
    .then(async (response) =>
      Promise.all(
        response.map(({ putUrl, headers, filename }) =>
          fetch(putUrl, {
            method: 'PUT',
            mode: 'cors',
            headers: headers.reduce((a, b) => {
              a[b.key] = b.value;
              return a;
            }, {}),
            body: sources.find((s) => s.source.filename === filename).file
          })
        )
      )
    );
};

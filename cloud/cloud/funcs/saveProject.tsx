import { userApi, Cloud } from '../Container';
import { Project, State } from '../types/project';
import { NewSource } from '../types';
import { Analytics } from '../analytics';
import { Schemas } from '../models';

export const saveProjectTemplate = (instance: typeof Cloud) => (
  apiFunc: typeof userApi,
  {
    project,
    schemas
  }: {
    project: State<Project>;
    schemas: Schemas;
  }
) => {
  const sm = 'Saving...';
  instance.upStack(sm);
  Analytics.events.project({
    action: 'save'
  });
  const files = [
    new File(
      [
        new Blob([schemas.project], {
          type: 'application/json'
        })
      ],
      'project.json'
    ),
    new File(
      [
        new Blob([schemas.graphql], {
          type: 'application/graphql'
        })
      ],
      'schema.graphql'
    ),
    new File(
      [
        new Blob([schemas.faker], {
          type: 'application/json'
        })
      ],
      'faker.json'
    )
  ];
  const sources: {
    file: File;
    source: NewSource;
  }[] = [
    {
      file: files[0],
      source: {
        filename: 'project.json',
        contentLength: files[0].size,
        contentType: 'application/json'
      }
    },
    {
      file: files[1],
      source: {
        filename: 'schema.graphql',
        contentLength: files[1].size,
        contentType: 'application/graphql'
      }
    },
    {
      file: files[2],
      source: {
        filename: 'faker.json',
        contentLength: files[2].size,
        contentType: 'application/json'
      }
    }
  ];
  return apiFunc(instance.state.token)
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
    .then(async (response) => {
      for (const { putUrl, headers, filename } of response) {
        await fetch(putUrl, {
          method: 'PUT',
          mode: 'cors',
          headers: headers.reduce((a, b) => {
            a[b.key] = b.value;
            return a;
          }, {}),
          body: sources.find((s) => s.source.filename === filename).file
        });
      }
      return instance.deStack(sm);
    });
};

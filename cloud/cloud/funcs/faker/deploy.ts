import { Cloud, fakerUserApi } from '../../Container';
import { NewSource, Project, State } from '../../types/faker';
import { Analytics } from '../../analytics';
import { Schemas } from '../../models';

interface deployFakerProps {
  project: State<Project>;
  schemas: Pick<Schemas, 'faker' | 'graphql'>;
}

export const deployFaker = (instance: typeof Cloud) => ({ project, schemas }: deployFakerProps) => {
  const sm = 'Deploying Faker...';
  instance.upStack(sm);
  Analytics.events.faker({
    action: 'deploy'
  });
  const files = [
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
        filename: 'schema.graphql',
        contentLength: files[0].size,
        contentType: 'application/graphql'
      }
    },
    {
      file: files[1],
      source: {
        filename: 'faker.json',
        contentLength: files[1].size,
        contentType: 'application/json'
      }
    }
  ];
  return fakerUserApi(instance.state.token)
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
      await Promise.all(
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
      );
      return instance.deStack(sm);
    });
};

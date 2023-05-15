import { EditorDialog } from '@/shared/components';
import {
  Button,
  TextField,
  Typography,
  Stack,
  useToasts,
  Checkbox,
} from '@aexol-studio/styling-system';
import React, { useEffect, useState } from 'react';
import {
  buildClientSchema,
  getIntrospectionQuery,
  GraphQLSchema,
  printSchema,
} from 'graphql';

export const ImportSchema: React.FC<{
  onClose: () => void;
  open?: boolean;
  onImport: (schema: string) => void;
}> = ({ onClose, open, onImport }) => {
  const [importURL, setImportURL] = useState('');
  const [proxyImport, setProxyImport] = useState(false);
  const [headers, setHeaders] = useState<[string, string][]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { createToast } = useToasts();

  useEffect(() => {
    if (headers.length) {
      if (headers.length > 1) {
        const lastHeader = headers[headers.length - 1];
        const prevHeader = headers[headers.length - 2];
        if (
          !lastHeader[0] &&
          !prevHeader[0] &&
          !lastHeader[1] &&
          !prevHeader[1]
        ) {
          headers.pop();
          setHeaders([...headers]);
          return;
        }
      }
      const lastHeader = headers[headers.length - 1];
      if (lastHeader[0]) {
        headers.push(['', '']);
        setHeaders([...headers]);
      }
    } else {
      headers.push(['', '']);
      setHeaders([...headers]);
    }
  }, [headers]);

  const loadFromURL = async () => {
    setIsLoading(true);
    const url = importURL;
    const header = Object.fromEntries(headers.filter((h) => h[0] && h[1]));
    try {
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        createToast({
          message: `Please add https:// or http:// at the beggining of your URL we don't want to guess it.`,
          variant: 'error',
        });
        return false;
      }
      const newSchema = await Utils.getFromUrl(
        proxyImport ? proxyUrl(url) : url,
        header,
      );
      createToast({
        message: 'Successfully loaded schema from URL',
        variant: 'success',
      });
      return newSchema;
    } catch (error) {
      createToast({
        message: `${url} is not correct GraphQL endpoint or you don't have access. Might be also CORS issue.`,
        variant: 'error',
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <EditorDialog title="Import schema" onClose={onClose} open={!!open}>
      <Button
        variant="secondary"
        onClick={() => {
          const input = document.createElement('input');
          input.type = 'file';
          input.onchange = (_) => {
            const files = input.files;
            if (files) {
              const f = files[0];
              f.text().then((content) => {
                onImport(content);
                onClose();
              });
            }
          };
          input.click();
        }}
      >
        Upload from file
      </Button>
      <Stack direction="column">
        <TextField
          value={importURL}
          onChange={(e) => {
            setImportURL(e.target.value);
          }}
          fullWidth
          label="https://yourschema.com/graphql"
        />
        <Stack direction="column" gap="1rem">
          <Checkbox
            label="Proxy to avoid CORS"
            checked={proxyImport}
            onChange={() => setProxyImport(!proxyImport)}
          />
          <Typography variant="caption">Headers</Typography>
        </Stack>
        <Stack direction="column">
          {headers.map(([k, v], i) => (
            <Stack key={i} gap="1rem">
              <TextField
                variant="border-bottom"
                label="key"
                value={k}
                onChange={(e) => {
                  headers[i][0] = e.target.value;
                  setHeaders([...headers]);
                }}
              />
              <TextField
                onChange={(e) => {
                  headers[i][1] = e.target.value;
                  setHeaders([...headers]);
                }}
                variant="border-bottom"
                label="value"
                value={v}
              />
            </Stack>
          ))}
        </Stack>
        <Stack justify="end" gap="1rem">
          <Button onClick={onClose} variant="neutral">
            Cancel
          </Button>
          <Button
            showLoading={isLoading}
            disabled={!importURL}
            onClick={() => {
              loadFromURL().then((s) => {
                if (s) {
                  onImport(s);
                  onClose();
                }
              });
            }}
          >
            Import from URL
          </Button>
        </Stack>
      </Stack>
    </EditorDialog>
  );
};
/**
 * Class representing all graphql utils needed in Zeus
 */
export class Utils {
  /**
   * Get GraphQL Schema by doing introspection on specified URL
   */
  static getFromUrl = async (
    url: string,
    header?: Record<string, string>,
    signal?: AbortSignal,
  ): Promise<string> => {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...header,
    };
    const response = await fetch(url, {
      method: 'POST',
      signal: signal,
      headers,
      body: JSON.stringify({ query: getIntrospectionQuery() }),
    });
    const { data, errors } = await response.json();
    if (errors) {
      throw new Error(JSON.stringify(errors));
    }
    const c = buildClientSchema(data);
    return Utils.printFullSchema(c);
  };
  static printFullSchema = (schema: GraphQLSchema): string => {
    const queryType = schema.getQueryType();
    const mutationType = schema.getMutationType();
    const subscriptionType = schema.getSubscriptionType();
    let printedSchema = printSchema(schema);
    const schemaPrintedAtTheBeginning =
      (queryType && queryType.name !== 'Query') ||
      (mutationType && mutationType.name !== 'Mutation') ||
      (subscriptionType && subscriptionType.name !== 'Subscription');

    if (!schemaPrintedAtTheBeginning) {
      const addons = [];
      if (queryType) {
        addons.push(`query: ${queryType.name}`);
      }
      if (mutationType) {
        addons.push(`mutation: ${mutationType.name}`);
      }
      if (subscriptionType) {
        addons.push(`subscription: ${subscriptionType.name}`);
      }
      if (addons.length > 0) {
        printedSchema += `\nschema{\n\t${addons.join(',\n\t')}\n}`;
      }
    }
    printedSchema = printedSchema.replace(/^[*\s]*""""""[*]*$\n/gm, '');
    return printedSchema;
  };
}
const checkIfURLisLocalRegex = new RegExp(
  /^(?:(https?):\/\/)?(localhost|127\.(\d+).*)(?::\d{2,5})?(?:[\/?#]\S*)?$/,
);

const checkIfURLisLocal = (url: string) => checkIfURLisLocalRegex.test(url);

export const proxyUrl = (url: string) => {
  if (checkIfURLisLocal(url)) {
    return url;
  }
  return `https://proxy.graphqleditor.com/?url=${encodeURIComponent(url)}`;
};

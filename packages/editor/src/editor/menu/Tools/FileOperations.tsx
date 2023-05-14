import FileSaver from 'file-saver';
import { parse } from 'graphql';
import { useToasts } from '@aexol-studio/styling-system';

export const useFileOperations = () => {
  const { createToast } = useToasts();
  /**
   * Load a graphql file from file input
   */
  const loadFromFile = (e: React.ChangeEvent<HTMLInputElement>) =>
    new Promise((resolve, reject) => {
      const file = e.target.files?.[0];
      const reader = new FileReader();
      reader.onload = async (f) => {
        const code = f.target?.result as string;
        if (!code) {
          createToast({ message: 'Invalid GraphQL File', variant: 'error' });
          reject();
        }
        try {
          parse(code);
          createToast({
            message: 'Successfully loaded schema from a file',
            variant: 'success',
          });
          resolve(code);
        } catch (error) {
          if (error instanceof Error) {
            createToast({ message: error.message, variant: 'error' });
            reject();
          }
        }
      };
      if (!file) {
        reject();
        return;
      }
      reader.readAsText(file);
    });
  /**
   * Save as graphql file
   */
  const saveToFile = (name: string, content: string) => {
    const filename = `${name}.gql`;
    const file = new File([content], filename, {
      type: 'application/graphql',
    });
    FileSaver.saveAs(file, filename);
  };
  return {
    loadFromFile,
    saveToFile,
  };
};

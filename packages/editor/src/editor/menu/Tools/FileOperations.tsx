import FileSaver from "file-saver";

export const useFileOperations = () => {
  /**
   * Save as graphql file
   */
  const saveToFile = (name: string, content: string) => {
    const filename = `${name}.gql`;
    const file = new File([content], filename, {
      type: "application/graphql",
    });
    FileSaver.saveAs(file, filename);
  };
  return {
    saveToFile,
  };
};

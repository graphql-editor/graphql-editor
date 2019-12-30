const editor = {
  create: () => {
    return {
      dispose: () => {},
    };
  },
};
const languages = {
  register: jest.fn(),
  setLanguageConfiguration: jest.fn(),
  setMonarchTokensProvider: jest.fn(),
};

const monaco = {
  editor,
  languages,
};

module.exports = monaco;

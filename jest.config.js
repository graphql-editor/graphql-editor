module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  testMatch: ['./**/*.test.(ts|tsx)'],
  moduleNameMapper: {
    '\\.worker': '<rootDir>/__mocks__/workerMock.ts',
    'monaco-editor': '<rootDir>/__mocks__/monaco-editor.ts',
    '@/(.*)': ['<rootDir>/src/$1'],
  },
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.json',
    },
  },
  moduleDirectories: ['node_modules'],
};

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  testMatch: ['**/__test__/**/*.spec.(ts|tsx)'],
  moduleNameMapper: {
    '\\.worker': '<rootDir>/__mocks__/workerMock.ts',
  },
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.json',
    },
  },
};

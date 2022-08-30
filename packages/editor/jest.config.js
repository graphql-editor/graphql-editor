module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  testMatch: ['./**/*.test.(ts|tsx)'],
  moduleNameMapper: {
    '@/(.*)': ['<rootDir>/src/$1'],
  },
  globals: {
    'ts-jest': {
      tsConfig: './tsconfig.json',
    },
  },
  moduleDirectories: ['node_modules'],
};

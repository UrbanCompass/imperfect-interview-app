module.exports = {
  moduleFileExtensions: ['ts', 'tsx', 'js', 'mjs'],
  moduleNameMapper: {
    '^@helpers(.*)$': '<rootDir>/test/helpers$1',
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  transform: {
    '^.+\\.tsx?$': '<rootDir>/node_modules/ts-jest',
    '\\.svg$': '<rootDir>/test/transformer.ts',
  },
  testPathIgnorePatterns: ['e2e/', 'test/'],
  snapshotSerializers: ['enzyme-to-json/serializer', 'jest-emotion'],
  collectCoverage: false,
  collectCoverageFrom: ['<rootDir>/src/**/*', '!**/*.spec.*', '!**/*index.*', '!**/corpNav.ts'],
  coveragePathIgnorePatterns: ['/node_modules/'],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  setupFilesAfterEnv: ['<rootDir>/test/init.ts'],
  transformIgnorePatterns: ['<rootDir>/node_modules/.urbancompass.jfrog.io/(?!(@uc)/)'],
  globals: {
    'ts-jest': {
      packageJson: 'package.json',
    },
  },
};

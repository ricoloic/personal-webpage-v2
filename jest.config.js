module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest-setup.js'],
  moduleNameMapper: {
    '\\.svg': '<rootDir>/src/tests/mocks/mockSVG.tsx',
  },
};

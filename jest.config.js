export default {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^(.{1,2}/.*).js$': '$1'
  },
  transform: {
    '^.+.ts$': [
      'ts-jest',
      {
        useESM: true,
        tsconfig: {
          noEmit: true
        }
      }
    ]
  },
  setupFiles: ['<rootDir>/jest.setup.js']
}

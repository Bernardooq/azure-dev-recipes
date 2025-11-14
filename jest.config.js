module.exports = {
  testEnvironment: "node",
  collectCoverage: true,
  collectCoverageFrom: [
    "azure-dev-recipes/routes/**/*.js"
  ],
  coverageThreshold: {
    global: {
      statements: 40,
      branches: 20,
      functions: 30,
      lines: 40
    }
  }
};

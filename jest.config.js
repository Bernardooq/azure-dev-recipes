module.exports = {
  testEnvironment: "node",
  reporters: [
    "default",
    [
      "jest-junit",
      {
        outputDirectory: "test-results",
        outputName: "jest-junit.xml"
      }
    ]
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    "azure-dev-recipes/routes/**/*.js"
  ],
  coverageReporters: ["cobertura", "lcov"],
  coverageDirectory: "coverage",
  coverageThreshold: {
    global: {
      statements: 40,
      branches: 20,
      functions: 30,
      lines: 40
    }
  }
};

import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./",
});

const config: Config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/setupTests.ts"],
  modulePaths: ["<rootDir>", "@/"],
  moduleNameMapper: {
    "^@/store/slices/albumApiSlice$":
      "<rootDir>/src/store/slices/albumApiSlice",
    "^@/store/slices/photosApiSlice$":
      "<rootDir>/src/store/slices/photosApiSlice",
  },
};

export default createJestConfig(config);

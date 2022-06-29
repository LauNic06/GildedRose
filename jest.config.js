"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("ts-jest/utils");
var compilerOptions = require("./tsconfig").compilerOptions;
exports.default = {
    roots: ['<rootDir>/app', '<rootDir>/test/jest'],
    collectCoverage: true,
    coverageDirectory: 'coverage',
    coverageProvider: 'v8',
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    moduleNameMapper: (0, utils_1.pathsToModuleNameMapper)(compilerOptions.paths, { prefix: '<rootDir>/' }),
};

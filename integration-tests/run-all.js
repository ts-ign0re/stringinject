#!/usr/bin/env node
/**
 * Integration tests runner
 * Runs all integration tests to verify package distribution
 */
import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const tests = [
  {
    name: 'Basic Import Test',
    command: 'node basic-import.test.js',
    cwd: __dirname
  },
  {
    name: 'CommonJS Compatibility Test',
    command: 'node test.js',
    cwd: path.join(__dirname, 'cjs-test')
  },
  {
    name: 'ES Module Test',
    command: 'node test.mjs',
    cwd: path.join(__dirname, 'esm-test')
  },
  {
    name: 'TypeScript Definitions Test',
    command: 'npx tsc --noEmit',
    cwd: path.join(__dirname, 'types-test')
  },
  {
    name: 'NPM Package Simulation Test',
    command: 'node test.js',
    cwd: path.join(__dirname, 'npm-simulation')
  }
];

console.log('🚀 Running integration tests...\n');

let passed = 0;
let failed = 0;

for (const test of tests) {
  try {
    console.log(`Running: ${test.name}`);
    execSync(test.command, {
      cwd: test.cwd,
      stdio: 'inherit',
      encoding: 'utf8'
    });
    console.log(`✅ ${test.name} passed\n`);
    passed++;
  } catch (error) {
    console.error(`❌ ${test.name} failed`);
    console.error(error.message);
    console.log('');
    failed++;
  }
}

console.log('📊 Integration Test Results:');
console.log(`✅ Passed: ${passed}`);
console.log(`❌ Failed: ${failed}`);

if (failed > 0) {
  console.log('\n❌ Some integration tests failed!');
  process.exit(1);
} else {
  console.log('\n🎉 All integration tests passed!');
  process.exit(0);
}

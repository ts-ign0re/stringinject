/**
 * Integration test: NPM package simulation
 * This test simulates how the package would work after being installed from npm
 * by creating a symlink to simulate node_modules/@tronin/stringinject
 */
import { execSync } from "child_process";
import { strict as assert } from "assert";
import fs from "fs";
import path from "path";

console.log("🧪 Testing NPM package simulation...");

const currentDir = process.cwd();
const testDir = path.join(currentDir, "integration-tests/npm-simulation");
const nodeModulesDir = path.join(testDir, "node_modules");
const scopeDir = path.join(nodeModulesDir, "@tronin");
const packageDir = path.join(scopeDir, "stringinject");

// Setup: Create node_modules structure
console.log("Setting up npm package simulation...");

// Clean up any existing setup
if (fs.existsSync(nodeModulesDir)) {
  fs.rmSync(nodeModulesDir, { recursive: true, force: true });
}

// Create node_modules/@tronin/stringinject directory structure
fs.mkdirSync(nodeModulesDir, { recursive: true });
fs.mkdirSync(scopeDir, { recursive: true });
fs.mkdirSync(packageDir, { recursive: true });

// Copy package files that would be published to npm
const rootDir = path.join(currentDir, "..", "..");
fs.copyFileSync(
  path.join(rootDir, "package.json"),
  path.join(packageDir, "package.json"),
);
fs.cpSync(path.join(rootDir, "dist"), path.join(packageDir, "dist"), {
  recursive: true,
});

console.log("✅ NPM package structure created");

// Test: Import from the simulated npm package
try {
  process.chdir(testDir);

  // Test basic import as if from npm (using absolute path to avoid module resolution issues)
  const modulePath = path.resolve(
    "./node_modules/@tronin/stringinject/dist/index.js",
  );
  const { default: stringInject } = await import(modulePath);

  // Test functionality
  const result1 = stringInject("Hello {0} from npm!", ["World"]);
  assert.strictEqual(
    result1,
    "Hello World from npm!",
    "NPM simulation basic test failed",
  );
  console.log("✅ NPM simulation basic import works");

  const result2 = stringInject("Package {name} version {version}", {
    name: "@tronin/stringinject",
    version: "2.2.1",
  });
  assert.strictEqual(
    result2,
    "Package @tronin/stringinject version 2.2.1",
    "NPM simulation object test failed",
  );
  console.log("✅ NPM simulation object substitution works");

  // Test that the package.json exports field works correctly
  const packageJson = JSON.parse(
    fs.readFileSync("./node_modules/@tronin/stringinject/package.json", "utf8"),
  );
  assert.strictEqual(
    packageJson.exports,
    "./dist/index.js",
    "Package exports field incorrect",
  );
  assert.strictEqual(
    packageJson.types,
    "dist/index.d.ts",
    "Package types field incorrect",
  );
  console.log("✅ NPM package.json exports are correct");

  // Verify type definitions exist
  const typeDefPath = "./node_modules/@tronin/stringinject/dist/index.d.ts";
  assert.ok(fs.existsSync(typeDefPath), "Type definitions missing");
  console.log("✅ NPM package type definitions exist");

  console.log("✅ All NPM package simulation tests passed!");
} catch (error) {
  console.error("❌ NPM simulation test failed:", error);
  process.exit(1);
} finally {
  // Cleanup
  process.chdir(currentDir);
  if (fs.existsSync(nodeModulesDir)) {
    fs.rmSync(nodeModulesDir, { recursive: true, force: true });
  }
  console.log("✅ NPM simulation cleanup completed");
}

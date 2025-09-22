/**
 * Integration test: CommonJS import compatibility
 * Tests that the package works when imported via require() in a CommonJS context
 */
const { strict: assert } = require('assert');

console.log('🧪 Testing CommonJS compatibility...');

async function testCJSImport() {
  try {
    // Dynamic import of ES module from CommonJS
    const { default: stringInject } = await import('../../dist/index.js');

    // Test basic functionality
    const result1 = stringInject('Hello {0}!', ['CommonJS']);
    assert.strictEqual(result1, 'Hello CommonJS!', 'CJS import failed');
    console.log('✅ CommonJS dynamic import works');

    // Test with object
    const result2 = stringInject('Framework: {type}', { type: 'CommonJS' });
    assert.strictEqual(result2, 'Framework: CommonJS', 'CJS object substitution failed');
    console.log('✅ CommonJS object substitution works');

    console.log('✅ All CommonJS compatibility tests passed!');
  } catch (error) {
    console.error('❌ CommonJS test failed:', error);
    process.exit(1);
  }
}

testCJSImport();

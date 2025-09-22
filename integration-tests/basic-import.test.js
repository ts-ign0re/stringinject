/**
 * Integration test: Basic import from built package
 * This test verifies the package can be imported and used as intended
 */
import stringInject from '../dist/index.js';
import { strict as assert } from 'assert';

console.log('🧪 Testing basic import from built package...');

// Test basic array functionality
const result1 = stringInject('Hello {0}!', ['World']);
assert.strictEqual(result1, 'Hello World!', 'Array substitution failed');
console.log('✅ Array substitution works');

// Test object functionality
const result2 = stringInject('My name is {name}', { name: 'John' });
assert.strictEqual(result2, 'My name is John', 'Object substitution failed');
console.log('✅ Object substitution works');

// Test invalid input handling
const result3 = stringInject(123, ['test']);
assert.strictEqual(result3, false, 'Invalid input handling failed');
console.log('✅ Invalid input handling works');

// Test empty object
const result4 = stringInject('No changes {here}', {});
assert.strictEqual(result4, 'No changes {here}', 'Empty object handling failed');
console.log('✅ Empty object handling works');

console.log('✅ All basic import tests passed!');

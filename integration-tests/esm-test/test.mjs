/**
 * Integration test: ES Module compatibility
 * Tests that the package works correctly with pure ES module imports
 */
import stringInject from '../../dist/index.js';
import { strict as assert } from 'assert';

console.log('🧪 Testing ES Module compatibility...');

// Test default import
const result1 = stringInject('Hello {0}!', ['ESM']);
assert.strictEqual(result1, 'Hello ESM!', 'ESM import failed');
console.log('✅ ES Module default import works');

// Test complex substitution
const result2 = stringInject('User {name} has {count} messages', {
  name: 'Alice',
  count: 42
});
assert.strictEqual(result2, 'User Alice has 42 messages', 'ESM complex substitution failed');
console.log('✅ ES Module complex substitution works');

// Test array with multiple indices
const result3 = stringInject('{0} + {1} = {2}', ['2', '3', '5']);
assert.strictEqual(result3, '2 + 3 = 5', 'ESM multiple array indices failed');
console.log('✅ ES Module multiple array indices work');

// Test edge cases
const result4 = stringInject('No placeholders here', ['unused']);
assert.strictEqual(result4, 'No placeholders here', 'ESM no placeholders failed');
console.log('✅ ES Module no placeholders handling works');

const result5 = stringInject('Missing {placeholder}', { other: 'value' });
assert.strictEqual(result5, 'Missing {placeholder}', 'ESM missing placeholder failed');
console.log('✅ ES Module missing placeholder handling works');

console.log('✅ All ES Module compatibility tests passed!');

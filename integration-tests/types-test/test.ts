/**
 * Integration test: TypeScript definitions
 * Tests that TypeScript can correctly use the type definitions from the built package
 */
import stringInject, { StringInjectData } from '../../dist/index.js';

console.log('🧪 Testing TypeScript definitions...');

// Test with proper types - these should compile without errors
const arrayData: string[] = ['TypeScript', 'works'];
const result1: string = stringInject('Hello {0}, it {1}!', arrayData);

const objectData: Record<string, unknown> = {
  lang: 'TypeScript',
  version: '5.4',
  stable: true,
  rating: 9.5
};
const result2: string = stringInject('Language: {lang} v{version}', objectData);

// Test StringInjectData type
const mixedData1: StringInjectData = ['array', 'data'];
const mixedData2: StringInjectData = { key: 'value' };

const result3: string = stringInject('Array: {0} {1}', mixedData1);
const result4: string = stringInject('Object: {key}', mixedData2);

// Test function overloads
const validResult: string = stringInject('Valid {0}', ['input']);
const invalidResult: string | false = stringInject(123, ['input']); // Should allow false return

// Test with literals for better type checking
const literalResult: string = stringInject('User {name} age {age}', {
  name: 'John',
  age: 30,
  active: true
});

// These should be type-safe
function processTemplate(template: string, data: StringInjectData): string {
  const result = stringInject(template, data);
  if (typeof result === 'string') {
    return result;
  }
  return 'Invalid template';
}

// Test edge cases that should be type-safe
const edgeCase1 = stringInject('', []);
const edgeCase2 = stringInject('no placeholders', {});
const edgeCase3 = stringInject('test', null as any); // Should handle gracefully

console.log('✅ TypeScript definitions compile successfully!');
console.log('Results:', { result1, result2, result3, result4 });

// Export some functions to verify they compile
export { processTemplate };

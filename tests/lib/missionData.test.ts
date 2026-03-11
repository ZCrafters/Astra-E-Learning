import { test, describe } from 'node:test';
import * as assert from 'node:assert';
import { generateCSV } from '../../lib/missionData';

describe('generateCSV', () => {
  test('should generate a CSV string with only headers', () => {
    const template = {
      filename: 'test.csv',
      headers: ['Col1', 'Col2'],
      example: [],
    };
    const result = generateCSV(template);
    assert.strictEqual(result, 'Col1,Col2');
  });

  test('should generate a CSV string with headers and rows', () => {
    const template = {
      filename: 'test.csv',
      headers: ['Name', 'Age', 'City'],
      example: [
        ['Alice', '30', 'New York'],
        ['Bob', '25', 'Los Angeles'],
      ],
    };
    const result = generateCSV(template);
    assert.strictEqual(
      result,
      'Name,Age,City\n"Alice","30","New York"\n"Bob","25","Los Angeles"'
    );
  });

  test('should encapsulate cell data in double quotes', () => {
    const template = {
      filename: 'test.csv',
      headers: ['Title', 'Description'],
      example: [
        ['Item 1', 'Has a comma, inside'],
      ],
    };
    const result = generateCSV(template);
    assert.strictEqual(result, 'Title,Description\n"Item 1","Has a comma, inside"');
  });
});

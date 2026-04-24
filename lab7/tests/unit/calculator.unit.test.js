import {
  divide,
  formatProductName,
  isPositive,
  multiply,
  subtract
} from '../../src/helpers/calculator';

describe('calculator helpers', () => {
  test('subtract returns the difference between two numbers', () => {
    expect(subtract(10, 4)).toBe(6);
  });

  test('multiply returns the product of two numbers', () => {
    expect(multiply(7, 6)).toBe(42);
  });

  test('divide returns the quotient of two numbers', () => {
    expect(divide(20, 5)).toBe(4);
  });

  test('divide throws when divisor is zero', () => {
    expect(() => divide(10, 0)).toThrow('Cannot divide by zero');
  });

  test('isPositive returns true only for numbers greater than zero', () => {
    expect(isPositive(5)).toBe(true);
    expect(isPositive(0)).toBe(false);
    expect(isPositive(-3)).toBe(false);
  });

  test('formatProductName trims, normalizes spaces, and uppercases names', () => {
    expect(formatProductName('  Sauce   Labs Backpack  ')).toBe('SAUCE LABS BACKPACK');
  });
});

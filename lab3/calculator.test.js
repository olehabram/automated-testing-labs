import { subtract, multiply, divide } from './calculator';

describe('subtract', () => {
  test('subtracts positive numbers', () => {
    expect(subtract(10, 4)).toBe(6);
  });

  test('subtracts negative numbers', () => {
    expect(subtract(-10, -4)).toBe(-6);
  });

  test('subtracts zero', () => {
    expect(subtract(10, 0)).toBe(10);
  });

  test('returns zero for equal values', () => {
    expect(subtract(7, 7)).toBe(0);
  });

  test('subtracts a larger value from a smaller value', () => {
    expect(subtract(3, 8)).toBe(-5);
  });
});

describe('multiply', () => {
  test('multiplies positive numbers', () => {
    expect(multiply(6, 7)).toBe(42);
  });

  test('multiplies negative numbers', () => {
    expect(multiply(-6, -7)).toBe(42);
  });

  test('multiplies by zero', () => {
    expect(multiply(6, 0)).toBe(0);
  });

  test('multiplies equal values', () => {
    expect(multiply(5, 5)).toBe(25);
  });

  test('multiplies positive and negative numbers', () => {
    expect(multiply(6, -7)).toBe(-42);
  });
});

describe('divide', () => {
  test('divides positive numbers', () => {
    expect(divide(20, 4)).toBe(5);
  });

  test('divides negative numbers', () => {
    expect(divide(-20, -4)).toBe(5);
  });

  test('divides zero by a number', () => {
    expect(divide(0, 4)).toBe(0);
  });

  test('divides equal values', () => {
    expect(divide(9, 9)).toBe(1);
  });

  test('returns Infinity when dividing by zero', () => {
    expect(divide(10, 0)).toBe(Infinity);
  });
});

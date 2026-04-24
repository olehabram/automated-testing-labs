export const subtract = (a, b) => a - b;

export const multiply = (a, b) => a * b;

export const divide = (a, b) => {
  if (b === 0) {
    throw new Error('Cannot divide by zero');
  }

  return a / b;
};

export const isPositive = (number) => number > 0;

export const formatProductName = (name) => name.trim().replace(/\s+/g, ' ').toUpperCase();

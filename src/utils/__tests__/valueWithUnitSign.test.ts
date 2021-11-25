import { valueWithUnitSign } from '../valueWithUnitSign';

test('With integer number', () => {
  expect(valueWithUnitSign(5, 'USD')).toBe('$5');
});

test('With float number', () => {
  expect(valueWithUnitSign(23.2342, 'GBP')).toBe('£23.2342');
});

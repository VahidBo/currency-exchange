import React from 'react';
import renderer from 'react-test-renderer';
import { ExchangeRate } from '../ExchangeRate';
import { TestNBP } from '../../../utils/TestNBP';

test('Snapshot of ExchangeRate', () => {
  const tree = renderer
    .create(
      <TestNBP>
        <ExchangeRate rate={0.23422} toCurrency="EUR" fromCurrency="GBP" />
      </TestNBP>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('Snapshot of ExchangeRate in loading state', () => {
  const tree = renderer
    .create(
      <TestNBP>
        <ExchangeRate rate={null} toCurrency="EUR" fromCurrency="GBP" />
      </TestNBP>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

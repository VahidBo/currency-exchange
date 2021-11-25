import React from 'react';
import renderer from 'react-test-renderer';
import { Balance } from '../Balance';
import { TestNBP } from '../../../utils/TestNBP';

test('Snapshot of Balance with 200 USD', () => {
  const tree = renderer
    .create(
      <TestNBP>
        <Balance value={200} currency="USD" />
      </TestNBP>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('Snapshot of Balance with 150 EUR', () => {
  const tree = renderer
    .create(
      <TestNBP>
        <Balance value={150} currency="EUR" />
      </TestNBP>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

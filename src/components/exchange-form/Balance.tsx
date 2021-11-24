import React from 'react';
import { Currency } from './types';
import { Badge, Text } from 'native-base';
import { valueWithUnitSign } from '../../utils';

export interface BalanceProps {
  value: number;
  currency: Currency;
}

export function Balance({ value, currency }: BalanceProps) {
  return (
    <Badge
      colorScheme="info"
      rounded="full"
      mb={2}
      borderColor="indigo.700"
      width="80%"
      height={12}
      justifyContent="center"
    >
      <Text fontSize="xl" color="indigo.900">
        Balance:{' '}
        <Text bold fontSize="xl">
          {valueWithUnitSign(value, currency)}
        </Text>
      </Text>
    </Badge>
  );
}

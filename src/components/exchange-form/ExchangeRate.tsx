import React from 'react';
import { Currency } from './types';
import { Badge, Box, Divider, Spinner } from 'native-base';
import { StyleSheet } from 'react-native';
import { valueWithUnitSign } from '../../utils';

export interface ExchangeRateProps {
  rate: number | null;
  fromCurrency: Currency;
  toCurrency: Currency;
}

export function ExchangeRate({ rate, fromCurrency, toCurrency }: ExchangeRateProps) {
  return (
    <Box height={100} width="100%" display="flex" alignItems="center" justifyContent="center">
      <Divider my="10" bg="indigo.500" />
      <Badge
        colorScheme="indigo.500"
        variant="outline"
        style={styles.badge}
        _text={{ fontSize: 14, color: 'indigo.500' }}
      >
        {rate ? (
          <>{`${valueWithUnitSign(1, fromCurrency)} = ${valueWithUnitSign(rate, toCurrency)}`}</>
        ) : (
          <Spinner color="indigo.500" />
        )}
      </Badge>
    </Box>
  );
}

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    backgroundColor: 'white',
    borderRadius: 14,
    minWidth: '40%',
  },
});

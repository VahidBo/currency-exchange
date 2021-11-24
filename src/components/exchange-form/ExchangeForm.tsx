import { CurrencyInput } from './CurrencyInput';
import React, { useCallback, useEffect, useState } from 'react';
import { Currency } from './types';
import { Box, Button, Center, Image } from 'native-base';
import { Balance } from './Balance';
import { ExchangeRate } from './ExchangeRate';
import { getExchangeRate } from '../../api/getExchangeRate';

const INITIAL_BALANCES = { USD: 200, EUR: 150, GBP: 10 };

export function ExchangeForm() {
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);
  const [fromCurrency, setFromCurrency] = useState<Currency>('USD');
  const [toCurrency, setToCurrency] = useState<Currency>('EUR');
  const [fromValue, setFromValue] = useState(0);
  const [toValue, setToValue] = useState(0);
  const [balances, setBalances] = useState(INITIAL_BALANCES);

  useEffect(() => {
    getExchangeRate(fromCurrency, toCurrency).then(resp => {
      setExchangeRate(Object.values(resp)[0] as number);
    });
  }, [fromCurrency, toCurrency, setExchangeRate]);

  const onExchangeButtonPressed = useCallback(() => {
    const newFromBalance = balances[fromCurrency] - fromValue;
    const newToBalance = balances[toCurrency] + toValue;
    setBalances(currentBalances => ({
      ...currentBalances,
      [fromCurrency]: newFromBalance,
      [toCurrency]: newToBalance,
    }));
  }, [balances, fromCurrency, fromValue, toCurrency, toValue]);

  const onFromValueChanged = useCallback(
    (value: number) => {
      if (exchangeRate) {
        setFromValue(value);
        setToValue(value * exchangeRate);
      }
    },
    [exchangeRate],
  );

  const onToValueChanged = useCallback(
    (value: number) => {
      if (exchangeRate) {
        setToValue(value);
        setFromValue(value / exchangeRate);
      }
    },
    [exchangeRate],
  );

  return (
    <>
      <Center py={6}>
        <Image size="150" mb={6} source={require('../../assets/images/exchange.png')} />
        <Balance value={balances[fromCurrency]} currency={fromCurrency} />
        <CurrencyInput
          currency={fromCurrency}
          setCurrency={setFromCurrency}
          value={fromValue}
          setValue={onFromValueChanged}
          type="from"
        />
        <ExchangeRate rate={exchangeRate} fromCurrency={fromCurrency} toCurrency={toCurrency} />
        <Balance value={balances[toCurrency]} currency={toCurrency} />
        <CurrencyInput
          currency={toCurrency}
          setCurrency={setToCurrency}
          value={toValue}
          setValue={onToValueChanged}
          type="to"
        />
      </Center>
      <Box width="100%" height={16} borderColor="coolGray.200" borderWidth={1} p={2} bottom={0} position="absolute">
        <Button
          size={12}
          width="100%"
          rounded="full"
          onPress={onExchangeButtonPressed}
          bg="indigo.700"
          _text={{ fontSize: 18 }}
        >
          Exchange
        </Button>
      </Box>
    </>
  );
}

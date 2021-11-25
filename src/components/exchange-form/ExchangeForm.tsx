import { CurrencyInput } from './CurrencyInput';
import React, { useCallback, useState } from 'react';
import { Currency } from './types';
import { Box, Button, Center, Image, ScrollView } from 'native-base';
import { Balance } from './Balance';
import { ExchangeRate } from './ExchangeRate';
import { useExchangeRate } from '../../api';

const INITIAL_BALANCES = { USD: 200, EUR: 150, GBP: 10 };

export function ExchangeForm() {
  const [fromCurrency, setFromCurrency] = useState<Currency>('USD');
  const [toCurrency, setToCurrency] = useState<Currency>('EUR');
  const [fromValue, setFromValue] = useState(0);
  const [toValue, setToValue] = useState(0);
  const [exceedsBalance, setExceedsBalance] = useState(false);
  const [balances, setBalances] = useState(INITIAL_BALANCES);

  const exchangeRate = useExchangeRate(fromCurrency, toCurrency);

  const onExchangeButtonPressed = useCallback(() => {
    const newFromBalance = balances[fromCurrency] - fromValue;
    const newToBalance = balances[toCurrency] + toValue;
    setBalances(currentBalances => ({
      ...currentBalances,
      [fromCurrency]: newFromBalance,
      [toCurrency]: newToBalance,
    }));
    setToValue(0);
    setFromValue(0);
  }, [balances, fromCurrency, fromValue, toCurrency, toValue]);

  const onFromValueChanged = useCallback(
    (value: number) => {
      if (exchangeRate) {
        setFromValue(value);
        setToValue(value * exchangeRate);
        if (value > balances[fromCurrency]) {
          setExceedsBalance(true);
        } else {
          setExceedsBalance(false);
        }
      }
    },
    [exchangeRate, balances, fromCurrency],
  );

  const onToValueChanged = useCallback(
    (value: number) => {
      if (exchangeRate) {
        setToValue(value);
        setFromValue(value / exchangeRate);
        if (value / exchangeRate > balances[fromCurrency]) {
          setExceedsBalance(true);
        } else {
          setExceedsBalance(false);
        }
      }
    },
    [exchangeRate, balances, fromCurrency],
  );

  return (
    <>
      <ScrollView bg="white">
        <Center pb={10} pt={20} mb={20}>
          <Image width={204} height={45} mb={20} source={require('../../assets/images/xCoinsLogo.png')} />
          <Balance value={balances[fromCurrency]} currency={fromCurrency} />
          <CurrencyInput
            currency={fromCurrency}
            setCurrency={setFromCurrency}
            value={fromValue}
            setValue={onFromValueChanged}
            exceedsBalance={exceedsBalance}
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
      </ScrollView>
      <Box
        width="100%"
        height={16}
        borderColor="indigo.200"
        bg="white"
        borderWidth={1}
        p={2}
        bottom={0}
        position="absolute"
      >
        <Button
          size={12}
          width="100%"
          rounded="full"
          isDisabled={!exchangeRate || exceedsBalance}
          onPress={onExchangeButtonPressed}
          bg={exchangeRate ? 'indigo.700' : 'coolGray.500'}
          _text={{ fontSize: 18 }}
        >
          Exchange
        </Button>
      </Box>
    </>
  );
}

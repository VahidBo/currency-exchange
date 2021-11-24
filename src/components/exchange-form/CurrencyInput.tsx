import React, { Dispatch, SetStateAction, useCallback } from 'react';
import { AddIcon, Input, MinusIcon, Select } from 'native-base';
import { Currency } from './types';

export interface CurrencyInputProps {
  type: 'to' | 'from';
  currency: Currency;
  setCurrency: Dispatch<SetStateAction<Currency>>;
  value: number;
  setValue: (value: number) => void;
}

export function CurrencyInput({ type, currency, setCurrency, value, setValue }: CurrencyInputProps) {
  const onCurrencyChanged = (val: string) => setCurrency(val as Currency);
  const InputLeftElement =
    type === 'from' ? (
      <MinusIcon size={3} mb={2} mr={2} ml={4} color="primary.700" />
    ) : (
      <AddIcon size={3} mr={2} ml={4} color="primary.700" />
    );
  const onChangeValue = useCallback(
    (val: string) => {
      setValue(+val.replace(/[^0-9]/g, ''));
    },
    [setValue],
  );
  return (
    <Input
      borderColor="indigo.700"
      variant="rounded"
      value={value ? `${value}` : ''}
      onChangeText={onChangeValue}
      keyboardType="numeric"
      type="number"
      w="80%"
      InputLeftElement={InputLeftElement}
      InputRightElement={
        <Select
          bg="indigo.700"
          px={3}
          selectedValue={currency}
          minWidth={20}
          variant="rounded"
          accessibilityLabel="Select Currency"
          _selectedItem={{ bg: 'indigo.100' }}
          color="white"
          onValueChange={onCurrencyChanged}
        >
          <Select.Item label="USD" value="USD" />
          <Select.Item label="EUR" value="EUR" />
          <Select.Item label="GBP" value="GBP" />
        </Select>
      }
      placeholder="value"
    />
  );
}

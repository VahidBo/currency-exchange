import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { NativeBaseProvider } from 'native-base';
import { ExchangeForm } from './src/components';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <NativeBaseProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ExchangeForm />
    </NativeBaseProvider>
  );
};

export default App;

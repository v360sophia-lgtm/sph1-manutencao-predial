import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import App from './src/App';

export default function index() {
  return (
    <SafeAreaProvider>
      <App />
    </SafeAreaProvider>
  );
}

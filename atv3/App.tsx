import React from 'react';
import ItemView from './src/view/ItemView';
import { AppProvider } from './src/context/AppContext';

export default function App() {
  return (
    <AppProvider>
      <ItemView />
    </AppProvider>
  );
}

import React from 'react';
import { dark } from './src/theme';
import Home from './src/screens/Home';
import { ThemeProvider } from 'styled-components';

export default function App() {

  return (
    <ThemeProvider theme={dark}>
      <Home />
    </ThemeProvider>
  );
}
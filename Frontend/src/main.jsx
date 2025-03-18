import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
// import { PersistGate } from 'redux-persist/integration/react';
import App from './App';
// import { persistor, store } from './app/store'; // Ensure store setup is correct
// import { store } from './app/store';
import './index.css';
import theme from './theme'; // Path to your theme.js file
import store from '../app/store';

createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={theme}>
  <Provider store={store}>
    <CssBaseline />
    {/* <PersistGate loading={null} persistor={persistor}> */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    {/* </PersistGate> */}
  </Provider>
  </ThemeProvider>
);

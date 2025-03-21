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
import { I18nextProvider } from "react-i18next";
import store from '../app/store';
import i18n from "./i18n";
import './index.css';
import theme from './theme'; // Path to your theme.js file

createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={theme}>
  <Provider store={store}>
    <CssBaseline />
    {/* <PersistGate loading={null} persistor={persistor}> */}
    <I18nextProvider i18n={i18n}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      </I18nextProvider>,
    {/* </PersistGate> */}
  </Provider>
  </ThemeProvider>
);




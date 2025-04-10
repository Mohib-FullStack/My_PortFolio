import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { I18nextProvider } from "react-i18next";
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import store from '../app/store';
import App from './App';
import i18n from "./i18n";
import './index.css';
import theme from './theme';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <CssBaseline />
        <I18nextProvider i18n={i18n}>
          <HashRouter>
            <App />
          </HashRouter>
        </I18nextProvider>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);








// import { CssBaseline } from '@mui/material';
// import { ThemeProvider } from '@mui/material/styles';
// import React from 'react';
// import { createRoot } from 'react-dom/client';
// import { I18nextProvider } from "react-i18next";
// import { Provider } from 'react-redux';
// import { HashRouter } from 'react-router-dom';
// import store from '../app/store';
// import App from './App';
// import i18n from "./i18n";
// import './index.css';
// import theme from './theme';

// createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <ThemeProvider theme={theme}>
//       <Provider store={store}>
//         <CssBaseline />
//         <I18nextProvider i18n={i18n}>
//           {/* <BrowserRouter basename="/">
//             <App />
//           </BrowserRouter> */}

//           // Change from BrowserRouter to HashRouter
// <HashRouter basename="/">
//   <App />
// </HashRouter>
//         </I18nextProvider>
//       </Provider>
//     </ThemeProvider>
//   </React.StrictMode>
// );










import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import TagsProvider from './context/tags-provider';
import ClassificationProvider from './context/classification-provider';

import { ThemeProvider } from 'styled-components';

const theme = {
  color: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      text: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      text: '#000',
    },
    disabled: {
      light: '#eee',
      main: '#aaa',
      dark: '#555',
      text: '#222',
    },
  },
  font: {
    size: {
      sm: '10px',
      md: '16px',
      lg: '24px',
      xl: '36px',
      xxl: '48px',
    },
  },
  spacing: {
    '0': '0px',
    '4': '4px',
    '8': '8px',
    '12': '12px',
    '16': '16px',
    '20': '20px',
    '24': '24px',
    '28': '28px',
    '32': '32px',
    '64': '64px',
  },
};

ReactDOM.render(
  <TagsProvider>
      <ClassificationProvider>
        <ThemeProvider theme={ theme }>
          <App />
        </ThemeProvider>
      </ClassificationProvider>
    </TagsProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

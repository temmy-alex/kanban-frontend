import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './pages/main/App';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter as Router,
} from "react-router-dom";
import { Provider } from 'react-redux';
import store from './configs/store';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <>
    <Provider store={store}>
      <Router>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <App />
      </Router>
    </Provider>
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

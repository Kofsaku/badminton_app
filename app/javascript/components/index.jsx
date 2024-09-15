import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import store from '../redux/store';
 // Import your Redux store

document.addEventListener("turbo:load", () => {
  const root = createRoot(
    document.body.appendChild(document.createElement("div"))
  );

  root.render(
    <Provider store={store}>
      <App />
    </Provider>
  );
});

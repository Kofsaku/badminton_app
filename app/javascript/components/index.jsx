import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "../redux/store";
import { I18nextProvider } from "react-i18next"; // Import I18nextProvider
import i18n from "./i18n"; // Import the i18n configuration
import App from "./App";

document.addEventListener("turbo:load", () => {
  const container = document.createElement("div");
  document.body.appendChild(container);

  ReactDOM.render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <I18nextProvider i18n={i18n}>
          {/* Wrap App with I18nextProvider */}
          <App />
        </I18nextProvider>
      </PersistGate>
    </Provider>,
    container // Render into the container div
  );
});

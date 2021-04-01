import React from "react";
import ReactDOM from "react-dom";
import App from "./containers/App";
import { ToastProvider } from "react-toast-notifications";

import store from "./store";

const render = () =>
  ReactDOM.render(
    <ToastProvider autoDismiss>
      <App />
    </ToastProvider>,
    document.getElementById("root")
  );
store.subscribe(render);
render();

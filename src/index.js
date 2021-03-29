import React from "react";
import ReactDOM from "react-dom";
import App from "./containers/App";

import store from "./store";

const render = () => ReactDOM.render(<App />, document.getElementById("app"));
store.subscribe(render);
render();

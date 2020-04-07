import React from "react";
import ReactDOM from "react-dom";
import Hotel from "../components/hotel/index";
require("./index.css");

const rootEl = document.getElementById("app");

ReactDOM.render(<Hotel />, rootEl);

if (module.hot) {
  module.hot.accept();
}

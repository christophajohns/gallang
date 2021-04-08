import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import dotenv from "dotenv";

import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { GallangModel } from "./model";

// Configure dotenv (keys and values available at process.env)
dotenv.config();

// Initialize model
const myModel = new GallangModel();

ReactDOM.render(<App model={myModel} />, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

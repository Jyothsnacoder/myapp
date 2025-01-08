import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from './App';
import reportWebVitals from "./reportWebVitals";
// import Main from "./mainComp"
// import Main from "./header"
// import profile from './profile'
// import Accordion from 'react-bootstrap/Accordion';

// import BasicExample from "./bs-accordian/accordianComp";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
     <App />
    {/* <Main /> */}
{/* <profile/> */}
    {/* <BasicExample /> */}
    {/* <Home/> */}
{/* <Main/> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

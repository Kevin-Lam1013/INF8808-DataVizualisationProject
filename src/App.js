import logo from "./logo.svg";
import "./App.css";
import { PresentationPage } from "./PresentationPage/PresentationPage";
import FirstViz from "./FirstViz/FirstViz.js";
import SecondViz from "./SecondViz/SecondViz.js";
// import ThirdViz from './ThirdViz/ThirdViz.js';
import * as d3 from "d3";
import { useState } from "react";

function App() {
  return (
    <div className="container">
      <PresentationPage />
      <FirstViz />
      <SecondViz />
      {/* <ThirdViz/> */}
    </div>
  );
}

export default App;

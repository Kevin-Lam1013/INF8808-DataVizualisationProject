import logo from './logo.svg';
import './App.css';
import { PresentationPage } from './PresentationPage/PresentationPage';
import FirstViz from './FirstViz/FirstViz.js';
import { SecondViz } from './SecondViz/SecondViz';
import { ThirdViz } from './ThirdViz/ThirdViz';
import * as d3 from 'd3'
import {useState} from 'react'

function App() {
 
  return (
   <div className="App">
    <PresentationPage/>
    <FirstViz/>
    <SecondViz/>
    <ThirdViz/>
   </div>
  );
}

export default App;

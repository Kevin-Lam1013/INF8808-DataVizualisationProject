import logo from './logo.svg';
import './App.css';
import { PresentationPage } from './PresentationPage/PresentationPage';
import { FirstViz } from './FirstViz/FirstViz';
import { SecondViz } from './SecondViz/SecondViz';
import { ThirdViz } from './ThirdViz/ThirdViz';

function App() {
  return (
   <div className="container">
    <PresentationPage/>
    <FirstViz/>
    <SecondViz/>
    <ThirdViz/>
   </div>
  );
}

export default App;

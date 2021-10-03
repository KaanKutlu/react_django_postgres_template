import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import GeneSearch from './Components/PageSearch/GeneSearch';
import DisplayInfo from './Components/Pages/DisplayInfo';


function App() {
  return (
    <>
      <DisplayInfo />
    </>
  );
}

export default App;

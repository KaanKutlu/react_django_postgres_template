import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import HelloWorld from './Components/HelloWorld';


function App() {
  return (
    <>
    <HelloWorld />
    </>
  );
}

export default App;

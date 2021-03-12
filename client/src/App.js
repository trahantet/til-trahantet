import "./App.css";
import { BrowserRouter, Route, Switch, Link, Redirect } from "react-router-dom";
import NavBar from "./components/NavBar"
import Home from "./components/Home";
import Data from "./components/Data";
import Edit from "./components/Edit";

function App() {
  return (
    <div>
      <h1>Today I Learned:</h1>
      <NavBar/>
        <Switch>
          <Route exact path={"/"} component={Home}/>
          <Route  path={"/Data"} component={Data}/>
          <Route  path={"/Edit"} component={Edit}/>
        </Switch>
    </div>
  );
}

export default App;

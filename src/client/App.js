import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import TestComponent from "./components/TestComponent/TestComponent";
// @ts-ignore
import Meal from "./components/Meal/Meal";

function App() {
  return (
    <Router>

      <Route exact path="/">
        <TestComponent />
      </Route>
      <Route exact path="/meals/{id}">
        <Meal/>
      </Route>
      <Route exact path="/test-component">
        <TestComponent></TestComponent>
      </Route>
   
    </Router>
  );
}

export default App;

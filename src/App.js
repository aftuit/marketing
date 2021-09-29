import React from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Products from "./pages/Products";
function App() {
  return (
    <BrowserRouter>
        <Switch>
          <Route path="/" component={Products} exact={true}/>          
        </Switch>
    </BrowserRouter>
  );
}

export default App;

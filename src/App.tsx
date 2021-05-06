import React, { useState } from "react";
import { Panel } from "./pages/Panel";
import { Cart } from "./pages/Cart";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  const [productCart, setProductCart] = useState([]);

  return (
    <>
      {" "}
      <Router>
        <Switch>
          <Route exact path="/">
            <Panel cartProduct={setProductCart} />
          </Route>
          <Route exact path="/cart">
            <Cart products={productCart} />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;

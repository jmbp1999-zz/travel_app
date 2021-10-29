import React from 'react';
import { Container} from '@material-ui/core';
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Auth from "./components/Auth/Auth";

const App = () => {
    return (
      <BrowserRouter>
          <Container maxWidth="xl">
              <Navbar/>
              <Switch>
                  <Route path="/" exact component={Home}/>
                  <Route path="/auth" exact component={Auth}/>
              </Switch>
          </Container>
      </BrowserRouter>

  );
};

export default App;

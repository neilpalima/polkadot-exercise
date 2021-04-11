import React from 'react';
import { CssBaseline, Box } from '@material-ui/core';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Header from 'components/Header';
import Footer from 'components/Footer';

import Scan from 'features/polkadotScan';

import Auth from 'features/authentication';

function App() {
  return (
    <div className="App">
      <CssBaseline />
      <Box display="flex" flexDirection="column" height="100vh">
        <Header />
        <Router>
          <Switch>
            <Route exact path="/login">
              <Auth />
            </Route>
            <Route exact path="/">
              <Scan />
            </Route>
            <Redirect to="/" />
          </Switch>
        </Router>
        <Footer />
      </Box>
    </div>
  );
}

export default App;

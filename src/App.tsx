import React, { Component } from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import {NavigationBar} from './components/NavigationBar';

import { Earn } from './pages/Earn';
import { FFI } from './pages/FFI';
import { Transaction } from './pages/Transaction';
import { Borrow } from './pages/Borrow';
import { NotFound } from './pages/NotFound';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';



function App() {

  
    return (
    <React.Fragment>
      <Router>
        <div className="container-fluid">
      <Row>
        <Col md="2" className="navbar_side">
      <NavigationBar />
      </Col>
      <Col md="10">
 
        
            <Switch>
              <Route exact path="/" component={Earn} />
              <Route path="/earn" component={Earn} />
              <Route path="/borrow" component={Borrow} />
              <Route path="/ffi" component={FFI} />
              <Route path="/transfer" component={Transaction} />
              <Route component={NotFound} />
            </Switch>
      
          </Col>
          </Row>
          </div>
      </Router>
    </React.Fragment>
  );
  }

export default App;

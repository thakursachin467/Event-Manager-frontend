import React, { Component } from 'react';
import {BrowserRouter,Route, Redirect,Switch} from 'react-router-dom';
import Auth from './Components/Auth';
import './App.css';
import Booking from "./Components/Booking";
import Event from "./Components/Event";

class App extends Component {
  render() {
    return (
      <BrowserRouter className="App">
          <Switch>
              <Redirect from='/' exact to='/auth' />
              <Route path='/auth' exact component={Auth}/>
              <Route path='/bookings' exact component={Booking}/>
              <Route path='/events' exact component={Event}/>
          </Switch>

      </BrowserRouter>
    );
  }
}

export default App;

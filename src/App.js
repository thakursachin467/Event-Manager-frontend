import React, { Component } from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import Auth from './Containers/Auth';
import './App.css';
import Booking from "./Containers/Booking";
import Event from "./Containers/Event";
import NavBar from './Components/Navigation/Navigation';
class App extends Component {
  render() {
    return (
      <BrowserRouter className="App">
          <React.Fragment>
          <NavBar/>
          <Switch>
              <main className="main_content">
                  <Route path='/' exact />
                  <Route path='/auth' exact component={Auth}/>
                  <Route path='/bookings' exact component={Booking}/>
                  <Route path='/events' exact component={Event}/>
              </main>

          </Switch>
          </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;

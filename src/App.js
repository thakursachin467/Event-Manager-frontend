import React, { Component } from 'react';
import {BrowserRouter,Route,Switch,Redirect} from 'react-router-dom';
import Auth from './Containers/Auth';
import './App.css';
import Booking from "./Containers/Booking";
import AuthContext from './Context/Auth';
import Event from "./Containers/Event";
import NavBar from './Components/Navigation/Navigation';
import Home from "./Containers/Home";
class App extends Component {
    state={
       token:null,
        userId:null,
        firstName:null,
        errors:null
    };
    login=(token,userId,tokenExpiration,firstName)=>{
        this.setState({token:token,userId:userId,firstName:firstName})
    };
    logout=()=>{
        this.setState({token:null,userId:null});
    };
  render() {
    return (
      <BrowserRouter className="App">
          <React.Fragment>
              <AuthContext.Provider value={{token:this.state.token,userId:this.state.userId,login:this.login,logout:this.logout,errors:this.state.errors}}>
          <NavBar/>
          <Switch>
              <main className="main_content">
                  {
                      !this.state.token? <Redirect to='/auth' exact/>:null
                  }
                  {
                      this.state.token? <Redirect from='/' to='/events' exact/>:null
                  }
                  {
                      this.state.token? <Redirect from='/auth' to='/events' exact/>:null
                  }
                  {!this.state.token?<Route path="/auth" exact component={Auth}/>:null}
                  {this.state.token? <Route path='/bookings' exact component={Booking}/>:null}
                  <Route path='/events' exact  component={Event}/>
              </main>
          </Switch>
              </AuthContext.Provider>
          </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;

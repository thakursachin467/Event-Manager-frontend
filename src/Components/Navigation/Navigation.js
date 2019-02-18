import React from 'react';
import {NavLink} from 'react-router-dom';
import './Navigation.css';
const navigation= ()=>{
    return (
       <header className="main_navigation">
           <div className="NavigationLogo">
                <h1>
                    Eventify
                </h1>
           </div>
           <div className="NavigationItems">
               <ul>
                   <li>
                       <NavLink to="/">Home</NavLink>
                   </li>
                   <li>
                       <NavLink to="/auth">Auth</NavLink>
                   </li>
                   <li>
                       <NavLink to="/events">Events</NavLink>
                   </li>
                   <li>
                       <NavLink to="/bookings">Bookings</NavLink>
                   </li>
               </ul>

           </div>
       </header>
    )
};

export default navigation;
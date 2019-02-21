import React from 'react';
import {NavLink} from 'react-router-dom';
import './Navigation.css';
import AuthContext from '../../Context/Auth';
const navigation= ()=>{
    return (
        <AuthContext.Consumer>
            {
                (context)=>{
                    return <header className="main_navigation">
                        <div className="NavigationLogo">
                            <h1>
                                Eventify
                            </h1>
                        </div>
                        <div className="NavigationItems">
                            <ul>
                                {
                                    !context.token? <li>
                                        <NavLink to="/auth">Auth</NavLink>
                                    </li>:null
                                }
                                <li>
                                    <NavLink to="/events">Events</NavLink>
                                </li>
                                {
                                    context.token?(
                                        <React.Fragment>
                                        <li>
                                        <NavLink to="/bookings">Bookings</NavLink>
                                    </li>
                                            <li >
                                                <NavLink to="/logout" onClick={context.logout}>Logout</NavLink>
                                            </li>
                                        </React.Fragment>
                                    ):null
                                }

                            </ul>

                        </div>
                    </header>
                }
            }
        </AuthContext.Consumer>
    )
};

export default navigation;
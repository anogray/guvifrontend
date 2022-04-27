import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import { Header } from './components/NavBar/NavBar';
import SigninScreen from './View/SignInScreen';
import RegisterScreen from './View/RegisterScreen';
import MenuScreen from './View/MenuScreen';
import Footer from './components/Footer/Footer';

export function Routes(){


    return(
        <div className="container">
        <Router>
        <Header/>
                <Switch>
                <Route  exact path="/login" component={SigninScreen} />
                <Route exact path="/signup" component={RegisterScreen} />
                <Route exact path="/profile" component={MenuScreen} />
                <Redirect to="/login" />
                </Switch>
        <Footer/>    
        </Router>
        
        </div>
    )
}
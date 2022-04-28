import React, { useEffect, useState } from "react";
import { Button, Col, Form, Nav, Row, Tab } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import UserPage from "../components/UserPage/UserPage";
import { useContext } from "react";
import { UserContext } from '../App';


export default function MenuScreen() {


  const { isLoggedIn, setLogin, setUser, setToken } = useContext(UserContext);

  if (!isLoggedIn){
    
    console.log("ppopop")
            return (<Redirect to={{ pathname: '/', }} />)
  }

  return (

    <>
    <div className="profile-tab">
      <h3>Profile</h3>
      </div>
      <UserPage/>
      </>
  );
}

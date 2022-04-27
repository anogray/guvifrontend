import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { Formik } from 'formik';
import * as yup from 'yup';
import axios from "axios";
import { UserContext } from "../App";

import domainType from "../components/util.js";
import { useContext } from 'react';
import { snackbar } from '../components/Toaster/Toaster';
import Loader from '../components/Loader';


const backDomain = domainType();


function RegisterScreen(props) {


  const history = useHistory();

  const { isLoggedIn, setLogin, setUser, setToken } = useContext(UserContext);

  const [loading, setLoading] = useState(false);

  useEffect(() => {

      return () => {
        setLoading(false);
      };
  
  }, [])

  const schema = yup.object().shape({
    name: yup.string().min(4,"*Must be atleast 4 characters")
        .max(60, "*Name can't be longer than 60 characters").required("Name required"),
    email: yup.string().email("*Must be atleast 4 characters").min(8,"*Must be atleast 4 characters")
        .max(60, "*Email can't be longer than 60 characters").required("Email required"),
    
    password: yup.string().min(8, "*Password must have at least 8 characters")
        .max(40, "*Password can't be longer than 40 characters").required("Password required"),
    cnfpassword: yup.string().min(8, "*Password must have at least 8 characters")
        .max(40, "*Password can't be longer than 40 characters").required("Password required"),
  });

  if (isLoggedIn)
        return (<Redirect to={{ pathname: '/profile', }} />)
  
  return (
    <Formik
    validationSchema={schema}
    onSubmit={(values, { setSubmitting, resetForm }) => {
      // console.log({values});
      if(values.password != values.cnfpassword){
        console.log("noexact")
        snackbar("error","passwords are not same");
        
        return
      }
      values.name = values.name.trim();
      setSubmitting(true);
      setLoading(true);
      axios.post(backDomain + "/api/user/register",values).then((res)=>{
                                resetForm();
                                setSubmitting(false);
                                setUser(res.data.name);
                                setToken(res.data.token);
                                setLogin(true);
                                history.push(`/profile`);
                                setLoading(false);
                                snackbar("notification", "logged in successfully");
                                }).catch((error) => {
                                    snackbar("error", error?.response?.data?.errorMessage || error);
                                    setSubmitting(false);  
                                    setLoading(false);                             
                            });
    
    
    }}
    initialValues={{    name:"",
                        email: "",
                        password:"",
                        cnfpassword:""
                    }}
    >
    {({
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        touched,
        errors,
        isSubmitting
      }) =>
  (
    <Form className="userpage-form"  onSubmit={handleSubmit}>
    <Form.Group className="mb-3" controlId="formRegName">
      <Form.Label>Name</Form.Label>
      <Form.Control type="text" name="name"  placeholder="Enter your name" value={values.name} onChange={handleChange} />
      {touched.name && errors.name ? (
                                        <div className="error-message">{errors.name}</div>
                                    ) : null}      
    </Form.Group>

    <Form.Group className="mb-3" controlId="formRegEmail">
      <Form.Label>Email address</Form.Label>
      <Form.Control type="email" name="email"  placeholder="Enter email" value={values.email} onChange={handleChange} />
      {touched.email && errors.email ? (
                                        <div className="error-message">{errors.email}</div>
                                    ) : null}      
    </Form.Group>
  
    <Form.Group className="mb-3" controlId="formRegPassword">
      <Form.Label>Password</Form.Label>
      <Form.Control type="password" name="password" placeholder="Password" value={values.password} onChange={handleChange}/>
      {touched.password && errors.password ? (
                                        <div className="error-message">{errors.password}</div>
                                    ) : null}
                                    
    </Form.Group>
    <Form.Group className="mb-3" controlId="formRegcnfpassword">
      <Form.Label>Confirm Password</Form.Label>
      <Form.Control type="password" name="cnfpassword" placeholder="Confirm Password" value={values.cnfpassword} onChange={handleChange}/>
      {!(touched.cnfpassword && errors.cnfpassword) && values.password && values.cnfpassword && values.password !== values.cnfpassword ? (
                                        <div className="error-message">passwords are not same</div>
                                    ) : null}
                                    {touched.cnfpassword && errors.cnfpassword ? (
                                        <div className="error-message">{errors.cnfpassword}</div>
                                    ) : null}
    </Form.Group>
    
    <div style={{textAlign:'center'}}>
    <Button className="btn-prime" variant="primary" type="submit" >
      Signup
    </Button>
    {loading && <div className="loader-pos">
            <Loader/>
        </div>
    }
        </div>

  </Form>
  
  )}
  </Formik>
  )
}
export default RegisterScreen;
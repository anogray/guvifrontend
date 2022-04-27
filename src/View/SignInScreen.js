import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import { Formik } from 'formik';
import * as yup from 'yup';
import { UserContext } from '../App';
import { useContext } from 'react';
import { Redirect } from 'react-router-dom'
import domainType from "../components/util.js";
import axios from "axios";
import { snackbar } from '../components/Toaster/Toaster';
import Loader from "../components/Loader";


const backDomain = domainType();

export default function SigninScreen(props) {

const history = useHistory();
const { isLoggedIn, setLogin, setUser, setToken } = useContext(UserContext);
const [loading, setLoading] = useState(false);


useEffect(() => {
  return () => {
    setLoading(false);
  };
}, [])

const handleRegister = () =>{
    history.push("/signup");

}

const schema = yup.object().shape({
  email: yup.string().email("*Must be atleast 4 characters").min(4,"*Must be atleast 4 characters")
      .max(60, "*Email can't be longer than 60 characters").required("Email required"),
  password: yup.string().min(2, "*Password must have at least 8 characters")
      .max(40, "*Password can't be longer than 40 characters").required("Password required"),
});


if (isLoggedIn)
        return (<Redirect to={{ pathname: '/profile', }} />)
  
  return (
    <Formik
    validationSchema={schema}
    onSubmit={(values, { setSubmitting, resetForm }) => {
                      setLoading(true);
                      setSubmitting(true);
                        axios.post(`${backDomain}/api/user/login`,  values,{'Accept': 'application/json','Content-Type': 'application/json', 'Access-Control-Allow-Headers':"*"})
                            .then((res) => {
                                resetForm();
                                setSubmitting(false);
                                setUser(res.data.name);
                                setToken(res.data.token);
                                setLogin(true);
                                setLoading(false);
                                history.push(`/profile`);
                                snackbar("notification", "logged in successfully");
                            })
                            .catch((error) => {
                                if (error) {
                                    snackbar("error", "username or password incorrect");
                                    setSubmitting(false);
                                    setLoading(false);
                                }
                            });
    }}
    initialValues={{
                        email: "",
                        password:"",
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
    <Form.Group className="mb-3" controlId="formloginEmail">
      <Form.Label>Email address</Form.Label>
      <Form.Control type="email" name="email" value={values.email} placeholder="Enter email" onChange={handleChange} />
      {touched.email && errors.email ? (
                                        <div className="error-message">{errors.email}</div>
                                    ) : null}
    </Form.Group>
  
    <Form.Group className="mb-3" controlId="formloginPassword">
      <Form.Label>Password</Form.Label>
      <Form.Control type="password" name="password" value={values.password} placeholder="Password" onChange={handleChange}/>
      {touched.password && errors.password ? (
                                        <div className="error-message">{errors.password}</div>
                                    ) : null}
    </Form.Group>
    
    <div className="feature-item">
        <div className="signin" >
      <Button className="account-btn" variant="primary" type="submit" >
        Login
      </Button>
      {loading && <div className="loader-pos">
    <Loader/>
    </div>}
      </div>    
      <li>
        New to GUVI ?
        </li>
     <li>
     <div className="signin" >
     <Button  className="account-btn" variant="primary" onClick={handleRegister}>
     Create your GUVI account
    </Button>
    </div>
      </li>    
    
    </div>

  </Form>
  
  )}
</Formik>
  )
}
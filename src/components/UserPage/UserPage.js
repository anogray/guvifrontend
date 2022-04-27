import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./UserPage.css"
import SwitchSelector from "react-switch-selector";
import { Formik } from 'formik';
import * as yup from 'yup';
import axios from "axios";
import domainType from "../util";
import { snackbar } from "../Toaster/Toaster";
import { useContext } from "react";
import { UserContext } from '../../App';
import Loader from "../Loader";

const backDomain = domainType();
const options = [
  {
      label: "AM",
      value: "AM",
      selectedBackgroundColor: "#0000FF",
  },
  {
      label: "PM",
      value: "PM",
      selectedBackgroundColor: "#0000FF"
  }
];

export default function UserPage() {

  const [email,setEmail] = useState("");
  const [name,setName] = useState("");
  const [phonecode,setPhonecode] = useState("");
  const [phonenumber,setPhonenumber] = useState("");
  const [gender,setGender] = useState("");
  const [day,setDay] = useState("");
  const [month,setMonth] = useState("");
  const [year,setYear] = useState("");
  const [address,setAddress] = useState("");
  const [state,setStatelocation] = useState("");
  const [pincode,setPincode] = useState("");
  const [loading, setLoading] = useState(true);

  const { authToken, setIsUserDetail, userGlobal, setUserGlobal} = useContext(UserContext);
// console.log("userGlobal",userGlobal);

useEffect(() => {

  const userDetails = async()=>{


    //receiving first db call's content for user details
    try{

      let resp = await axios.get(`${backDomain}/api/user/profile`, {
        headers: {
                  'Authorization': authToken
                }
      });
      let respData = resp.data.data; 
      
      setName(respData?.name || "")
      setEmail(respData?.email || "")
      setPhonecode(respData?.phonecode || "")
      setPhonenumber(respData?.phonenumber || "")
      setGender(respData?.gender || "")
      setDay(respData?.birthDetails?.day || "")
      setMonth(respData?.birthDetails?.month || "")
      setYear(respData?.birthDetails?.year || "")
      setAddress(respData?.address || "")
      setStatelocation(respData?.state || "")
      setPincode(respData?.pincode || "")
    }catch(err){ 
      if(err){
        snackbar("error","User Details failed to retrieve");
      }
    }
        setLoading(false);

  }
  userDetails();
}, []);



const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
const phoneCodeRegExp = /^(\+?\d{1,3}|\d{1,4})$/


const handlebasicPhone = (phonecode, phonenumber)=> {
  
  let code = phonecode;
  let phone = phonenumber;
  
  if(!code.match(phoneCodeRegExp) || code.length<1 || code.length > 5){
    setPhonecode("");
    snackbar("warning", "Please enter valid country phonecode");
    return true;
  }

  if(phone.length < 10 || phone.length > 11 || !phone.match(phoneRegExp) ){
    setPhonenumber("");
    snackbar("warning", "Please enter valid phone number");
    return true;
  }


}


const handleSubmitForm = (e)=>{

  e.preventDefault();


    if(handlebasicPhone(phonecode, phonenumber)){
      return;
    }

    if(!name ){
      snackbar("warning","Please enter valid name")
      return;
    }

    //sending as objects, primitives data from frontend data to db

  let postedDetails = {};
      postedDetails.name = name.trim();
      postedDetails.phonecode = phonecode;
      postedDetails.phonenumber = phonenumber;
      postedDetails.gender = gender;
      postedDetails.address = address;
      postedDetails.state = state;
      postedDetails.pincode = pincode;
      postedDetails.birthDetails = {day , month, year}

      setName(postedDetails.name);
      

      //posting data to db
      axios.post(`${backDomain}/api/user/profile`, postedDetails,{
        headers: {
                  'Authorization': authToken
                }
      }).then((res) => {  
        //console.log("posted",res)
                        //context api stored as global userDetails
                        setUserGlobal({name, email,  phonecode, phonenumber, gender, state,
                          pincode, day , month, year,
                           address})
                          snackbar("notification", "User Details Updated !");
                            
                            })
                            .catch((error) => {
                                if (error) {
                                    snackbar("error", "Error in updating profile");
                                    
                                }
                            });
}


  return (
    
    <>
    {loading && <div className="loader-pos">
    <Loader/>
    </div>
    }
    <Form className="userpage-form"  onSubmit={handleSubmitForm}>
      <Form.Group className="mb-3" >
        <Form.Label>Name</Form.Label>
        <Form.Control type="text"  name="name" value={name} onChange={(e)=>setName(e.target.value)}/>

      </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Label>Email Address</Form.Label>
        <Form.Control type="email"  name="email" value={email} disabled/>
      </Form.Group>

      <Form.Label>Phone Number</Form.Label>      
    <div className="phone-number">  
      <Form.Group className="mb-3 phonecode">
            <Form.Control type="text" name="phonecode" value={phonecode} onChange={(e)=>setPhonecode(e.target.value)}/>
            
      </Form.Group>

      <Form.Group className="mb-3 phonenumber" >
          <div className="number">
          <Form.Control type="text" name="phonenumber" value={phonenumber} onChange={(e)=>setPhonenumber(e.target.value)}/>
          
          </div>
      </Form.Group>
    </div>

      
      <div className=" mb-3 selectmid">

      <Form.Group className="gender">
      <Form.Label>Gender</Form.Label>
      <Form.Control
          as="select"
          text="text"
          onChange={(e)=>setGender(e.target.value)}
          name="gender"
          value={gender}
          >
          <option value=""></option>
          <option value="MALE">MALE</option>
          <option value="FEMALE">FEMALE</option>
        </Form.Control>
      </Form.Group>

      </div>


      <Form.Label>Date of Birth</Form.Label>
      <div className="eachdob">
      
      <Form.Group className="mb-3">
      <Form.Control
          as="select"
          type="text" 
          name="day"
          value={day}
          onChange={(e)=>setDay(e.target.value)}
          className="day"
          >
          <option value=""></option>
          {[...Array(31).keys()].map((x) => (
                            <option key={x+1} value={x+1}>
                              {x+1}
                            </option>
                          ))}
        </Form.Control>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            as="select"
            type="text" 
            name="month"
          value={month}
          onChange={(e)=>setMonth(e.target.value)}
            className="month"
            >
            <option value=""></option>
            {[...Array(12).keys()].map((x) => (
                            <option key={x+1} value={x+1}>
                              {x+1}
                            </option>
                          ))}
          </Form.Control>
          </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            as="select"
            type="text"
            name="year"
          value={year}
          onChange={(e)=>setYear(e.target.value)}
            className="year"
            >
            <option value=""></option>
            {[...Array(52).keys()].map((x) => (
                            <option key={2021-x} value={2021-x}>
                              {2021-x}
                            </option>
                          ))}
          </Form.Control>
    </Form.Group>
       
      

      </div>
        

      <Form.Group className="mb-3" >
        <Form.Label>Address</Form.Label>
        <Form.Control type="text" name="address" value={address} onChange={(e)=>setAddress(e.target.value)}

          
        />
      </Form.Group>


      <Form.Group className="mb-3" >
        <Form.Label>State</Form.Label>
        <Form.Control type="text" name="state" value={state} onChange={(e)=>setStatelocation(e.target.value)}/>
      </Form.Group>

      <div className="form-footer">

        <Form.Group className="mb-3" >
        <Form.Label>Pincode</Form.Label>
          <Form.Control type="text" name="pincode" value={pincode} onChange={(e)=>setPincode(e.target.value)}/>
        </Form.Group>
      
      </div>

      <div style={{ textAlign: "center" }}>
        <Button className="btn-prime" variant="primary" type="submit">
          Save Changes
        </Button>
      </div>
    </Form>
    </>
  ) 
}

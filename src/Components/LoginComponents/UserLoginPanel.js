import React, { useState,useEffect } from 'react';
import '../../AdminStyles/Auth/LoginPanelStyle.css';

import {useNavigate} from 'react-router-dom'
import { bindActionCreators } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import {actionCreators} from '../../AdminState/index';

import Alert from '../../MasterComponents/Alert';
import "../../Styles/AuthStyles/loginPane.css"


export default function UserLoginPanel() {
  const host = process.env.REACT_APP_HOST_NAME;
  const dispatch = useDispatch();
  const userActions = bindActionCreators(actionCreators,dispatch);
  const userStatus = useSelector(state => state.userStatus)
  const userAuthtoken = useSelector(state => state.userAuthtoken)
  const navigate = useNavigate();   


  const [messageTitle, setMessageTitle] = useState('');   
  const [messageType, setMessageType] = useState('');
  const [message,setMessage]=useState('');
  const [displayAlert, setDisplayAlert] = useState(false);
  const setDisplayAlertToFalse = ()=>{
    setDisplayAlert(false);
  }
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    
    const url = `${host}/auth`
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const json = await response.json();
    const tempAuthtoken = json.authtoken;
    if(tempAuthtoken){
      userActions.setUserLoggedIn();
      userActions.setUserAuthtoken(tempAuthtoken);
      setMessageTitle('Success!');
      setMessageType("success");
      setMessage(`Login successful. Redirecting in 3s...`);
      setDisplayAlert(true);
      setTimeout(() => {
        setDisplayAlert(false);
      }, 1500);
      console.log("from tempAuthtoken ",tempAuthtoken)
      setFormData({
        email: "",
        password:""
      })
      setTimeout(() => {
        navigate('/userDashboard');
      }, 1500);
    }else{
      if(json.error){
        setMessageTitle('Error');
        setMessageType('danger');
        setMessage(json.error);
      }
      else if(json.errors[0].msg){
        setMessageTitle('Error');
        setMessageType('danger');
        setMessage(json.errors[0].msg);
      }
      setDisplayAlert(true);
      setTimeout(() => {
        setDisplayAlert(false);
      }, 3000);
    }
  };
  
  useEffect(()=>{
    console.log("userStatus: ");
    console.log(userStatus);
    console.log("authtoken: ");
    console.log(userAuthtoken);
  })
  return (
    <div className='loginPanelFullContainer'>
    <div className="alertMessageLogin">
       {displayAlert && <Alert title={messageTitle} type={messageType} body={message} addClassToCloseBtn ={`${(displayAlert)?"none":""}`} setDisplayAlertToFalse={setDisplayAlertToFalse}/>}
    </div>
    <div className='container loginBodyContainer'>
      <div className='LoginPanel'>
        <h1 className='loginTitle'>Login</h1>
        <form action="">
          <div className="txt_field">
            <input
              type="email"
              id='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              placeholder='Enter email'
              required
            />
          </div>
          <div className="txt_field">
            <input
              type="password"
              id='password'
              name='password'
              value={formData.password}
              onChange={handleChange}
              placeholder='Enter password'
              required
            />
          </div>
          <div className="pass">Forgot Password?</div>
          <div className="loginButton">
            <input type="submit" value="Login" onClick={handleSubmit} />
          </div>
          
        </form>
      </div>
    </div>
    </div>
  );
}

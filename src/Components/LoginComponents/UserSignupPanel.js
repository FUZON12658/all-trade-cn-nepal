import React, { useState,useEffect } from 'react';
import '../../AdminStyles/Auth/LoginPanelStyle.css';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import {actionCreators} from '../../AdminState/index'
import Alert from '../../MasterComponents/Alert';
import "../../Styles/AuthStyles/signupPanel.css"


export default function UserSignupPanel() {
  const host = process.env.REACT_APP_HOST_NAME;
  const dispatch = useDispatch();
  const actions = bindActionCreators(actionCreators,dispatch);

  const [messageTitle, setMessageTitle] = useState('');   
  const [messageType, setMessageType] = useState('');
  const [message,setMessage]=useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formData, setFormData] = useState({
    name:'',
    email: '',
    phoneNumber: '',
    address:'',
    password: '',
  });
  const [displayAlert, setDisplayAlert] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleConfirmPassword = (e) => {
      setConfirmPassword(e.target.value);
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    
      // Check if passwords match
    if (formData.password !== confirmPassword) {
      setMessageTitle('Error');
      setMessageType('danger');
      setMessage('Passwords do not match');
      setDisplayAlert(true);
      setTimeout(() => {
        setDisplayAlert(false);
      }, 3000);
      return; // Stop the submission if passwords don't match
    }
    const url = `${host}/auth/signup`
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const json = await response.json();
    const tempAuthtoken = json.authtoken;
    console.log(tempAuthtoken);
    if(tempAuthtoken){
      setMessageTitle('Success!');
      setMessageType('success');
      setMessage('SignUp successfull. Please login!')
      setFormData({
        name:'',
        email: '',
        phoneNumber: '',
        address:'',
        password: '',
      })
      setConfirmPassword("");
      setDisplayAlert(true);
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
      // setTimeout(() => {
      //   setDisplayAlert(false);
      // }, 3000);
    }
  };

  const setDisplayAlertToFalse = ()=>{
    setDisplayAlert(false);
  }
  
  return (
    <div className = "signupPanelFullContainer">
    <div className="alertMessageSignup">
       {displayAlert && <Alert title={messageTitle} type={messageType} body={message} addClassToCloseBtn ={`${(displayAlert)?"none":""}`} setDisplayAlertToFalse={setDisplayAlertToFalse}/>}
    </div>
    <div className='container signUpBodyContainer'>
      <div className='LoginPanel'>
        <h1 className='loginTitle'>SignUp</h1>
        <form action="">
        <div className="txt_field">
            <input
              type="string"
              id='name'
              name='name'
              value={formData.name}
              onChange={handleChange}
              placeholder='Enter your name'
              required
            />
          </div>
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
              type="string"
              id='phoneNumber'
              name='phoneNumber'
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder='Enter contact number'
              required
            />
          </div>
          <div className="txt_field">
            <input
              type="string"
              id='address'
              name='address'
              value={formData.address}
              onChange={handleChange}
              placeholder='Enter address'
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
          <div className="txt_field">
            <input
              type="password"
              id='confirmPassword'
              name='confirm password'
              value={confirmPassword}
              onChange={handleConfirmPassword}
              placeholder='Confirm password'
              required
            />
          </div>
          <div className="loginButton">
            <input type="submit" value="Sign Up!" onClick={handleSubmit} />
          </div>
          
        </form>
      </div>
    </div>
    </div>
  );
}

import React, { useState,useEffect } from 'react';
import '../../AdminStyles/Auth/LoginPanelStyle.css';
import { useDispatch, useSelector } from 'react-redux';
import {useNavigate} from 'react-router-dom'
import { bindActionCreators } from 'redux';
import {actionCreators} from '../../AdminState/index'


export default function AdminLoginPanel() {
  const host = process.env.REACT_APP_HOST_NAME;
  const dispatch = useDispatch();
  const actions = bindActionCreators(actionCreators,dispatch);
  const status = useSelector(state => state.status)
  const authtoken = useSelector(state => state.authtoken)
  const navigate = useNavigate();   



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
    
    const url = `${host}/admin/auth`
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
      navigate('dashboard')
      actions.setLogOut();
      actions.setAuthtoken(tempAuthtoken);
      setFormData({
        email: "",
        password:""
      })
    }
  };


  
  return (
    <div className='container adminContainer'>
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
  );
}

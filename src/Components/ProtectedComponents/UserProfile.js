import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { bindActionCreators } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators } from "../../AdminState/index";

import"../../Styles/ProtectedComponentStyles/UserProfile.css";

const UserProfile = () => {
  const host = process.env.REACT_APP_HOST_NAME;
  const navigate = useNavigate();
  const userStatus = useSelector((state) => state.userStatus);
  const userAuthtoken = useSelector((state) => state.userAuthtoken);
  useEffect(() => {
    if (userStatus === "UserLoggedOut") navigate("/login");
    getUserData();
  },[]);

  const [formData, setFormData] = useState({
    name:'',
    email: '',
    phoneNumber: '',
    address: '',
  });

  const [editCalled, setEditCalled] = useState(false);
  const [editButtonStatus, setEditButtonStatus] = useState('Edit Profile');

  const onClickEdit = (e)=>{
    e.preventDefault();
    setEditButtonStatus("Done");
    setEditCalled(true);
  }

  const onClickDone = async(e)=>{
    e.preventDefault();
    console.log(formData);
    setEditButtonStatus("Edit Profile");
    setEditCalled(false);
    const url = `${host}/auth/updateUser`
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "auth-token": userAuthtoken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const json = await response.json();
    console.log(json);
  }

  const handleChange = (e) => {
    console.log("handleChange called");
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const getUserData = async(e) => {
    
    const url = `${host}/auth/getuser`
    const response = await fetch(url, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "auth-token": userAuthtoken,
      }
    });
    const json = await response.json();
    setFormData({
      name:json.name,
      email:json.email,
      phoneNumber:json.phoneNumber,
      address:json.address,
    })
  };

  return (
    <div className="userDashboardFullContainer">
      <div className="userDashboardContainer">
        <div className="detailsPanel">
          <h1 className="detailsTitle">My Profile</h1>
          <form action="">
            <div className="formContainer">
            <div className="dashboard_txt_field">
              <label className="label_for_txt_field" htmlFor="name">Name:</label>
              <input
                type="text"
                id="text"
                className="input_for_txt_field"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter name"
                disabled={!editCalled}
                required
              />
            </div>
            <div className="dashboard_txt_field">
            <label className="label_for_txt_field" htmlFor="email">Email:</label>
              <input
                type="text"
                id="text"
                className="input_for_txt_field"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email"
                disabled
                required
              />
            </div>
            <div className="dashboard_txt_field">
              <label className="label_for_txt_field" htmlFor="phoneNumber">Contact no:</label>
              <input
                type="text"
                id="text"
                className="input_for_txt_field"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Enter contact number"
                disabled={!editCalled}
                required
              />
            </div>
            <div className="dashboard_txt_field">
              <label className="label_for_txt_field" htmlFor="address">Address:</label>
              <input
                type="text"
                id="text"
                className="input_for_txt_field"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter address"
                disabled={!editCalled}
                required
              />
            </div>
            <div className="editButton">
              <input type="submit" value={editButtonStatus} onClick={(editButtonStatus==="Edit Profile")?onClickEdit:onClickDone}/>
            </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

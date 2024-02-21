import "../Styles/General.css";
import "../Styles/NavBar.css";
import "../Styles/Footer.css"

import React,{Suspense,lazy, useEffect} from 'react'
import Home from "../Components/Home";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import {useNavigate} from 'react-router-dom'
import { bindActionCreators } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import {actionCreators} from '../AdminState/index';

import ProductPage from "../Components/ProductComponents/ProductPage";
import UserLoginPanel from "./LoginComponents/UserLoginPanel";
import UserSignupPanel from "./LoginComponents/UserSignupPanel";
import UserCart from "./ProtectedComponents/UserCart";
import UserOrders from "./ProtectedComponents/UserOrders";
import UserProfile from "./ProtectedComponents/UserProfile";
import ProductFrame from "./ProductComponents/ProductFrame";
import ProceedToCheckOut from "./ProtectedComponents/ProceedToCheckOut";
import EmptyPage from "../MasterComponents/EmptyPage";


const NavBar = lazy(()=>import( '../Components/NavBar'));
const Footer = lazy(()=>import( '../Components/Footer'));

export default function UserSideMaster() {
  const host = process.env.REACT_APP_HOST_NAME;
  const dispatch = useDispatch();
  const userActions = bindActionCreators(actionCreators,dispatch);
  const userAuthtoken = useSelector(state => state.userAuthtoken)
  const getUserData = async(e) => {
    
    const url = `${host}/auth/getuser`
    const response = await fetch(url, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "auth-token": userAuthtoken,
      }
    });
    const json = await response.json();
    if(json.name){
      userActions.setUserLoggedIn();
    }else{
      userActions.setUserLoggedOut();
    }
  };

  useEffect(()=>{
    getUserData();
  },[])
  return (
    <Suspense fallback={<div>Please wait..</div>}>
      
      <div className="master_wrapper">  
        <NavBar/>
        <Routes>
          <Route exact path="/*" element={<EmptyPage/>}></Route>
          <Route exact path="/" element={<Home/>}></Route>
          <Route exact path="/fireSafety" element={<ProductPage key='fireSafety' category="fireSafety"/>}></Route>
          <Route exact path="/roadSafety" element={<ProductPage key='roadSafety' category='roadSafety'/>}></Route>
          <Route exact path="/marineSafety" element={<ProductPage key='marineSafety' category='marineSafety'/>}></Route>
          <Route exact path="/electricalSafety" element={<ProductPage key='electricalSafety' category='electricalSafety'/>}></Route>
          <Route exact path="/headProtection" element={<ProductPage key='headProtection' category='headProtection'/>}></Route>
          <Route exact path="/bodyprotection" element={<ProductPage key='bodyProtection' category='bodyProtection'/>}></Route>
          <Route exact path="/eyeProtection" element={<ProductPage key='eyeProtection' category='eyeProtection'/>}></Route>
          <Route exact path="/earProtection" element={<ProductPage key='earProtection' category='earProtection'/>}></Route>
          <Route exact path="/handProtection" element={<ProductPage key='handProtection' category='handProtection'/>}></Route>
          <Route exact path="/surveyItems" element={<ProductPage key='surveyItems' category='surveyItems'/>}></Route>
          <Route exact path="/rescueItems" element={<ProductPage key='rescueItems' category='rescueItems'/>}></Route>
          <Route exact path="/productFrame" element={<ProductFrame/>}></Route>
          <Route exact path="/login" element={<UserLoginPanel/>}></Route>
          <Route exact path="/signUp" element={<UserSignupPanel/>}></Route>

          {/* protected Routes */}
          <Route exact path="/cart" element={<UserCart/>}></Route>
          <Route exact path="/orders" element={<UserOrders/>}></Route>
          <Route exact path="/userDashboard" element={<UserProfile/>}></Route>
          <Route exact path="/proceedCheckout" element={<ProceedToCheckOut/>}></Route>
        </Routes>
        <Footer/>
      </div>
  </Suspense>
  )
}

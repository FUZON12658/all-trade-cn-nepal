import React, {useEffect} from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import AdminNavBar from './AdminNavBar';
import AdminFooter from './AdminFooter';
import AdminLoginPanel from './LoginComponent/AdminLoginPanel';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import {actionCreators} from '../AdminState/index'
import AdminDashboardPanel from './DashboardComponent/AdminDashboardPanel';
import AdminAddProduct from './DashboardComponent/AdminAddProduct';
import AdminProducts from './DashboardComponent/AdminProducts';
import AdminOrderMaster from './DashboardComponent/AdminOrderMaster';
import AdminOrderDelivered from './DashboardComponent/AdminOrderDelivered';


export default function AdminSideMaster() {
  const dispatch = useDispatch();
  const actions = bindActionCreators(actionCreators,dispatch);
  const status = useSelector(state => state.status);
  const authtoken = useSelector(state => state.authtoken);
  const navigate = useNavigate();
  const host = process.env.REACT_APP_HOST_NAME;
  
  
  const intitialAuthentication = async(e) => {
    
    const url = `${host}/admin/auth/getAdmin`
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "auth-token": authtoken,
      }
    });
    
    const json = await response.json();
    if(json._id){
      actions.setLogOut();
    }else{
      actions.setLogIn();
    }
  };

  const waitInitialAuthentication = async() => {
    await intitialAuthentication();
  }
  
  useEffect(() => {
    const fetchData = async () => {
      await waitInitialAuthentication();
      if (status === "Log Out") {
        navigate('dashboard'); // Assuming this is the path to your admin dashboard
      } else if(status === "Log In"){
        navigate('*');
      }
    };

    fetchData();
  }, [status]);

  return (
    <div className='master_wrapper'>
      <AdminNavBar />
      <Routes>
        <Route exact path="*" element={<AdminLoginPanel/>} />
        <Route exact path="dashboard" element={<AdminDashboardPanel/>}></Route>
        <Route exact path="addProduct" element={<AdminAddProduct/>}></Route>
        <Route exact path="products" element={<AdminProducts/>}></Route>
        <Route exact path="ordersPending" element={<AdminOrderMaster productStatus={"pending"}/>}></Route>
        <Route exact path="ordersDelivered" element={<AdminOrderDelivered productStatus={"delivered"}/>}></Route>
      </Routes>
      <AdminFooter />
    </div>
  );
}
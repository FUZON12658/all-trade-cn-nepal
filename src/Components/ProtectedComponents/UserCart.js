import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom';

import { bindActionCreators } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import {actionCreators} from '../../AdminState/index';
import CartBlock from './CartBlock';

import "../../Styles/ProtectedComponentStyles/UserCart.css"
import Alert from '../../MasterComponents/Alert';

const UserCart = () => {
  const host = process.env.REACT_APP_HOST_NAME;
  const navigate = useNavigate();
  const userStatus = useSelector(state => state.userStatus);
  const userAuthtoken = useSelector(state => state.userAuthtoken);
  
  const [messageTitle, setMessageTitle] = useState('');   
  const [messageType, setMessageType] = useState('');
  const [message,setMessage]=useState('');
  const [displayAlert, setDisplayAlert] = useState(false);
  const setDisplayAlertToFalse = ()=>{
    setDisplayAlert(false);
  }




  const [jsonList,setJsonList] = useState([]);
  const [formData, setFormData] = useState({
    productId:"",
    typeId:"",
  })
  const [shouldRenderCartBlock, setShouldRenderCartBlock] = useState(false);
  useEffect(()=>{
    if(userStatus === 'UserLoggedOut')
    navigate("/login");
    getCart();
  },[])

  const getCart = async()=>{
    console.log("fromGetCart:")
    console.log(userAuthtoken);
    
    const url = `${host}/cart/fetchCartProducts`;
    console.log("after url",userAuthtoken)
    const response = await fetch(url,{
      method:'GET',
      headers:{
        "auth-token": userAuthtoken,
      },
    });
    let tempJson = await response.json();
    console.log(tempJson);
    setJsonList(tempJson);
    setShouldRenderCartBlock(true);
  };


  
  return (
    <div className='cartBlockContainer'>
      <div className="cartPageTitle">My Cart</div>
      <div className="alertMessageCart">
       {displayAlert && <Alert title={messageTitle} type={messageType} body={message} addClassToCloseBtn ={`${(displayAlert)?"none":""}`} setDisplayAlertToFalse={setDisplayAlertToFalse}/>}
    </div>
    {shouldRenderCartBlock && jsonList.map((item, index) => (
      <CartBlock
        key={index}
        productId={item.productId}
        typeId={item.typeId}
        quantity={item.quantity}
        cartId={item._id}
        getCart={getCart}
        setJsonList={setJsonList}
        setMessageTitle={setMessageTitle}
        setMessageType={setMessageType}
        setMessage={setMessage}
        setDisplayAlert={setDisplayAlert}
      />
    ))}
    {(Object(jsonList).length===0)?<div className='emptyMessage'>Cart is empty! Start shopping.</div>:''}
    </div>
  )
}

export default UserCart

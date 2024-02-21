import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom';

import { bindActionCreators } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import {actionCreators} from '../../AdminState/index';


import "../../Styles/ProtectedComponentStyles/UserCart.css"
import Alert from '../../MasterComponents/Alert';
import OrderBlock from './OrderBlock';

const UserOrders = () => {
  const host = process.env.REACT_APP_HOST_NAME;
  const navigate = useNavigate();
  const userStatus = useSelector(state => state.userStatus);
  const userAuthtoken = useSelector(state => state.userAuthtoken);
  const productQuantityInCart = useSelector(state => state.productQuantityInCart);
  
  const [messageTitle, setMessageTitle] = useState('');   
  const [messageType, setMessageType] = useState('');
  const [message,setMessage]=useState('');
  const [displayAlert, setDisplayAlert] = useState(false);
  const [typeId, setTypeId] = useState('')
  const setDisplayAlertToFalse = ()=>{
    setDisplayAlert(false);
  }

  const [statusFromUrl, setStatusFromUrl] = useState('');
  const [tuuidFromUrl, setTuuidFromUrl] = useState('');
  const [dataFromUrl, setDataFromUrl] = useState();
  const [shouldISetTypeId, setShouldISetTypeId] = useState(false);
  const[shouldIAddToOrders,setShouldIAddToOrders] = useState(false);
  const [shouldIGetUserOrders, setShouldIGetUserOrders] = useState(false)
  

  const [jsonList,setJsonList] = useState([]);
  const [formData, setFormData] = useState({
    productId:"",
    typeId:"",
  })
  const [shouldRenderOrderBlock, setShouldRenderOrderBlock] = useState(false);
  useEffect(()=>{
    if(userStatus === 'UserLoggedOut'){
      navigate("/login");
    }
    readStatusAndTuidFromUrl();
    getUserOrders();
  },[])


  const getUserOrders = async()=>{    
    const url = `${host}/order/fetchUserOrders`;
    const response = await fetch(url,{
      method:'GET',
      headers:{
        "auth-token": userAuthtoken,
      },
    });
    let tempJson = await response.json();
    console.log(tempJson);
    setJsonList(tempJson);
    setShouldRenderOrderBlock(true);
  };


  //api call pre-work to store order data
  const readStatusAndTuidFromUrl = async() => {
    const searchParams = new URLSearchParams(location.search);
    const status = searchParams.get("status");
    const queryString = searchParams.get("transactionId");
    const data = searchParams.get("data");

    if (queryString && status === "success") {
      const transaction_uuid = queryString.split('?'); // Split by ?
      setTuuidFromUrl(transaction_uuid[0]);
      setDataFromUrl(JSON.parse(atob(transaction_uuid[1].split('=')[1])))
    }
    
    if (status) setStatusFromUrl(status);
    if(status) setShouldISetTypeId(true);
    
  }
  useEffect(()=>{
    const [typeIdToBeSet] =atob(tuuidFromUrl).split('-');
    shouldISetTypeId && setTypeId(typeIdToBeSet);
    shouldISetTypeId && setShouldIAddToOrders(true);
  },[shouldISetTypeId])

  useEffect(()=>{
    shouldIAddToOrders && addToOrders();
  },[typeId,shouldIAddToOrders])

  const addToOrders = async()=>{
    console.log(dataFromUrl);
    console.log(parseFloat());
    const totalAmountString = dataFromUrl['total_amount'];
    const totalAmountConvertedFromString = parseFloat(totalAmountString.replace(',', ''));
    const tuuidVerificationUrl = `${process.env.REACT_APP_TUUID_VERIFICATION_URL_HEAD}product_code=${dataFromUrl['product_code']}&total_amount=${totalAmountConvertedFromString}&transaction_uuid=${tuuidFromUrl}`;


    const url = `${host}/order/addToOrders`;
    console.log("from add to orders")
    console.log(typeId);
    const response = await fetch(url,{
      method:'POST',
      headers:{
        "auth-token":userAuthtoken,
        "Content-Type": "application/json",
      },
      body:JSON.stringify({
        typeId: typeId,
        productStatus: "pending",
        quantityOrdered: productQuantityInCart,
        transactionUUID: tuuidFromUrl,
        urlForVerification: tuuidVerificationUrl,
      })
    });
    const tempJson = await response.json();
    setShouldIGetUserOrders(true);
  }

  useEffect(()=>{
    shouldIGetUserOrders && console.log("getUserOrders called")
    shouldIGetUserOrders && getUserOrders();
  },[shouldIGetUserOrders])

  return (
    <div className='cartBlockContainer'>
      <div className="cartPageTitle">My Orders</div>
      <div className="alertMessageCart">
       {displayAlert && <Alert title={messageTitle} type={messageType} body={message} addClassToCloseBtn ={`${(displayAlert)?"none":""}`} setDisplayAlertToFalse={setDisplayAlertToFalse}/>}
    </div>
    {shouldRenderOrderBlock && jsonList.map((item, index) => (
      <OrderBlock
        key={index}
        productId={item.productId}
        typeId={item.typeId}
        quantity={jsonList[index]['quantityOrdered']}
        cartId={item._id}
        getUserOrders={getUserOrders}
        setJsonList={setJsonList}
        setMessageTitle={setMessageTitle}
        setMessageType={setMessageType}
        setMessage={setMessage}
        setDisplayAlert={setDisplayAlert} 
      />
    ))}
    {(Object(jsonList).length===0)?<div className='emptyMessage'>You have not ordered anything! Please start shopping.</div>:''}
    </div>
  )
}

export default UserOrders

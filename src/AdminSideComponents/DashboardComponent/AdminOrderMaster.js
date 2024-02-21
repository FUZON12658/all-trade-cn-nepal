import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom';

import { bindActionCreators } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import {actionCreators} from '../../AdminState/index';

import "../../Styles/ProtectedComponentStyles/UserCart.css"
import Alert from '../../MasterComponents/Alert';
import AdminOrderBlock from './AdminOrderBlock';

const AdminOrderMaster = (props) => {
  const host = process.env.REACT_APP_HOST_NAME;
  const navigate = useNavigate();
  const status = useSelector(state => state.status);
  const authtoken = useSelector(state => state.authtoken);
  
  const [productId, setProductId] = useState('');
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
    getOrders();
  },[])

  const getOrders = async()=>{
    
    const url = `${host}/order/fetchAllOrders`;
    const response = await fetch(url,{
      method:'GET',
      headers:{
        "auth-token": authtoken,
        "productStatus": props.productStatus,
      },
    });
    let tempJson = await response.json();
    setJsonList(tempJson);
    setShouldRenderCartBlock(true);
  };


  
  return (
    <div className='cartBlockContainer'>
      <div className="cartPageTitle">Orders-Pending</div>
      <div className="alertMessageCart">
       {displayAlert && <Alert title={messageTitle} type={messageType} body={message} addClassToCloseBtn ={`${(displayAlert)?"none":""}`} setDisplayAlertToFalse={setDisplayAlertToFalse}/>}
    </div>
    {shouldRenderCartBlock && jsonList.map((item, index) => (
      <AdminOrderBlock
        key={index}
        typeId={item.typeId}
        userId={item.userId}
        productStatus={item.productStatus}
        quantityOrdered={item.quantityOrdered}
        orderId={item._id}
        getOrders={getOrders}
        setJsonList={setJsonList}
        setMessageTitle={setMessageTitle}
        setMessageType={setMessageType}
        setMessage={setMessage}
        setDisplayAlert={setDisplayAlert}
      />
    ))}
    {(Object(jsonList).length===0)?<div className='emptyMessage'>Nobody has ordered anything..</div>:''}
    </div>
  )
}

export default AdminOrderMaster

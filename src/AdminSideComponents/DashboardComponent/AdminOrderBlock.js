import React, { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../Styles/ProtectedComponentStyles/CartBlock.css"

import { bindActionCreators } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import {actionCreators} from '../../AdminState/index';


const AdminOrderBlock = (props) => {
  const host = process.env.REACT_APP_HOST_NAME;
  const [productName, setProductName] = useState('')
  const [productType, setProductType] = useState('')
  const [productPrice, setProductPrice] = useState('')
  const [productStock, setProductStock] = useState('')
  const [productCategory, setProductCategory] = useState('')
  const [productImageUrl, setProductImageUrl] = useState('')
  const [updateCart, setUpdateCart] = useState(false)
  const [cartQuantity, setCartQuantity] = useState(props.quantity);
 
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPhoneNo, setUserPhoneNo] = useState('');
  const [userAddress, setUserAddress] = useState('');
 
 
 
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userActions = bindActionCreators(actionCreators,dispatch);
  const authtoken = useSelector(state => state.authtoken);

  const typeId = useSelector(state => state.typeId);
  
  useEffect(()=>{
    getProductDetails();
    getUserDetails();
  },[])

  function convertCamelToSpaces(camelCaseString) {
    return camelCaseString
      .replace(/([a-z])([A-Z])/g, '$1 $2') // Add space before capital letters
      .replace(/^./, str => str.toUpperCase()); // Capitalize the first letter
  }

  const getProductDetails = async ()=>{
    const url = `${host}/productControl/fetchProductSubsById`;
    const response = await fetch(url,{
      method: 'GET',
      headers: {
        'productSubId':props.typeId,
      },
    })
    let tempJson = await response.json();
    setProductName(tempJson[0]['productName']);
    setProductType(tempJson[0]['typeIndicator']);
    setProductPrice(tempJson[0]['price']);
    setProductStock(tempJson[0]['remainingStock']);
    setProductCategory(convertCamelToSpaces(tempJson[0]['category']));
    setProductImageUrl(tempJson[0]['images'][0]);
  }


  const getUserDetails = async ()=>{
    const url = `${host}/auth/getuseradmin`
    const response = await fetch(url, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "auth-token": authtoken,
        "uId": props.userId,
      }
    });
    const tempJson = await response.json();
    setUserName(tempJson.name);
    setUserEmail(tempJson.email);
    setUserPhoneNo(tempJson.phoneNumber);
    setUserAddress(tempJson.address);
  }

  const deleteFromOrders = async ()=>{
    const url =`${host}/cart/deleteFromCart`;
    const response = await fetch(url,{
      method: 'DELETE',
      headers: {
        "auth-token":authtoken,
        "cartId":props.cartId,
      }
    })
    const tempJson = await response.json();
    if(tempJson.success){
      props.setJsonList([]);
      props.getOrders();
      props.setMessageType("success");
      props.setMessageTitle("Success!");
      props.setMessage(tempJson.success);
      props.setDisplayAlert(true);
    }else if(!tempJson.success){
      props.setMessageType("danger");
      props.setMessageTitle("Error!!");
      props.setMessage("Unable to delete from cart");
      props.setDisplayAlert(true);
    }
  }

  const handleMarkDelivered = async() =>{
    const url =`${host}/order/markDelivered`;
    const bodyToBeSent = {
      quantity: cartQuantity
    }
    const response = await fetch(url,{
      method: 'PUT',
      headers: {
        "auth-token":authtoken,
        "orderId":props.orderId,
      },
    });
    const tempJson = await response.json();
    if(tempJson.success){
      props.setJsonList([]);
      props.getOrders();
      props.setMessageType("success");
      props.setMessageTitle("Success!");
      props.setMessage(tempJson.success);
      props.setDisplayAlert(true);
      setTimeout(() => {
        props.setDisplayAlert(false);
      }, 3000);
    }
  }


 ///work pending from here

  return (
      <div className="individualCartBlock">
      <div className="cartBlockPictureDiv"><img className="cartBlockImage" src={`${host}/${productImageUrl}`} alt="" /></div>
      <div className="informationOfProduct">
        <div className="informationHeading"><h2>Product Details:</h2></div>
        <div className="productNameCart">1. Product Name: {productName}</div>
        <div className="productTypeCart">2. Product Type: {productType}</div>
        <div className="productQuantityInCart">3. Quantity Ordered: {props.quantityOrdered}</div>
        <div className="productPriceCart">4. Product Price: {productPrice}</div>
        <div className="productStockCart">5. In stock: {productStock}</div>
        <div className="productCategoryCart">6. Product Category: {productCategory}</div>
        <div className="interactiveBtnsCartBlock">
        {(props.productStatus === "pending") && <button className="proceedToCheckoutBtn" onClick={handleMarkDelivered}>Mark Delivered</button>}
        </div>
      </div>
      <div className="informationOfProduct informationOfUser">
        <div className="informationHeading"><h2>User Details:</h2></div>
        <div className="productNameCart">1. User Name: {userName}</div>
        <div className="productTypeCart">2. User Email: {userEmail}</div>
        <div className="productQuantityInCart">3. User Phone Number: {userPhoneNo}</div>
        <div className="productPriceCart">4. User Address: {userAddress}</div>
        <div className="interactiveBtnsCartBlock">
        {(props.productStatus === "pending") &&         
        <div className="deleteCart">
          <i className="fa-solid fa-trash"></i>
        </div>}

        </div>
      </div>
      </div>
  );
};

export default AdminOrderBlock;

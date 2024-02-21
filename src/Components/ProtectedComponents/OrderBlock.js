import React, { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../Styles/ProtectedComponentStyles/CartBlock.css"

import { bindActionCreators } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import {actionCreators} from '../../AdminState/index';


const OrderBlock = (props) => {
  const host = process.env.REACT_APP_HOST_NAME;
  const [productName, setProductName] = useState('')
  const [productType, setProductType] = useState('')
  const [productPrice, setProductPrice] = useState('')
  const [productStock, setProductStock] = useState('')
  const [productCategory, setProductCategory] = useState('')
  const [productImageUrl, setProductImageUrl] = useState('')
  const [updateCart, setUpdateCart] = useState(false)
  const [cartQuantity, setCartQuantity] = useState(props.quantity)
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const userActions = bindActionCreators(actionCreators,dispatch);
  const userAuthtoken = useSelector(state => state.userAuthtoken);
  
  useEffect(()=>{
    getProductDetails();
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
    console.log(tempJson);
    setProductName(tempJson[0]['productName']);
    setProductType(tempJson[0]['typeIndicator']);
    setProductPrice(tempJson[0]['price']);
    setProductStock(tempJson[0]['remainingStock']);
    setProductCategory(convertCamelToSpaces(tempJson[0]['category']));
    setProductImageUrl(tempJson[0]['images'][0]);
    setCartQuantity(props.quantity);
  }

  const deleteFromCart = async ()=>{
    const url =`${host}/cart/deleteFromCart`;
    const response = await fetch(url,{
      method: 'DELETE',
      headers: {
        "auth-token":userAuthtoken,
        "cartId":props.cartId,
      }
    })
    const tempJson = await response.json();
    if(tempJson.success){
      props.setJsonList([]);
      props.getUserOrders();
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

  const handleEditClick = () => {
    setUpdateCart(true);
    // Add any additional logic for editing here
  }

  const handleDoneClick = async() =>{
    const url =`${host}/cart/updateCartProducts`;
    const bodyToBeSent = {
      quantity: cartQuantity
    }
    console.log(bodyToBeSent);
    const response = await fetch(url,{
      method: 'PUT',
      headers: {
        "auth-token":userAuthtoken,
        "cartId":props.cartId,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyToBeSent),
    });
    const tempJson = await response.json();
    if(tempJson.success){
      props.setJsonList([]);
      props.getCart();
      props.setMessageType("success");
      props.setMessageTitle("Success!");
      props.setMessage(tempJson.success);
      props.setDisplayAlert(true);
      setTimeout(() => {
        props.setDisplayAlert(false);
      }, 3000);
    }
    setUpdateCart(false);
  }



  const handleProceedToCheckout = () => {
    userActions.setProductId(props.productId);
    userActions.setTypeId(props.typeId);
    userActions.setProductQuantityInCart(cartQuantity);
    navigate('/proceedCheckout')
  }
 ///work pending from here

  return (
      <div className="individualCartBlock">
      <div className="cartBlockPictureDiv"><img className="cartBlockImage" src={`${host}/${productImageUrl}`} alt="" /></div>
      <div className="informationOfProduct">
        <div className="informationHeading"><h2>Product Details:</h2></div>
        <div className="productNameCart">1. Product Name: {productName}</div>
        <div className="productTypeCart">2. Product Type: {productType}</div>
        <div className="productQuantityInCart">3. Quantity Selected: <input className="quantityInputCart" type="number" 
        value={cartQuantity} disabled/></div>
        <div className="productPriceCart">4. Product Price: {productPrice}</div>
        <div className="productStockCart">5. In stock: {productStock}</div>
        <div className="productCategoryCart">6. Product Category: {productCategory}</div>
      </div>
      <div className="interactiveButtons">
      <div className="deleteCart">
        <i className="fa-solid fa-trash"></i>
      </div>
      </div>
      </div>
  );
};

export default OrderBlock;

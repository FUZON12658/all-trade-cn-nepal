import React,{useEffect,useState} from "react";
import "../../Styles/ProductStyles/ProductItem.css";

import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from "redux";
import {actionCreators} from '../../AdminState/index';
import { useNavigate } from "react-router-dom";



export default function ProductItem(props) {
  const host = process.env.REACT_APP_HOST_NAME;
  const [json, setJson] = useState([]);
  const [price, setPrice] = useState(0);
  const [images, setImages] = useState([]);
  const [image, setImage] = useState([]);
  const [activeType, setActiveType] = useState(0);
  const [inStock,setInStock] = useState(0);
  const [imagesDiv, setImagesDiv]=useState([]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userActions = bindActionCreators(actionCreators,dispatch);
  const userAuthtoken = useSelector(state => state.userAuthtoken);
  const productId = useSelector(state => state.productId);
  

  const increaseQuantityField = (e)=>{
    const closestMasterContainer = e.target.closest(".productItemContainer");
    const quantityField = closestMasterContainer.querySelector(".quantityField");
    let quantity = parseInt(quantityField.value);
    quantity<inStock && quantity++;
    quantityField.value = quantity;
  }
  const decreaseQuantityField = (e)=>{
    const closestMasterContainer = e.target.closest(".productItemContainer");
    const quantityField = closestMasterContainer.querySelector(".quantityField");
    let quantity = parseInt(quantityField.value);
    quantity>1 && quantity--;
    quantityField.value = quantity;
  }


  const toggleActive = (e) => {
    const masterContainer = e.target.closest(".productTypes");
    const initialActive = masterContainer.querySelector(".typeChild.active");
    if (!e.currentTarget.classList.contains("active")) {
      e.currentTarget.classList.add("active");
      initialActive.classList.remove("active");
      setActiveType(Array.from(e.currentTarget.parentElement.children).indexOf(e.currentTarget));
    }
  }
  
  useEffect(() => {
    async function fetchData() {
      const url = `${host}/productControl/fetchProductSubsByName`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          productName: props.productName,
          category: props.category,
          'Content-Type': 'application/json',
        },
      });
      let tempJson = await response.json();
      setJson(tempJson);
      console.log('here');
      console.log(tempJson)
    }
    fetchData();
  }, []);
  

  const renderProductTypes = () => {
    if (Object.keys(json).length === 0) {
      // Check if json is empty, meaning useEffect is still running
      return <div>Loading...</div>;
    }
    const productTypes = [];
    for (let index = 0;index<Object.keys(json).length;index++){
      productTypes.push(<div className={`typeChild ${(index===0)?"active":""}`} onClick={toggleActive}>{json[index]['typeIndicator']}</div>);
      console.log('fromInsideRender');
      console.log(json);
    }
    return productTypes;
  };


  useEffect(() => {
    const imagesDivTemp = [];
    console.log(images);
    for(let index = 0; index<images.length;index++){
      let url =`${process.env.REACT_APP_HOST_NAME}/${images[index]}`;
      console.log(url);
      imagesDivTemp.push(<img
        className={`productItemImage ${(index===0)?'active':''}`}
        src={url}
        alt=""
    />)
    }
    setImagesDiv(imagesDivTemp);

  }, [price, json]);
  
  useEffect(() => {
    if (Object.keys(json).length !== 0) {
      setImages(json[activeType]['images']);
      setPrice(json[activeType]['price']);
      setInStock(json[activeType]['remainingStock'])
    }

  }, [activeType, json]);
  
  const displayPrevImage = () => {
    if (activeImageIndex > 0) {
      setActiveImageIndex(activeImageIndex - 1);
    }
    else if(activeImageIndex===0){
      setActiveImageIndex(images.length-1);
    }
  };
  
  const displayNextImage = () => {
    if (activeImageIndex < images.length - 1) {
      setActiveImageIndex(activeImageIndex + 1);
    }
    else if(activeImageIndex === images.length-1){
      setActiveImageIndex(0);
    }
  };

  useEffect(()=>{
    let url =`${process.env.REACT_APP_HOST_NAME}/${images[activeImageIndex]}`;
    setImage(<img
      className={`productItemImage`}
      src={url}
      alt=""
  />)
  },[images,activeType,json,activeImageIndex])

  const addProductToCart = async(e)=>{
    console.log(props.id);
    const quantityFieldMaster = e.target.closest('.containerBottomNavigation');
    const quantityField = quantityFieldMaster.querySelector('.quantityField');
    const quantityValue = quantityField.value;
    let activeTypeId = ''
    if (Object.keys(json).length !== 0) {
      activeTypeId = json[activeType]._id;
    }
    const cartDetailsToBeSent = {
      productId:props.id,
      typeId:activeTypeId,
      quantity:quantityValue,
    }
    const url = `${host}/cart/addToCart`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'auth-token':userAuthtoken,
          'Content-Type': 'application/json',
        },
        body:JSON.stringify(cartDetailsToBeSent),
      });
      let tempJson = await response.json();
      console.log(tempJson);
  }

  const navigateToProductFrame = () => {
    console.log(props.id);
    userActions.setProductId(props.id);
    navigate(`/productFrame?productId=${props.id}`);
}


  return (
    <div className="pageMaster">
      <div className="productItemContainer">
        <div className="imgContainer">
        <img
            src={`${process.env.REACT_APP_HOST_NAME}/backend/productImages/navArrow.png`}
            alt=""
            className="imgNavIconImage"
            onClick={displayPrevImage}
          />
        {image}
        <img
            src={`${process.env.REACT_APP_HOST_NAME}/backend/productImages/navArrow.png`}
            alt=""
            className="imgNavIconImage rotated"
            onClick={displayNextImage}
          />
        </div>
        <div className="productShortDetails">
          <p className="productName" onClick={navigateToProductFrame}><b>{props.productName}</b></p>
          <p className="productPrice">Rs {price}</p>
        </div>
        <div className="productTypes">
          {renderProductTypes()}
        </div>
        <div className="containerBottomNavigation">
          <button className="addToCartButton" onClick={addProductToCart}>Add to Cart</button>
          <input className="quantityField" type="number" min="1" value="1" readOnly/>
          <img
            src={`${process.env.REACT_APP_HOST_NAME}/backend/productImages/iconPlus.png`}
            alt=""
            className="plusIconImage"
            onClick={increaseQuantityField}
          />
          <img
            src={`${process.env.REACT_APP_HOST_NAME}/backend/productImages/iconMinus.png`}
            alt=""
            className="minusIconImage"
            onClick={decreaseQuantityField}
          />
        </div>
      </div>
    </div>
  );
}

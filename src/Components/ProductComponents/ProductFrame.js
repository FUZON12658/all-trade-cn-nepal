import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../AdminState/index";
import { useLocation, useNavigate } from "react-router-dom";


import "../../Styles/ProductStyles/ProductFrame.css";

const ProductFrame = () => {

  const location = useLocation();
  const productIdFromUrl = new URLSearchParams(location.search).get('productId');

  const host = process.env.REACT_APP_HOST_NAME;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userActions = bindActionCreators(actionCreators, dispatch);
  const userAuthtoken = useSelector((state) => state.userAuthtoken);
  const productId = useSelector((state) => state.productId);
  const [json, setJson] = useState([]);
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [priceToBeSent, setPriceToBeSent] = useState(0);
  const [price, setPrice] = useState(0);
  const [inStock, setInStock] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [images, setImages] = useState([]);
  const [image, setImage] = useState([]);
  const [category, setCategory] = useState("");
  const [activeType, setActiveType] = useState(0);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [typeId, setTypeId] = useState('');

  function convertCamelToSpaces(camelCaseString) {
    return camelCaseString
      .replace(/([a-z])([A-Z])/g, "$1 $2") // Add space before capital letters
      .replace(/^./, (str) => str.toUpperCase()); // Capitalize the first letter
  }

  const increaseQuantityFieldInFrame = async (e) => {
    if(quantity<inStock){
      setQuantity(quantity + 1);
      setPrice((quantity + 1) * json[activeType]["price"]);
    }
  };
  const decreaseQuantityFieldInFrame = async (e) => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      setPrice((price / quantity) * (quantity - 1));
    }
  };

  const toggleActiveInFrame = (e) => {
    const masterContainer = e.target.closest(".productTypeContainerInFrame");
    const initialActive = masterContainer.querySelector(
      ".typeChildInFrame.active"
    );
    if (!e.currentTarget.classList.contains("active")) {
      e.currentTarget.classList.add("active");
      initialActive.classList.remove("active");
      setActiveType(
        Array.from(e.currentTarget.parentElement.children).indexOf(
          e.currentTarget
        )
      );
    }
  };

  const getProductToBeShown = async () => {
    let url = `${host}/productControl/fetchProductMainsById`;
    console.log("from here");
    console.log(productId);
    const response = await fetch(url, {
      method: "GET",
      headers: {
        productMainId: productIdFromUrl,
      },
    });
    const tempJson = await response.json();
    console.log(tempJson);
    console.log();
    url = `${host}/productControl/fetchProductSubsByName`;
    const finalResponse = await fetch(url, {
      method: "GET",
      headers: {
        productName: tempJson[0]["productName"],
        category: tempJson[0]["category"],
      },
    });
    const finalJson = await finalResponse.json();
    console.log(finalJson);
    setJson(finalJson);
    setProductName(finalJson[0]["productName"]);
    setCategory(convertCamelToSpaces(finalJson[0]["category"]));
  };

  const renderProductTypesInFrame = () => {
    if (Object.keys(json).length === 0) {
      // Check if json is empty, meaning useEffect is still running
      return <div>Loading...</div>;
    }
    const productTypes = [];
    for (let index = 0; index < Object.keys(json).length; index++) {
      productTypes.push(
        <div
          className={`typeChildInFrame ${index === 0 ? "active" : ""}`}
          onClick={toggleActiveInFrame}
        >
          {json[index]["typeIndicator"]}
        </div>
      );
      console.log("fromInsideRender");
      console.log(json);
    }
    return productTypes;
  };

  const displayPrevImageInFrame = () => {
    if (activeImageIndex > 0) {
      setActiveImageIndex(activeImageIndex - 1);
    } else if (activeImageIndex === 0) {
      setActiveImageIndex(images.length - 1);
    }
  };

  const displayNextImageInFrame = () => {
    if (activeImageIndex < images.length - 1) {
      setActiveImageIndex(activeImageIndex + 1);
    } else if (activeImageIndex === images.length - 1) {
      setActiveImageIndex(0);
    }
  };

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const addProductToCart = async(e)=>{
    let activeTypeId = ''
    if (Object.keys(json).length !== 0) {
      activeTypeId = json[activeType]._id;
    }
    console.log(activeTypeId);
    const cartDetailsToBeSent = {
      productId:productId,
      typeId:activeTypeId,
      quantity:quantity,
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

  useEffect(() => {
    getProductToBeShown();
  }, []);

  useEffect(() => {
    if (Object.keys(json).length !== 0) {
      setImages(json[activeType]["images"]);
      setTypeId(json[activeType]["_id"]);
      setPrice(json[activeType]["price"]);
      setPriceToBeSent(json[activeType]["price"]);
      setInStock(json[activeType]["remainingStock"]);
      setDescription(json[activeType]['description'])
    }
  }, [activeType, json]);

  useEffect(() => {
    let url = `${process.env.REACT_APP_HOST_NAME}/${images[activeImageIndex]}`;
    setImage(<img className={`productItemImageInFrame`} src={url} alt="" />);
  }, [images, json, activeImageIndex]);


  const handleBuyNow = () => {
    userActions.setProductId(productId);
    userActions.setTypeId(typeId);
    userActions.setProductQuantityInCart(quantity);
    userActions.setProductPrice(priceToBeSent);
    userActions.setTaxAmount(10);
    navigate('/proceedCheckout')
  }

  return (
    <div className="productFrameContainer">
      <div className="pageNav">{category}</div>
      <div className="imageContainerDetailContainer">
        <div className="productImageContainerInFrame">
          <img
            src={`${process.env.REACT_APP_HOST_NAME}/backend/productImages/navArrow.png`}
            alt=""
            className="imgNavIconImageInFrame"
            onClick={displayPrevImageInFrame}
          />
          {image}
          <img
            src={`${process.env.REACT_APP_HOST_NAME}/backend/productImages/navArrow.png`}
            alt=""
            className="imgNavIconImageInFrame rotated"
            onClick={displayNextImageInFrame}
          />
        </div>
        <div className="titleTypeDetailContainerInFrame">
          <div className="productTitleContainerInFrame">{productName}</div>
          <div className="productTypeContainerInFrame">
            {renderProductTypesInFrame()}
          </div>
          <div className="productInformationContainerInFrame">
            <div className="productQuantityContainerInFrame">
              <b>Quantity Selected:</b>{" "}
              <img
                src={`${process.env.REACT_APP_HOST_NAME}/backend/productImages/iconPlus.png`}
                alt=""
                className="plusIconImageInFrame"
                onClick={increaseQuantityFieldInFrame}
              />{" "}
              <input
                className="quantityInputFrame"
                type="number"
                value={quantity}
                min={1}
                onChange={handleQuantityChange}
              />
              <img
                src={`${process.env.REACT_APP_HOST_NAME}/backend/productImages/iconMinus.png`}
                alt=""
                className="minusIconImageInFrame"
                onClick={decreaseQuantityFieldInFrame}
              />
            </div>
            <div className="productPriceContainerInFrame">
              <b>Price:</b> Rs {price}
            </div>
            <div className="productInStockContainerInFrame">
              <b>Remaining Stock:</b> {inStock}
            </div>
            <div className="productCategoryContainerInFrame">
              <b>Product Category:</b> {category}
            </div>
            <div className="frameButtonsDiv">
              <button className="frameInteractiveButtons" onClick={addProductToCart}>Add To Cart</button>
              <button className="frameInteractiveButtons" onClick={handleBuyNow}>Buy Now</button>
            </div>
          </div>
        </div>
      </div>
      <div className="productDescriptionContainer">
        <div className="descriptionTitle">Description</div>
        <div className="descriptionBody">{description}</div>
      </div>
    </div>
  );
};

export default ProductFrame;

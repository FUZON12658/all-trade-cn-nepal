import React, { useState } from "react";
import "../../AdminStyles/Product/addProductsSubForm.css";
import { bindActionCreators } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import {actionCreators} from '../../AdminState/index'
import finalPropsSelectorFactory from "react-redux/es/connect/selectorFactory";

const AdminAddProductsSub = (props) => {

  const host = process.env.REACT_APP_HOST_NAME;
  const dispatch = useDispatch();
  const actions = bindActionCreators(actionCreators,dispatch);
  const status = useSelector(state => state.status)
  const authtoken = useSelector(state => state.authtoken)  



  const [formData, setFormData] = useState({
    typeIndicator: "",
    productName: props.productName,
    category: props.category,
    price: "",
    remainingStock: "",
    description: "",
    productImage: null,
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "productImage" ? files : value,
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    setIsSubmitted(true);
    const formDataToSend  = new FormData();
    formDataToSend.append("typeIndicator",formData.typeIndicator);
    formDataToSend.append("productName",formData.productName);
    formDataToSend.append("category",formData.category);
    formDataToSend.append("price",formData.price);
    formDataToSend.append("remainingStock", formData.remainingStock);
    formDataToSend.append("description",formData.description);
    for (let i = 0; i < formData.productImage.length; i++) {
      formDataToSend.append("productImage", formData.productImage[i]);
    }

    props.onSubmit(formDataToSend); // Pass the form data to the parent's onSubmit function
  };
  return (
    <div className="formWrapper">
      <form action="" onSubmit={handleSubmit} encType="multipart/form-data" disabled={isSubmitted}>
        <div className="typeIndicatorDiv">
          <input
            className="productFormEntry"
            type="text"
            id="typeIndicator"
            name="typeIndicator"
            placeholder="Type Indicator"
            onChange={handleInputChange}
            disabled={isSubmitted}
            required
          />
        </div>

        <div className="nameDiv">
          <input
            className="productFormEntry"
            type="text"
            id="productName"
            name="productName"
            placeholder="Product Name"
            defaultValue={props.productName}
            style={{ color: "#000000", fontWeight: "bold" }}
            disabled
            required
          />
        </div>
        <div className="categoryDiv">
          <input
            className="productFormEntry"
            type="text"
            id="category"
            name="category"
            placeholder="category"
            defaultValue={props.category}
            style={{ color: "#000000", fontWeight: "bold" }}
            disabled
            required
          />
        </div>

        <div className="priceDiv">
          <input
            className="productFormEntry"
            type="number"
            id="price"
            name="price"
            placeholder="Price"
            onChange={handleInputChange}
            disabled={isSubmitted}
            required
          />
        </div>

        <div className="stockDiv">
          <input
            className="productFormEntry"
            type="number"
            id="remainingStock"
            name="remainingStock"
            onChange={handleInputChange}
            placeholder="Remaining Stock"
            disabled={isSubmitted}
            required
          />
        </div>

        <div className="descriptionDiv">
          <textarea
            className="productFormEntry"
            id="description"
            name="description"
            placeholder="Description"
            disabled={isSubmitted}
            onChange={handleInputChange}
            rows="4"
            required
          ></textarea>
        </div>

        <div className="photoDiv">
          <label htmlFor="photo" className="productFormEntry photoDivLabel">
            Upload Photo
          </label>
          <input
            type="file"
            id="photo"
            name="productImage"
            accept="image/png, image/jpeg, image/gif, image/webp, image/svg+xml"
            className="productFormEntry"
            multiple
            required
            onChange={handleInputChange}
            disabled={isSubmitted}
          />
        </div>

        <div className="submitBtn">
          <button
            className="formSubmitBtn"
            type="submit"
            disabled={isSubmitted}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminAddProductsSub;

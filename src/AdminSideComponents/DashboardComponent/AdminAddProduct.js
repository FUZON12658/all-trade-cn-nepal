import React, { useState, useEffect } from "react";
import "../../AdminStyles/Product/addProducts.css";
import AdminAddProductsSub from "./AdminAddProductsSub";
import { bindActionCreators } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import {actionCreators} from '../../AdminState/index'

const AdminAddProduct = () => {
  const host = process.env.REACT_APP_HOST_NAME;
  const dispatch = useDispatch();
  const actions = bindActionCreators(actionCreators,dispatch);
  const status = useSelector(state => state.status)
  const authtoken = useSelector(state => state.authtoken)  
  const [formData, setFormData] = useState({
    productName: "",
    category: "",
    types: 1,
  });

  const [shouldAddTypeForms, setShouldAddTypeForms] = useState(false);
  const [subFormDataArray, setSubFormDataArray] = useState([]);
  const [subFormsSubmitted, setSubFormsSubmitted] = useState(0);
  const [shouldIRenderAddAnother, setShouldIRenderAddAnother] = useState(false);



  const renderSubForms = () => {
    const subForms = [];
    for (let i = 0; i < formData.types; i++) {
      subForms.push(<AdminAddProductsSub 
                          key={i} 
                          productName={formData.productName}
                          category={formData.category}
                          onSubmit={handleSubFormSubmit} />);
    }
    return subForms;
  };

  useEffect(() => {
    // Check if all subforms have been submitted
    if (subFormsSubmitted === formData.types) {
      for (let index = 0; index < formData.types; index++) {
        handleSubApiCall(index);
      }
      handleMainApiCall();
      setShouldIRenderAddAnother(true);
    }
  }, [subFormsSubmitted, formData.types]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setShouldAddTypeForms(true); // Set the flag to render subForms
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "types" ? parseInt(value, 10) : value,
    }));
  };
  
  const handleMainApiCall = async()=>{
    const url = `${host}/productControl/productMain`
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "auth-token":authtoken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const json = await response.json();
  }

  const handleSubApiCall = async(index)=>{
    const url = `${host}/productControl/productSub`
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "auth-token":authtoken,
      },
      body: subFormDataArray[index],
    });
    const json = await response.json();
  }

  const handleSubFormSubmit = async (subFormData) => {
    // Use the state updater function to ensure the latest state
    setSubFormDataArray((prevData) => {
      const updatedData = [...prevData, subFormData];
      return updatedData;
    });
    // Update the count after updating the state
    setSubFormsSubmitted((prevCount) => prevCount + 1);
  };

  const goBackToInitial = () =>{
    setShouldAddTypeForms(false);
    setShouldIRenderAddAnother(false);
    setFormData({
      productName:"",
      category:"",
      types: 1,
    })
    setSubFormDataArray([]);
    setSubFormsSubmitted(0);
  }

  return (
    <div className="addProductMainFormContainer">
      <div className="formWrapper">
        <h1 className="formTitle">Add Products</h1>
        <form onSubmit={handleFormSubmit} >
          <div className="nameDiv">
            <input
              className="productFormEntry"
              type="text"
              id="productName"
              name="productName"
              placeholder="Product Name"
              value={formData.productName}
              onChange={handleInputChange}
              disabled={shouldAddTypeForms}
              required
            />
          </div>

          <div className="categoryDiv">
            <select
              className="productFormEntry"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              disabled={shouldAddTypeForms}
              required
            >
              <option className="productCategoryChild" value="" disabled>
                Select Product Category
              </option>
              <option className="productCategoryChild" value="fireSafety">
                Fire Safety
              </option>
              <option className="productCategoryChild" value="roadSafety">
                Road Safety
              </option>
              <option className="productCategoryChild" value="marineSafety">
                Marine Safety
              </option>
              <option className="productCategoryChild" value="electricalSafety">
                Electrical Safety
              </option>
              <option className="productCategoryChild" value="headProtection">
                PPE Items &gt; Head Protection
              </option>
              <option className="productCategoryChild" value="bodyProtection">
                PPE Items &gt; Body Protection
              </option>
              <option className="productCategoryChild" value="eyeProtection">
                PPE Items &gt; Eye Protection
              </option>
              <option className="productCategoryChild" value="earProtection">
                PPE Items &gt; Ear Protection
              </option>
              <option className="productCategoryChild" value="handProtection">
                PPE Items &gt; Hand Protection
              </option>
              <option className="productCategoryChild" value="surveyItems">
                Survey Items
              </option>
              <option className="productCategoryChild" value="rescueItems">
                Rescue Items
              </option>
            </select>
          </div>

          <div className="typeDiv">
            <input
              className="productFormEntry"
              type="number"
              id="types"
              name="types"
              placeholder="Types"
              value={formData.types}
              onChange={handleInputChange}
              disabled={shouldAddTypeForms}
              max={100}
              min={1}
              required
            />
          </div>

          <div className="submitBtn">
            <button className="formSubmitBtn" type="submit" disabled={shouldAddTypeForms}>
              Submit
            </button>
          </div>
        </form>
      </div>
      {shouldAddTypeForms && (
        <div className="subForm">
          {renderSubForms()}
        </div>
      )}
      <div className="addAnother">
      {shouldIRenderAddAnother && (
          <button className="formSubmitBtn"
            onClick={goBackToInitial}>Add another product
            </button>
     )}
     </div>
    </div>
  );
};

export default AdminAddProduct;

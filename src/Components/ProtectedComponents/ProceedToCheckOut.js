import React, { useEffect, useState } from 'react'
import "../../Styles/ProtectedComponentStyles/ProceedCheckout.css"
import CryptoJS from 'crypto-js'

import { bindActionCreators } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import {actionCreators} from '../../AdminState/index';
import { useNavigate } from 'react-router-dom';

const ProceedToCheckOut = () => {
  const navigate = useNavigate()
  const productId = useSelector(state => state.productId);
  const typeId = useSelector(state=> state.typeId);
  const productQuantityInCart = useSelector(state => state.productQuantityInCart);
  const productPrice = useSelector(state => state.productPrice);
  const taxAmount = useSelector(state => state.taxAmount);
  const [shouldICallEsewa, setShouldICallEsewa] = useState(false)
  const [productPriceToBeDisplayed, setPRoductPriceToBeDisplayed] = useState(productPrice);
  const [quantityToBeDisplayed, setQuantityToBeDisplayed] = useState(productQuantityInCart);
  const [taxAmtDisplayed, setTaxAmtToBeDisplayed] = useState(taxAmount);
  const [finalAmount,setFinalAmount] = useState(parseFloat(productPrice)*parseFloat(productQuantityInCart));
  const [totalAmount,setTotalAmount] = useState(parseFloat(finalAmount)+parseFloat(taxAmount));
  const [userFormData, setUserFormData] = useState({
    name:'',
    email: '',
    phoneNumber: '',
    address: '',
  });

  const [esewaFormData, setEsewaFormData] = useState({
    amount: '100',
    tax_amount: '10',
    total_amount: '110',
    transaction_uuid: '',
    product_code: "EPAYTEST",
    product_service_charge: '0',
    product_delivery_charge: '0',
    success_url:'',
    failure_url:'',
    signed_field_names: 'total_amount,transaction_uuid,product_code',
  });
  
  const handleSubmitWithEsewa = (e) => {
    e.preventDefault();
    // Construct the message for hashing
      const currentDateTime = new Date().toISOString().replace(/[-T:.Z]/g, '');
      const transaction_uuid = `${typeId}-${currentDateTime}`;
      const transaction_uuid_base64 = btoa(transaction_uuid);

      const message = Object.keys(esewaFormData)
      .filter((key) => key === 'total_amount' || key === 'transaction_uuid' || key === 'product_code')
      .map((key) => {
        if (key === 'transaction_uuid') {
          return `${key}=${transaction_uuid_base64}`;
        }
        else if (key === 'total_amount') {
            return `${key}=${totalAmount}`;
        } 
        else if (key=== 'product_code') {
          return `${key}=${esewaFormData[key]}`;
        }
        return ''; // Exclude other fields from the message
      })
      .join(',');
    // Replace the secret key with your actual secret key
    const secretKey = process.env.REACT_APP_CLIENT_ESEWA_SECRET_KEY;
    // Calculate the hash
    const hash = CryptoJS.HmacSHA256(message, secretKey);
    const hashInBase64 = CryptoJS.enc.Base64.stringify(hash);

    // Update the form data with the calculated signature
    setEsewaFormData((prevData) => ({
      ...prevData,
      amount:finalAmount,
      tax_amount:taxAmount,
      total_amount:totalAmount,
      transaction_uuid:transaction_uuid_base64,
      signature: hashInBase64,
      success_url: `http://localhost:3000/orders?status=success&transactionId=${transaction_uuid_base64}`,
      failure_url: `http://localhost:3000/orders?status=failure&transactionId=${transaction_uuid_base64}`,
    }));
    
    
    setShouldICallEsewa(true);
  };


  useEffect(()=>{
    shouldICallEsewa && document.getElementById('esewaForm').submit();
    shouldICallEsewa && setShouldICallEsewa(false);
  },[shouldICallEsewa])

  useEffect(() => {
    const handleKeyPress = (e) => {
      // Check if the key pressed is F5 (key code 116) or if the user is trying to reload the page
      if (e.key === 'F5' || (e.ctrlKey === false && e.key === 'r')) {
        // Prevent the default behavior to avoid page reload
        e.preventDefault();

        // Change the location to the desired page using navigate
        navigate('/cart');
      }
    };

    const handleBeforeUnload = (e) => {
      // Optionally show a confirmation message
      const confirmationMessage = 'Are you sure you want to leave?';
      e.returnValue = confirmationMessage;
    };
    

    // Add event listeners when the component mounts
    document.addEventListener('keydown', handleKeyPress);
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Clean up the event listeners when the component unmounts
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [navigate]); // Include navigate in the dependency array// Empty dependency array ensures the effect runs only once when the component mounts



  const getUserData = async(e) => {
    const url = `${host}/auth/getuser`
    const response = await fetch(url, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "auth-token": userAuthtoken,
      }
    });
    const json = await response.json();
    setUserFormData({
      name:json.name,
      email:json.email,
      phoneNumber:json.phoneNumber,
      address:json.address,
    })
  };

  return (
    <div className='proceedToCheckoutPageContainer'>
      <div className="checkOutInfo"></div>
      <div className="calculatedPriceDiv">
        <div className="ProductDetailsSideProceedToCheckout">
          <div className="productNameCheckout"></div>
          <div className="priceCheckout">Product Price:</div>
          <div className="quantityCheckout">Quantity: </div>
          <div className="taxAmount">Tax amount: </div>
          <div className="grandTotal">Total Amount: </div>
        </div>
        <div className="priceCalculationSide">
          <div className="emptyDiv"></div>
          <div className="productPriceProceedCalculationSide">{productPriceToBeDisplayed}</div>
          <div className="quantityProceedCalculationSide">{quantityToBeDisplayed}</div>
          <div className="taxProceedCalcualtionSide">{taxAmtDisplayed}</div>
          <div className="taxProceedCalcualtionSide">{totalAmount}</div>
        </div>
      </div>
      <div className="paymentButtonsProceed">
        <div className="payWithEsewa" onClick={handleSubmitWithEsewa}><button className="payWith Esewa">Pay With Esewa</button></div>
        <div className="payWithKhalti"><button className="payWith Khalti">Pay With Khalti</button></div>
      </div>
      <div className="esewsPostShouldNotBeDisplayed" style={{display:"none"}}>
        <form id="esewaForm" action="https://rc-epay.esewa.com.np/api/epay/main/v2/form" method="POST" onSubmit={handleSubmitWithEsewa}>
        {Object.entries(esewaFormData).map(([key, value]) => (
          <input type="text" name={key} value={value} key={key} readOnly required />
        ))}

        {/* Add other form fields as needed */}

        <input type="submit" value="Pay with esewa" />
    </form>
      </div>

    </div>
  )
}

export default ProceedToCheckOut

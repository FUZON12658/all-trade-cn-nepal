import React, { useEffect, useState } from 'react';
import ProductItem from './ProductItem';
import '../../Styles/ProductStyles/ProductPage.css';

export default function ProductPage(props) {
  const host = process.env.REACT_APP_HOST_NAME;
  const [json, setJson] = useState([]);
  const [productName, setProductName] = useState('');

  useEffect(() => {
    async function fetchData() {
      const url = `${host}/productControl/fetchProductMainsByCategory`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          category: props.category,
          'Content-Type': 'application/json',
        },
      });
      let tempJson = await response.json();
      setJson(tempJson);
      console.log(json);
      console.log('here');
    }
    fetchData();
  }, []);

  const renderProductItems = () => {
    if (Object.keys(json).length === 0) {
      // Check if json is empty, meaning useEffect is still running
      return <div>Loading...</div>;
    }
    const productPageContainer = [];
    for (let index = 0;index<Object.keys(json).length;index++){
      productPageContainer.push(<ProductItem key={index} productName = {json[index]['productName']} category = {props.category} id={json[index]['_id']}/>);
      console.log('fromInsideRender');
      console.log(json);
    }
    return productPageContainer;
  };

  function convertCamelToSpaces(camelCaseString) {
    return camelCaseString
      .replace(/([a-z])([A-Z])/g, "$1 $2") // Add space before capital letters
      .replace(/^./, (str) => str.toUpperCase()); // Capitalize the first letter
  }

  return( 
  <div className="productPageTitleAndBlockContainer">
    <div className="productPageTitle">{convertCamelToSpaces(props.category)}</div>
  <div className="productPageContainer">
    {renderProductItems()}
  </div>
  </div>
)}
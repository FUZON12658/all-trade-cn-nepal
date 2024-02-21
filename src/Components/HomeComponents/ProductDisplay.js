import React, { useState } from 'react'
import "../../Styles/HomeStyles/ProductDisplay.css"
import { Link, useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from "redux";
import {actionCreators} from '../../AdminState/index';



const ProductDisplay = () => {
  const host = process.env.REACT_APP_HOST_NAME;
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [shouldIDisplaySearchResults, setShouldIDisplaySearchResults] = useState(false);
  const [shouldIDisplayErrorMessage, setShouldIDisplayErrorMessage] = useState(false);

  const dispatch = useDispatch();
  const userActions = bindActionCreators(actionCreators,dispatch);

  function convertCamelToSpaces(camelCaseString) {
    return camelCaseString
      .replace(/([a-z])([A-Z])/g, "$1 $2") // Add space before capital letters
      .replace(/^./, (str) => str.toUpperCase()); // Capitalize the first letter
  }

  function convertSpacesToCamel(spaceSeparatedString) {
    return spaceSeparatedString
      .replace(/\s(.)/g, (match, group) => group.toUpperCase()) // Capitalize the first letter after each space
      .replace(/^\w/, (match) => match.toLowerCase()); // Convert the first letter to lowercase
  }

  const displayProductFrame = (e, index) => {
    console.log(searchResults[index]["_id"]);
    userActions.setProductId(searchResults[index]["_id"]);
    navigate('/productFrame');
  }

  const renderSearchResults = () =>{
    const searchResultsBlock = [];
    for(let index = 0; index<Object.keys(searchResults).length; index++){
      shouldIDisplayErrorMessage && searchResultsBlock.push(<div className="searchedResultsDiv" key={index}>{errorMessage}</div>
      )
      shouldIDisplaySearchResults && searchResultsBlock.push(<div className="searchedResultsDiv" key={index} onClick={(e)=>displayProductFrame(e, index)}>{searchResults[index]['productName']}, {convertCamelToSpaces(searchResults[index]['category'])}</div>
      )
    }
    return searchResultsBlock;
  }

  const handleSearch = async () => {
    try {
      const url = `${host}/search?search=${encodeURIComponent(searchQuery)}`;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        setSearchResults(data);
        setErrorMessage(data.message);
        console.log(data.message);
        if(data.message){
          setShouldIDisplayErrorMessage(true);
          console.log("this mf passed");
        }
        else{
          setShouldIDisplayErrorMessage(false);
          setShouldIDisplaySearchResults(true);
        }
          


      } else {
        setSearchResults([]);
        setErrorMessage(data.error || 'An error occurred');
      }
    } catch (error) {
      console.error('Error:', error.message);
      setSearchResults([]);
      setErrorMessage('An error occurred');
    }
  };
  
  const handleSearchChange = (e)=>{
    setSearchQuery(e.target.value);
  }

  return (
    <div className='homePageProductsViewer'>
      <h1 className='searchBarName'>Search Products</h1>
      <div className={`searchBarContainer `}>
        <input 
          className="searchBar" 
          type="text" value={searchQuery} 
          onChange={handleSearchChange}
          placeholder='Search Product Name' 
          />
        <i className="fa-solid fa-magnifying-glass magnify-icon" onClick={handleSearch}></i>
      </div>
      <div className={`searchResults`} style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
        {renderSearchResults()}
      </div>
      <div className="Quick_Links_Product_Display"><h1 className="headingsH1ProductDisplay">Explore Our Products</h1>
        <div className="Quick_Links_Body_Product_Display">
            <div className="Quick_Links_List_One">
              <ul className='quickLinksUl'>
                <li>
                    <Link className="productDisplayLinkChild" to="/fireSafety">Fire Safety</Link>
                </li>
                <li>
                    <Link className="productDisplayLinkChild" to="/roadSafety">Road Safety</Link>
                </li>
                <li>
                    <Link className="productDisplayLinkChild" to="/marineSafety">Marine Safety</Link>
                </li>
                <li>
                    <Link className="productDisplayLinkChild" to="/electricalSafety">Electrical Safety</Link>
                </li>
                <li>
                    <Link className="productDisplayLinkChild" to="/surveyItems">Survey Items</Link>
                </li>
                <li>
                    <Link className="productDisplayLinkChild" to="/rescueItems">Rescue Items</Link>
                </li>
              </ul>
            </div>
            <div className="Quick_Links_List_Two">
            <ul className='quickLinksUl'>
                <li>
                    <Link className="productDisplayLinkChild" to="/headProtection">Head Protection</Link>
                </li>
                <li>
                    <Link className="productDisplayLinkChild" to="/bodyProtection">Body Protection</Link>
                </li>
                <li>
                    <Link className="productDisplayLinkChild" to="/eyeProtection">Eye Protection</Link>
                </li>
                <li>
                    <Link className="productDisplayLinkChild" to="/earProtection">Ear Protection</Link>
                </li>
                <li>
                    <Link className="productDisplayLinkChild" to="/handProtection">Hand Protection</Link>
                </li>
              </ul>
            </div>
        </div>
    </div>
    </div>
  )
}

export default ProductDisplay

import React, { useState } from 'react'
import AdminProductUDFrame from './AdminProductUDFrame'
import "../../AdminStyles/Product/products.css"



const AdminProducts = () => {
  const host = process.env.REACT_APP_HOST_NAME;

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [shouldIDisplaySearchWindow, setShouldIDisplaySeardchWindow] = useState(true);
  const [productToBeDisplayed, setProductToBeDisplayed] = useState('');
  const [categoryOfProductToBeDisplayed, setCategoryOfProductToBeDisplayed] = useState('')
  const [shouldIDisplaySearchResults, setShouldIDisplaySearchResults] = useState('');
  const [parentId, setParentId]= useState('');

  const displayUDFrame = (e, index) =>{
    setShouldIDisplaySeardchWindow(false);
    setProductToBeDisplayed(e.target.textContent.split(",")[0])
    setCategoryOfProductToBeDisplayed(convertSpacesToCamel(e.target.textContent.split(",")[1]));
    setParentId(searchResults[index]["_id"]);
  }

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

  const renderSearchResults = () =>{
    if(Object.keys(searchResults).length === 0){
      return;
    }

    const searchResultsBlock = [];
    for(let index = 0; index<Object.keys(searchResults).length; index++){
      shouldIDisplaySearchResults && searchResultsBlock.push(<div className="searchedResultsDiv" key={index} onClick={(e)=>displayUDFrame(e, index)}>{searchResults[index]['productName']}, {convertCamelToSpaces(searchResults[index]['category'])}</div>
      )
    }
    return searchResultsBlock;
  }

  const handleSearch = async () => {
    try {
      const url = `${host}/search?search=${encodeURIComponent(searchQuery)}`;
      const response = await fetch(url);
      const data = await response.json();
      if (response.ok) {
        setSearchResults(data);
        setErrorMessage('');
        if(data[0].productName)
          setShouldIDisplaySearchResults(true);
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

  const shouldIDisplaySearchWindowToTrue = () => {
    setShouldIDisplaySeardchWindow(true);
  }



  const renderSearchedProducts = ()=>{
    return (<AdminProductUDFrame key={1} productName={productToBeDisplayed} category={categoryOfProductToBeDisplayed} 
      handleSearch={handleSearch} parentId = {parentId} shouldIDisplaySearchWindowToTrue={shouldIDisplaySearchWindowToTrue}/>);
  }
  const handleSearchChange = (e)=>{
    setSearchQuery(e.target.value);
  }
  return (
    <div className='MyProductsContainer'>
      <div className={`searchBarContainer ${(shouldIDisplaySearchWindow)?"":"hidden"}`}>
        <input 
          className="searchBar" 
          type="text" value={searchQuery} 
          onChange={handleSearchChange}
          placeholder='Search Product Name' 
          />
        <i className="fa-solid fa-magnifying-glass magnify-icon" onClick={handleSearch}></i>
      </div>
      <div className={`searchResults ${(shouldIDisplaySearchWindow)?"":"hidden"}`}>
        {renderSearchResults()}
      </div>
      {!shouldIDisplaySearchWindow && <div className={`renderedProductContainer`}>
        {renderSearchedProducts()}
      </div>}
    </div>
  )
}

export default AdminProducts

import React, { useEffect, useState } from "react";
import "../../AdminStyles/Product/addProductUDFrame.css";
import Instagram from "../../Images/instagram.png"
import { useDispatch, useSelector } from 'react-redux'


const AdminProductUDFrame = (props) => {
  const host = process.env.REACT_APP_HOST_NAME;

  const authtoken = useSelector(state=>state.authtoken);
  const [activeType, setActiveType] = useState(0);
  const [json, setJson] = useState([]);
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [inStock, setInStock] = useState(0);
  const [typeIndicator, setTypeIndicator] = useState('');
  const [images, setImages] = useState([]);
  const [imagesToBeUploaded, setImagesToBeUploaded] = useState('');

  const [formData, setFormData] = useState({
    productName: props.productName,
    price: "",
    typeIndicator: "",
    remainingStock: "",
    description: "",
    images: "",
  });
  const [allImagesList, setAllImagesList] = useState([]);
  const [shouldIEnableEdit, setShouldIEnableEdit] = useState(false);

  useEffect(()=>{
    fetchProductSubDetails();
  },[])



  const toggleActiveInUDFrame = (index) => {
    setActiveType(index);
  };
  

  const fetchProductSubDetails = async () => {
    try {
      const url = `${host}/productControl/fetchProductSubsByName`;
      const response = await fetch(url,{
        method:"GET",
        headers:{
          productName: props.productName,
          category: props.category,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setJson(data);
      } else {
        setJson([]);
      }
    } catch (error) {
      console.error('Error:', error.message);
      setJson([]);
    }
  };

  const deleteType = async (index) => {
    if(Object.keys(json).length === 1){
      return
    }
    const url = `${host}/productControl/deleteProductSubs/${json[index]["_id"]}`

    // Make an API call to delete the image
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        "auth-token": authtoken,
      },
    });

    const data = await response.json();

    if (response.ok) {
      // If successful, update the state or take other necessary actions
      fetchProductSubDetails();
    } else {
      // Handle errors if any
      console.error(data.error);
    }
  }


  const displayAllTypes = () => {
    return Object.keys(json).map((index) => (
      <div className="typePackage" key={index}>
        <div className="typeDeleteOrAddFrameButtons">
          <i className="fa-solid fa-trash deleteBtnAdmin" onClick={()=>deleteType(index)}></i>
        </div>
        <div
          className={`typeChildInFrame editRequiredInMyProducts ${index == activeType ? "active" : ""}`}
          onClick={() => toggleActiveInUDFrame(index)}
        >
          {json[index]["typeIndicator"]}
        </div>
      </div>
    ));
  };

const updateProductDetails = async () => {
  try {
    const url = `${host}/productControl/updateProductSub/${json[activeType]["_id"]}`;
    const mpFormData = new FormData();

    // Append JSON data
    mpFormData.append('typeIndicator', formData.typeIndicator);
    mpFormData.append('price', formData.price);
    mpFormData.append('remainingStock', formData.remainingStock);
    mpFormData.append('description', formData.description);

    // Append image files
    for (let i = 0; i < images.length; i++) {
      mpFormData.append('productImage', imagesToBeUploaded[i]);
    }
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'auth-token': authtoken,
      },
      body: mpFormData,
    });

    const data = await response.json();

    if (response.ok) {
      // If successful, update the state or take other necessary actions
      fetchProductSubDetails(); // Update product details after successful update
    } else {
      // Handle errors if any
      console.error(data.error);
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
};
  

const deleteSingleImage = async (imageName) => {

  if(images.length===1){
    return 
  }
  try {
    const url = `${host}/productControl/deleteProductSubImage/${json[activeType]["_id"]}/${imageName}`
    // Make an API call to delete the image
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        "auth-token": authtoken,
      },
    });

    const data = await response.json();

    if (response.ok) {
      // If successful, update the state or take other necessary actions
      fetchProductSubDetails();
    } else {
      // Handle errors if any
      console.error(data.error);
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

const handleImageUpload = (event) => {
  setImagesToBeUploaded(event.target.files);
};

useEffect(()=>{
  updateProductDetails();
},[imagesToBeUploaded])

const displayAllImages = () => {
  const allImages = [];
  for(let index = 0 ; index<images.length;index++){
    let url = `${host}/${images[index]}`;
    let pathForDeletion = images[index].split("productImage-")[1];
    allImages.push(
    <div className="imagePackage" key={index}>
    <div className="imageDeleteOrAddFrameButtons typeDeleteOrAddFrameButtons" onClick={()=>deleteSingleImage(pathForDeletion)}>
      <i className="fa-solid fa-trash editBtnAdmin"></i>
    </div>
    <div className="imageContainerAdimnEditOrDelete">
      <img className={`productItemImageInUDFrame`} src={url} alt="" />
    </div>
    </div>
  )}
  allImages.push(
    <div className="imagePackage plusIconInDisplayAllImagesContainer" key={`addImage`}>
      <label htmlFor="newImage" className="fa-solid fa-circle-plus plusIconInDisplayAllImages"></label>
      <input
        type="file"
        id="newImage"
        name="newImages"
        accept="image/png, image/jpeg, image/gif, image/webp, image/svg+xml"
        style={{ display: 'none' }}
        multiple
        onChange={handleImageUpload}
      />
    </div>
  );
  return allImages;
};


useEffect(()=>{
  if (Object.keys(json).length !== 0) {
    setImages(json[activeType]["images"]);
    setPrice(json[activeType]["price"]);
    setInStock(json[activeType]["remainingStock"]);
    setDescription(json[activeType]['description'])
    setTypeIndicator(json[activeType]['typeIndicator']);

  }
},[json, activeType])

useEffect(()=>{
  setFormData({
    price,
    typeIndicator,
    remainingStock: inStock,
    description,
  })
},[images]);

const handleInputChange = (e) => {
  const { name, value } = e.target;
  setFormData((prevData) => ({
    ...prevData,
    [name]: name === "types" ? parseInt(value, 10) : value,
  }));
};

const enableEdit = () => {
  setShouldIEnableEdit(!shouldIEnableEdit);
}

useEffect(()=>{
  !shouldIEnableEdit && updateProductDetails();
},[shouldIEnableEdit])

const deleteFullProduct = async() => {
  const url = `${host}/productControl/deleteProductMains/${props.parentId}`

  // Make an API call to delete the image
  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      "auth-token": authtoken,
    },
  });

  const data = await response.json();

  if (response.ok) {
    // If successful, update the state or take other necessary actions
    props.shouldIDisplaySearchWindowToTrue();
  } else {
    // Handle errors if any
    console.error(data.error);
  }
}

  return (
    <div className="productUDFrame">
      <div className="imageDisplayDiv">{displayAllImages()}</div>
      <div className="NameDisplayDiv">{props.productName}
          <div className="interactiveButtonsInProductName">
            <i className="fa-solid fa-trash deleteBtnAdmin" onClick={deleteFullProduct}></i>
          </div></div>
      <div className="allTypesDisplayDiv">{displayAllTypes()}</div>
      <div className="editableDetails">
        <div className="editableTitleBlock">
          <div className="productDetailsTitleBlock">Product Details</div>
          <div className="interactiveButtonsInTitle">
            <i className="fa-solid fa-pen-to-square editBtnAdmin" onClick={enableEdit}></i>
            <i className="fa-solid fa-trash deleteBtnAdmin"></i>
          </div>
        </div>
        <div className="editableDetailsBlock">
          <label className="editProductFormEntryLabel" htmlFor="price">
            Price
          </label>
          <input
            className="editProductFormEntry"
            type="text"
            id="price"
            name="price"
            placeholder="Product Price"
            value={formData.price}
            onChange={handleInputChange}
            disabled={!shouldIEnableEdit}
            required
          />
        </div>
        <div className="editableDetailsBlock">
          <label className="editProductFormEntryLabel" htmlFor="typeIndicator">
            Product Type
          </label>
          <input
            className="editProductFormEntry"
            type="text"
            id="typeIndicator"
            name="typeIndicator"
            placeholder="Type Indicator"
            value={formData.typeIndicator}
            onChange={handleInputChange}
            disabled={!shouldIEnableEdit}
            required
          />
        </div>
        <div className="editableDetailsBlock">
          <label className="editProductFormEntryLabel" htmlFor="remainingStock">
            Remaining Stock
          </label>
          <input
            className="editProductFormEntry"
            type="text"
            id="remainingStock"
            name="remainingStock"
            placeholder="Type Indicator"
            value={formData.remainingStock}
            onChange={handleInputChange}
            disabled={!shouldIEnableEdit}
            required
          />
        </div>
        <div className="editableDetailsBlock">
          <label className="editProductFormEntryLabel" htmlFor="description">
            Product Description
          </label>
          <input
            className="editProductFormEntry"
            type="text"
            id="description"
            name="description"
            placeholder="Type Indicator"
            value={formData.description}
            onChange={handleInputChange}
            disabled={!shouldIEnableEdit}
            required
          />
        </div>
      </div>
    </div>
  );
};

export default AdminProductUDFrame;

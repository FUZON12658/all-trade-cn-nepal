export const setLogIn = (status)=>{
  return (dispatch) =>{
    dispatch({
      type:'LogIn',
      payload:status
    })
  }
}

export const setLogOut = (status) =>{
  return (dispatch) =>{
    dispatch({
      type:'LogOut',
      payload:status
    })
  }
}

export const setAuthtoken = (authtoken) =>{
  return (dispatch) =>{
    dispatch({
      type:'setAuthtoken',
      payload:authtoken
    })
  }
}

export const setUserLoggedIn = (userStatus)=>{
  return (dispatch) =>{
    dispatch({
      type:'UserLoggedIn',
      payload:userStatus
    })
  }
}

export const setUserLoggedOut = (userStatus) =>{
  return (dispatch) =>{
    dispatch({
      type:'UserLoggedOut',
      payload:userStatus
    })
  }
}

export const setUserAuthtoken = (userAuthtoken) =>{
  return (dispatch) =>{
    dispatch({
      type:'setUserAuthtoken',
      payload:userAuthtoken
    })
  }
}

export const setProductId = (productId) =>{
  return (dispatch) =>{
    dispatch({
      type:'setProductId',
      payload:productId
    })
  }
}

export const setTypeId = (typeId) =>{
  return (dispatch) =>{
    dispatch({
      type:'setTypeId',
      payload:typeId
    })
  }
}

export const setProductQuantityInCart = (productQuantityInCart) =>{
  return (dispatch) =>{
    dispatch({
      type:'setProductQuantityInCart',
      payload:productQuantityInCart
    })
  }
}

export const setProductPrice = (productPrice) => {
  return (dispatch) => {
    dispatch({
      type:'setProductPrice',
      payload: productPrice
    })
  }
}

export const setTaxAmount = (taxAmount) => {
  return (dispatch) => {
    dispatch({
      type:'setTaxAmount',
      payload: taxAmount
    })
  }
}
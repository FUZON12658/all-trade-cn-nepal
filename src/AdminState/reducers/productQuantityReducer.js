import { getCookie, setCookie } from "./cookieGetterSetter";
const storedProductQuantity = getCookie("storedProductQuantity");

const reducer = (state=storedProductQuantity || '', action)=>{
  if(action.type === 'setProductQuantityInCart'){
    state = action.payload
    setCookie("storedProductQuantity",state);
  }
  return state;
}

export default reducer;
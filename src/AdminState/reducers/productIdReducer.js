import { getCookie, setCookie } from "./cookieGetterSetter";

const storedProductId = getCookie('storedProductId');

const reducer = (state=storedProductId || '', action)=>{
  if(action.type === 'setProductId'){
    state = action.payload
    setCookie('storedProductId',state);
  }
  return state;
}

export default reducer;
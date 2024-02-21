import { getCookie, setCookie } from "./cookieGetterSetter";

const storedUserAuthtoken = getCookie("storedUserAuthtoken");

const reducer = (state = storedUserAuthtoken||'', action) => {
  if(action.type === 'setUserAuthtoken'){
    state = action.payload
    setCookie("storedUserAuthtoken", state,7);
  }
  return state;
}

export default reducer;
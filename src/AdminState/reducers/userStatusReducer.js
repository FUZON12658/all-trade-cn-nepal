import { getCookie, setCookie } from "./cookieGetterSetter";

const storedUserStatus = getCookie("storedUserStatus")

const reducer = (state=storedUserStatus||"UserLoggedOut", action) => {
  if(action.type === 'UserLoggedIn'){
    state = 'UserLoggedIn';
    setCookie("storedUserStatus",state,7);
  }
  else if(action.type === 'UserLoggedOut'){
    state = 'UserLoggedOut';
    setCookie("storedUserAuthtoken","");
    setCookie("storedUserStatus",state,7);
  }
  return state;
}

export default reducer;
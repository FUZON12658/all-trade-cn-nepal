import { setCookie } from "./cookieGetterSetter";

const reducer = (state='Log In', action)=>{
  if(action.type==='LogIn'){
    state = 'Log In'
    setCookie('storedAuthtoken',"");
  }
  else if(action.type === 'LogOut'){
    state = 'Log Out'
  }
  return state;
}

export default reducer;
// const storedAuthtoken = localStorage.getItem('storedAuthtoken');

// const reducer = (state=storedAuthtoken || 'a', action)=>{
//   if(action.type === 'setAuthtoken'){
//     state = action.payload
//     localStorage.setItem('storedAuthtoken', action.payload);
//   }
//   return state;
// }

// export default reducer;

import { getCookie, setCookie } from "./cookieGetterSetter";

const storedAuthtoken = getCookie('storedAuthtoken');

const reducer = (state = storedAuthtoken || 'a', action) => {
  if (action.type === 'setAuthtoken') {
    state = action.payload;
    setCookie('storedAuthtoken', action.payload, 7); // Set cookie to expire in 7 days
  }
  return state;
};

export default reducer;
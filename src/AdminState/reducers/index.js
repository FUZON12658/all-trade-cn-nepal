import { combineReducers } from "redux";
import statusReducer from "./statusReducer";
import authtokenReducer from "./authtokenReducer";
import userStatusReducer from "./userStatusReducer";
import userAuthtokenReducer from "./userAuthtokenReducer";
import productIdReducer from "./productIdReducer";
import typeIdReducer from "./typeIdReducer";
import productQuantityReducer from "./productQuantityReducer";
import productPriceReducer from "./productPriceReducer"
import taxAmountReducer from "./taxAmountReducer";

const reducers = combineReducers({
  status:statusReducer,
  authtoken:authtokenReducer,
  userStatus:userStatusReducer,
  userAuthtoken:userAuthtokenReducer,
  productId:productIdReducer,
  typeId:typeIdReducer,
  productQuantityInCart:productQuantityReducer,
  productPrice:productPriceReducer,
  taxAmount:taxAmountReducer
})

export default reducers;
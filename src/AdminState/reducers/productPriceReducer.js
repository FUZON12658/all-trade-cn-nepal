const reducer = (state= '', action)=>{
  if(action.type === 'setProductPrice'){
    state = action.payload
  }
  return state;
}

export default reducer;
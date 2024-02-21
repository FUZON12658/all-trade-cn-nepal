const reducer = (state= '', action)=>{
  if(action.type === 'setTaxAmount'){
    state = action.payload
  }
  return state;
}

export default reducer;
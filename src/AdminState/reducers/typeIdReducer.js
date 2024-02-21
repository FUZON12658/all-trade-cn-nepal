const reducer = (state='', action)=>{
  if(action.type === 'setTypeId'){
    state = action.payload
  }
  return state;
}

export default reducer;
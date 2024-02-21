import React from "react";
import "../MasterStyles/alert.css";

const Alert = (props) => {
  const displayNone= (e) => {
    const alert = e.target.closest(".alertContainer");
    alert.classList.add(props.addClassToCloseBtn);
    props.setDisplayAlertToFalse();
  }

  return (
    <div className="alert">
      <div className={`alertContainer ${props.type}`}>
        <div className="alertContainerMain">
          <div className={`title ${props.type}`}>
            <h1>{props.title}</h1>
          </div>
          <div className="body">{props.body}</div>
        </div>
        <i className="fa-solid fa-circle-xmark xmark-pos" onClick={displayNone}></i>
      </div>
    </div>
  );
};

export default Alert;



//use the following div to show alert and rename as you see fit 

/** 
 *const [messageTitle, setMessageTitle] = useState('');   
  const [messageType, setMessageType] = useState('');
  const [message,setMessage]=useState('');
  const [displayAlert, setDisplayAlert] = useState(false);
  const setDisplayAlertToFalse = ()=>{
    setDisplayAlert(false);
  }
 * 
 * wrap it inside a container and position it according to following css
 * <div className="loginPanelFullContainer">
*   <div className="alertMessageLogin">
       {displayAlert && <Alert title={messageTitle} type={messageType} body={message} addClassToCloseBtn ={`${(displayAlert)?"none":""}`} setDisplayAlertToFalse={setDisplayAlertToFalse}/>}
    </div>
    <div className="loginBodyContainer">
    //put body content inside this container 
    </div>
    </div>
    .alertMessageLogin{
  display: block;
  margin-top: 150px;
  width: 40vw;
  height:100px;
}

.loginPanelFullContainer{
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.loginBodyContainer{
  margin-top: 40px;
}
 * 
*/
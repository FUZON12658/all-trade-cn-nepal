import React, {useEffect, useState} from 'react';
import menu_icon from '../Images/menu_icon.webp';
import close_icon from '../Images/close_icon.webp';
import {Link, useNavigate} from 'react-router-dom';
import '../AdminStyles/AdminNavBar.css'
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import {actionCreators} from '../AdminState/index'

let AdminNavBar = () => {
  const dispatch = useDispatch();
  const actions = bindActionCreators(actionCreators,dispatch);
  const status = useSelector(state => state.status)
  const navigate = useNavigate();    



  const [isMenuIconActive, setIsMenuIconActive] = useState(false);
  const [isCloseIconActive, setIsCloseIconActive] = useState(false);
  const [isMobileMenuContainerActive, setIsMobileMenuContainerActive] = useState(false);

  const toggleActiveClass = (reference)=>{
    if(reference === "menuContainer")
          setIsMobileMenuContainerActive(!isMobileMenuContainerActive);
  }
  
  const setLoginAndNavigate = ()=>{
    actions.setLogIn();
    actions.setAuthtoken("");
    navigate('*');
  }

  useEffect(()=>{
      const handleResize = () => {
          if(window.innerWidth <= 1300){
              setIsMenuIconActive(true);
              setIsCloseIconActive(!isCloseIconActive);
          }
      };  
      window.addEventListener('resize',handleResize); 
  })

  return (
    <div>
        <div className="admin_desktop_navigation">
        
            <div className="fuzonLogo"><img src={menu_icon} className={`menuIconMobileAdmin ${isMobileMenuContainerActive?'':'active'} ${(status==="Log In")?'loggedOut':''}`} onClick={()=>toggleActiveClass('menuContainer')} alt="" />
                <img src={close_icon} className={`closeIconMobileAdmin ${isMobileMenuContainerActive?'active':''} ${(status==="Log In")?'loggedOut':''}`} onClick={()=>toggleActiveClass('menuContainer')} alt="" /><Link className="fuzonLogoAnchor" to="dashboard">FUZON.</Link></div>
        <div className={`loginlogoutCheckAndVisibilitySetter ${(status==="Log In")?'loggedOut':''}`}>
            <nav className="adminNavUnorderedListContainer">
                <ul className="adminNavUnorderedList">
                    <li>
                       <Link  className="adminNavUnorderedListChild" to="products">My-Products</Link>
                    </li>
                    <li>
                        <Link  className="adminNavUnorderedListChild" to="addProduct">Add-Products</Link>
                    </li>
                    <li>
                        <Link  className="adminNavUnorderedListChild" to="ordersPending">Orders-Pending</Link>
                    </li>
                    <li>
                        <Link  className="adminNavUnorderedListChild" to="ordersDelivered">Orders-Delivered</Link>
                    </li>
                    <li>
                        <Link  className="adminNavUnorderedListChild" to="" onClick={setLoginAndNavigate}>{status}</Link>
                    </li>
                </ul> 
            </nav>
            </div>
            <nav className={`adminMobileMenuContainer ${isMobileMenuContainerActive?'active':''} ${(status==="Log In")?'loggedOut':''}`}>
                <ul className="adminNavUnorderedListMobile">
                    <li onClick={()=>toggleActiveClass('menuContainer')}>
                    <Link  className="adminNavUnorderedListChildMobile" to="products">My Products</Link>
                    </li>
                    <li   onClick={()=>toggleActiveClass('menuContainer')}>
                    <Link  className="adminNavUnorderedListChildMobile" to="addProduct">Add Products</Link>
                    </li>
                    <li   onClick={()=>toggleActiveClass('menuContainer')}>
                    <Link  className="adminNavUnorderedListChildMobile" to="ordersPending">Orders-Pending</Link>
                    </li>
                    <li   onClick={()=>toggleActiveClass('menuContainer')}>
                    <Link  className="adminNavUnorderedListChildMobile" to="ordersDelivered">Orders-Delivered</Link>
                    </li>
                    <li onClick={()=>toggleActiveClass('menuContainer')}>
                    <Link  className="adminNavUnorderedListChildMobile" to="" onClick={setLoginAndNavigate}>{status}</Link>
                    </li>
                </ul> 
            </nav>
        
    </div>
    </div>
  )
}

export default AdminNavBar

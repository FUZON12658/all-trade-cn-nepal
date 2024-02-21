import React, {useEffect, useState} from 'react';
import menu_icon from '../Images/menu_icon.webp';
import close_icon from '../Images/close_icon.webp';
import {Link} from 'react-router-dom';

import { bindActionCreators } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import {actionCreators} from '../AdminState/index';



export default function NavBar() {
    const dispatch = useDispatch();
    const userActions = bindActionCreators(actionCreators,dispatch);
    const userStatus = useSelector(state => state.userStatus)

    const [isProductDropDownActive, setIsProductDropDownActive] = useState(false);
    const [isPPEDropDownActive, setIsPPEDropDownActive] = useState(false);
    const [isLoginDropDownActive, setIsLoginDropDownActive] = useState(false);
    const [isMenuIconActive, setIsMenuIconActive] = useState(false);
    const [isCloseIconActive, setIsCloseIconActive] = useState(false);
    const [isMobileMenuContainerActive, setIsMobileMenuContainerActive] = useState(false);

    const toggleActiveClass = (reference)=>{
        if (reference === "Products"){
            setIsProductDropDownActive(!isProductDropDownActive);
            setIsLoginDropDownActive(false);
        }       
        else if(reference === "Login"){
            setIsLoginDropDownActive(!isLoginDropDownActive);
            setIsProductDropDownActive(false);
        }
        else if(reference === "PPE"){
            setIsPPEDropDownActive(!isPPEDropDownActive);
            setIsLoginDropDownActive(false);
        }
        else if(reference === "menuContainer")
            setIsMobileMenuContainerActive(!isMobileMenuContainerActive);
    }

    useEffect(()=>{
        const handleResize = () => {
            if(window.innerWidth <= 1300){
                setIsMenuIconActive(true);
                setIsCloseIconActive(!isCloseIconActive);
            }
        }; 
        console.log(userStatus); 
        window.addEventListener('resize',handleResize); 
    })


  return (
    <div>
        <div className="desktop_navigation">
            <div className="company_logo"><Link className="companyLogoAnchor" to="/">ALL NEPAL TRADE CENTER.</Link></div>
            <nav className='desktopNavigationNavBar'>   
                <ul className="desktopNavUnorderedHorizontalList">
                    <li className="navHorizontalListContainer">
                    <Link className="navHorizontalListChild" to="/">Home</Link>
                    </li>
                    <li className="navHorizontalListContainer">
                        <Link className={`dropdownParent navHorizontalListChild ${isProductDropDownActive?'active':''}`} onClick={()=>toggleActiveClass("Products")} style={{cursor: 'pointer'}}>Products</Link>
                        <div className={`dropdownContainer ${isProductDropDownActive?'active':''}`}>
                            <ul className="dropdownContents">
                                <li>
                                    <Link className="dropdownContentChild" to="/fireSafety">Fire Safety</Link>
                                </li>
                                <li>
                                    <Link className="dropdownContentChild" to="/roadSafety">Road Safety</Link>
                                </li>
                                <li>
                                    <Link className="dropdownContentChild" to="/marineSafety">Marine Safety</Link>
                                </li>
                                <li>
                                    <Link className="dropdownContentChild" to="/electricalSafety">Electrical Safety</Link>
                                </li>
                                <li className='dropdownParentForChildContainer'>
                                <Link className={`dropdownParentForChild dropdownContentChild ${isPPEDropDownActive?'active':''}`} onClick={()=>toggleActiveClass("PPE")} style={{cursor: 'pointer'}}>PPE Items</Link>
                                    <div className={`dropdownContainerChild ${isPPEDropDownActive?'active':''}`}>
                                        <ul className="dropdownContents">
                                            <li>
                                                <Link className="dropdownContentChild" to="/headProtection">Head Protection</Link>
                                            </li>
                                            <li>
                                                <Link className="dropdownContentChild" to="/bodyProtection">Body Protection</Link>
                                            </li>
                                            <li>
                                                <Link className="dropdownContentChild" to="/eyeProtection">Eye Protection</Link>
                                            </li>
                                            <li>
                                                <Link className="dropdownContentChild" to="/earProtection">Ear Protection</Link>
                                            </li>
                                            <li>
                                                <Link className="dropdownContentChild" to="/handProtection">Hand Protection</Link>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                                <li>
                                    <Link className="dropdownContentChild" to="/surveyItems">Survey Items</Link>
                                </li>
                                <li>
                                    <Link className="dropdownContentChild" to="/rescueItems">Rescue Items</Link>
                                </li>
                            </ul>
                        </div>

                    </li>
                    <li className={`navHorizontalListContainer navLogin ${(userStatus==='UserLoggedOut')?'':'hidden'}`}>
                        <Link className={`dropdownParent navHorizontalListChild ${isLoginDropDownActive?'active':''}`} onClick={()=>toggleActiveClass("Login")} style={{cursor: 'pointer'}}>Login / Signup</Link>
                        <div className={`dropdownContainer ${isLoginDropDownActive?'active':''}`}>
                            <ul className="dropdownContents">
                                <li>
                                    <Link className="dropdownContentChild" to="/login">Login</Link>
                                </li>
                                <li>
                                    <Link className="dropdownContentChild" to="/signUp">Signup</Link>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li className={`navHorizontalListContainer navLogin ${(userStatus==='UserLoggedIn')?'':'hidden'}`}>
                        <Link className={`dropdownParent navHorizontalListChild ${isLoginDropDownActive?'active':''}`} onClick={()=>toggleActiveClass("Login")} style={{cursor: 'pointer'}}>Dashboard</Link>
                        <div className={`dropdownContainer ${isLoginDropDownActive?'active':''}`}>
                            <ul className="dropdownContents">
                                <li>
                                    <Link className="dropdownContentChild" to="/cart">Cart</Link>
                                </li>
                                <li>
                                    <Link className="dropdownContentChild" to="/orders">Orders</Link>
                                </li>
                                <li>
                                    <Link className="dropdownContentChild" to="/userDashboard">My Profile</Link>
                                </li>
                                <li>
                                    <Link className="dropdownContentChild" to="/login" onClick={userActions.setUserLoggedOut}>Log Out</Link>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li className="navHorizontalListContainer">
                        <Link className="navHorizontalListChild" to="/contactUs">Contact Us</Link>
                    </li>
                </ul>
            
            </nav>
        </div>
        <div className="mobile_nav">
            <div className={`menu_icon ${isMenuIconActive?'active':''}`}><img src={menu_icon} alt="Menu" onClick={()=>toggleActiveClass("menuContainer")}/></div>
            
            <div className={`mobile_menu_container ${isMobileMenuContainerActive?'active':''}`}>
                <div className={`close_icon ${isMobileMenuContainerActive?'active':''}`}><img src={close_icon} alt="" onClick={()=>toggleActiveClass("menuContainer")} /></div>
                <ul className="mobileMenuVerticalUnorderedList">
                    <li>
                        <Link className="mobileMenuChild" to="/">Home</Link>
                    </li>
                    <li className="navHorizontalListContainer mobileNavDropDownContainer">
                        <Link className={`mobileMenuChild dropdownParent navHorizontalListChild ${isProductDropDownActive?'active':''}`} onClick={()=>toggleActiveClass("Products")} style={{cursor: 'pointer'}}>Products<div className={`greaterThan ${isProductDropDownActive?'active':''}`}>&gt;</div></Link>
                        <div className={`mobileDropDownContainer ${isProductDropDownActive?'active':''}`}>
                            <ul className="mobileDropDownContent">
                                <li>
                                    <Link className="mobileDropDownContentChild" to="/fireSafety">Fire Safety</Link>
                                </li>
                                <li>
                                    <Link className="mobileDropDownContentChild" to="/roadSafety">Road Safety</Link>
                                </li>
                                <li>
                                    <Link className="mobileDropDownContentChild" to="/marineSafety">Marine Safety</Link>
                                </li>
                                <li>
                                    <Link className="mobileDropDownContentChild" to="/electricalSafety">Electrical Safety</Link>
                                </li>
                                <li className='dropdownParentForChildContainer  mobileNavDropDownChildContainer'>
                                <Link className={`mobileDropDownContentChild ${isPPEDropDownActive?'active':''}`} onClick={()=>toggleActiveClass("PPE")} style={{cursor: 'pointer'}}>PPE Items<div className={`greaterThan ${isPPEDropDownActive?'active':''}`}>&gt;</div></Link>
                                    <div className={`mobileDropDownContainerChild ${isPPEDropDownActive?'active':''}`}>
                                        <ul className="mobileDropDownChildContent">
                                            <li>
                                                <Link className="mobileDropDownContentChild" to="/headProtection">Head Protection</Link>
                                            </li>
                                            <li>
                                                <Link className="mobileDropDownContentChild" to="/bodyProtection">Body Protection</Link>
                                            </li>
                                            <li>
                                                <Link className="mobileDropDownContentChild" to="/eyeProtection">Eye Protection</Link>
                                            </li>
                                            <li>
                                                <Link className="mobileDropDownContentChild" to="/earProtection">Ear Protection</Link>
                                            </li>
                                            <li>
                                                <Link className="mobileDropDownContentChild" to="/handProtection">Hand Protection</Link>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                                <li>
                                    <Link className="mobileDropDownContentChild" to="/surveyItems">Survey Items</Link>
                                </li>
                                <li>
                                    <Link className="mobileDropDownContentChild" to="/fireSafety">Rescue Items</Link>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li className={`navHorizontalListContainer mobileNavDropDownContainer navLogin ${(userStatus==='UserLoggedOut')?'':'hidden'}`}>
                        <Link className={`mobileMenuChild dropdownParent navHorizontalListChild ${isLoginDropDownActive?'active':''}`} onClick={()=>toggleActiveClass("Login")} style={{cursor: 'pointer'}}>Login/SignUp<div className={`greaterThan ${isLoginDropDownActive?'active':''}`}>&gt;</div></Link>
                        <div className={`mobileDropDownContainer ${isLoginDropDownActive?'active':''}`}>
                            <ul className="mobileDropDownContent">
                                <li>
                                    <Link className="mobileDropDownContentChild" to="/login">Login</Link>
                                </li>
                                <li>
                                    <Link className="mobileDropDownContentChild" to="/signUp">SignUp</Link>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li className={`navHorizontalListContainer mobileNavDropDownContainer navLogin ${(userStatus==='UserLoggedIn')?'':'hidden'}`}>
                        <Link className={`mobileMenuChild dropdownParent navHorizontalListChild ${isLoginDropDownActive?'active':''}`} onClick={()=>toggleActiveClass("Login")} style={{cursor: 'pointer'}}>Dashboard<div className={`greaterThan ${isLoginDropDownActive?'active':''}`}>&gt;</div></Link>
                        <div className={`mobileDropDownContainer ${isLoginDropDownActive?'active':''}`}>
                            <ul className="mobileDropDownContent">
                                <li>
                                    <Link className="mobileDropDownContentChild" to="/cart">Cart</Link>
                                </li>
                                <li>
                                    <Link className="mobileDropDownContentChild" to="/orders">Orders</Link>
                                </li>
                                <li>
                                    <Link className="mobileDropDownContentChild" to="/userDashboard">My Profile</Link>
                                </li>
                                <li>
                                    <Link className="mobileDropDownContentChild" to="/login" onClick={userActions.setUserLoggedOut}>Log Out</Link>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li>
                        <Link className="mobileMenuChild" to="/contactUs">Contact Us</Link>
                    </li>
                </ul>
            </div>
        </div>
    </div>
  )
}

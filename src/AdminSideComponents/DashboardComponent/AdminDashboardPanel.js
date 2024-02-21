import React from 'react'
import '../../AdminStyles/Dashboard/dashboard.css'
import instagram from '../../Images/instagram.png';
import facebook from '../../Images/facebook.png';
import twitter from '../../Images/twitter1.png';
import whatsapp from '../../Images/whatsapp.png';
import linkedIn from '../../Images/linkedin.svg';


const AdminDashboardPanel = () => {
  return (
    <div>
      <div className="welcomeScreen">
        <div className="welcomeMessage">Welcome to FUZON</div>
        <div className="contentManagementSystemTitle">CONTENT MANAGEMENT SYSTEM</div>
        <div className="messageToUser">Thank you for choosing us!</div>
        <div className="messageToUserSecond">Find us for more at:</div>
        <div className="FindUsAt">
          <img className="socialIconsDashboard" src={facebook} alt="" />
          <img className="socialIconsDashboard" src={instagram} alt="" />
          <img className="socialIconsDashboard" src={whatsapp} alt="" />
          <img className="socialIconsDashboard twitter" src={twitter} alt="" />
          <img className="socialIconsDashboard" src={linkedIn} alt="" />
        </div>
      </div>
    </div>
  )
}

export default AdminDashboardPanel

import React from 'react';
import fireGif from '../../Images/fire.gif';
import fireVid from '../../Videos/Fire.mp4';

export default function HeroSection() {
    const callDialer = () => {
        let phoneNumber = '9805843762';
        let telUrl = 'tel:' + phoneNumber;
        window.location.href = telUrl;
      };
  return (
    <div className="herosection">                  
        <div className="background_for_herosection"><p className="BigIconHerosection">ALL <br/> NEPAL <br/>TRADE  <br/>CENTER</p>
            <div className="buttons_in_main">
                <button className="for-herosection b1" onClick={callDialer}>Call Now</button>
                <a href="https://goo.gl/maps/9p8YgPioT5nDoQ6b6" target="_blank" rel='noreferrer'><button className="for-herosection b2">Find Us</button></a>
            </div>
            <div className="fire-video-container">
                <video className="fire-video js-fire-video" src={fireVid}  type="video/mp4"  autoPlay loop muted playsInline
                poster={fireGif}><img src="Images/fire" alt=""/></video>
            </div>
        </div>
    </div>
                   
  )
}

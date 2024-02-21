import React from 'react';
import instagram from '../Images/instagram.png';
import facebook from '../Images/facebook.png';
import twitter from '../Images/twitter.png';
import whatsapp from '../Images/whatsapp.png';
import {Link} from 'react-router-dom';

export default function Footer() {
  return (
    <div>
        <div className="bottom_rectangle marginSelectorForProductPage marginSelectorForUserDashboard">
            <div className="forScreenGreaterThanTwelveHundredPixels">
                <div className="headings">
                    <div className="Quick_Links"><h1 className="headingsH1">Quick Links</h1>
                        <div className="Quick_Links_Body">
                            <div className="Quick_Links_List_One">
                                <li>
                                    <Link className="footerQuickLinkChild" to="/">Home</Link>
                                </li>
                                <li>
                                    <Link className="footerQuickLinkChild" to="/fireSafety">Fire Safety</Link>
                                </li>
                                <li>
                                    <Link className="footerQuickLinkChild" to="/roadSafety">Road Safety</Link>
                                </li>
                                <li>
                                    <Link className="footerQuickLinkChild" to="/marineSafety">Marine Safety</Link>
                                </li>
                                <li>
                                    <Link className="footerQuickLinkChild" to="/electricalSafety">Electrical Safety</Link>
                                </li>
                                <li>
                                    <Link className="footerQuickLinkChild" to="/surveyItems">Survey Items</Link>
                                </li>
                            </div>
                            <div className="Quick_Links_List_Two">
                                <li>
                                    <Link className="footerQuickLinkChild" to="/headProtection">Head Protection</Link>
                                </li>
                                <li>
                                    <Link className="footerQuickLinkChild" to="/bodyProtection">Body Protection</Link>
                                </li>
                                <li>
                                    <Link className="footerQuickLinkChild" to="/eyeProtection">Eye Protection</Link>
                                </li>
                                <li>
                                    <Link className="footerQuickLinkChild" to="/earProtection">Ear Protection</Link>
                                </li>
                                <li>
                                    <Link className="footerQuickLinkChild" to="/handProtection">Hand Protection</Link>
                                </li>
                                <li>
                                    <Link className="footerQuickLinkChild" to="/rescueItems">Rescue Items</Link>
                                </li>
                            </div>
                        </div>
                    </div>

                    <div className="call_to_action"> <h1 className="headingsH1">Contacts</h1><br/>
                        <a href="tel:9842574594"><button className="for-footer">Call Now</button></a>
                        <a href="mailto:nipungroupofcompanies@gmail.com"><button className="for-footer">Email Now</button></a><br/>
                        <img className="socialIconsLargeScreen" src={facebook} alt="" />
                        <img className="socialIconsLargeScreen" src={instagram} alt="" />
                        <img className="socialIconsLargeScreen" src={whatsapp} alt="" />
                        <img className="socialIconsLargeScreen" src={twitter} alt="" />
                    </div>

                    <div className="call_to_action_for_mobile"> 
                        <div className="top"><h1>Contacts</h1></div>
                        <div className="call_to_action_body">
                            <a href="tel:9842574594"><button className="for-footer">Call Now</button></a>
                            <a href="mailto:nipungroupofcompanies@gmail.com"><button className="for-footer">Email Now</button></a>
                                <div className="socialSmallScreenContainer">
                                <img className="socialIconsSmallScreen" src={facebook} alt="" />
                                <img className="socialIconsSmallScreen" src={instagram} alt="" />
                                <img className="socialIconsSmallScreen" src={whatsapp} alt="" />
                                <img className="socialIconsSmallScreen" src={twitter} alt="" />
                            </div>
                        </div>
                    </div>

                    <div className="aboutUs"><h1 className="headingsH1">About Us</h1>                    
                        <p className='aboutUsContent'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</p>
                    </div>

                    <div className="address"><h1 className="headingsH1">Address</h1>
                        <div className="address_footer">
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28268.13226164827!2d85.31520470334901!3d27.67042602455932!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19f557addc9d%3A0x957e0240a36ccc5a!2sSpatial%20Engineering%20Solution%20and%20Research%20Company%20Pvt.%20Ltd!5e0!3m2!1sen!2snp!4v1684205235887!5m2!1sen!2snp" width="300" height="200" style={{border:'0',maxWidth:'100%'}} allowFullScreen="No" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                        </div>
                        <div className="address_footer_for_mobile">
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28268.13226164827!2d85.31520470334901!3d27.67042602455932!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19f557addc9d%3A0x957e0240a36ccc5a!2sSpatial%20Engineering%20Solution%20and%20Research%20Company%20Pvt.%20Ltd!5e0!3m2!1sen!2snp!4v1684205235887!5m2!1sen!2snp" width="100%" height="200" style={{border:'0'}} allowFullScreen="No" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                        </div>
                    </div>
                </div>
            </div>
            <div className="forScreenLessThanTwelveHundredPixels">
                <div className="headings">
                    <div className="Quick_Links"><h1 className="headingsH1">Quick Links</h1>
                        <div className="Quick_Links_Body">
                            <div className="Quick_Links_List_One">
                                <li>
                                    <Link className="footerQuickLinkChild" to="/">Home</Link>
                                </li>
                                <li>
                                    <Link className="footerQuickLinkChild" to="/fireSafety">Fire Safety</Link>
                                </li>
                                <li>
                                    <Link className="footerQuickLinkChild" to="/roadSafety">Road Safety</Link>
                                </li>
                                <li>
                                    <Link className="footerQuickLinkChild" to="/marineSafety">Marine Safety</Link>
                                </li>
                                <li>
                                    <Link className="footerQuickLinkChild" to="/electricalSafety">Electrical Safety</Link>
                                </li>
                            </div>
                            <div className="Quick_Links_List_Two">
                                <li>
                                    <Link className="footerQuickLinkChild" to="/headProtection">Head Protection</Link>
                                </li>
                                <li>
                                    <Link className="footerQuickLinkChild" to="/bodyProtection">Body Protection</Link>
                                </li>
                                <li>
                                    <Link className="footerQuickLinkChild" to="/eyeProtection">Eye Protection</Link>
                                </li>
                                <li>
                                    <Link className="footerQuickLinkChild" to="/earProtection">Ear Protection</Link>
                                </li>
                                <li>
                                    <Link className="footerQuickLinkChild" to="/handProtection">Hand Protection</Link>
                                </li>
                            </div>
                        </div>
                    </div>
                    <div className="call_to_action"> <h1 className="headingsH1">Contacts</h1><br/>
                        <a href="tel:9842574594"><button className="for-footer">Call Now</button></a>
                        <a href="mailto:nipungroupofcompanies@gmail.com"><button className="for-footer">Email Now</button></a><br/>
                        <img className="socialIconsLargeScreen" src={facebook} alt="" />
                        <img className="socialIconsLargeScreen" src={instagram} alt="" />
                        <img className="socialIconsLargeScreen" src={whatsapp} alt="" />
                        <img className="socialIconsLargeScreen" src={twitter} alt="" />
                    </div>
                    <div className="call_to_action_for_mobile"> 
                        <div className="top"><h1>Contacts</h1></div>
                        <div className="call_to_action_body">
                            <a href="tel:9842574594"><button className="for-footer">Call Now</button></a>
                            <a href="mailto:nipungroupofcompanies@gmail.com"><button className="for-footer">Email Now</button></a>
                                <div className="socialSmallScreenContainer">
                                <img className="socialIconsSmallScreen" src={facebook} alt="" />
                                <img className="socialIconsSmallScreen" src={instagram} alt="" />
                                <img className="socialIconsSmallScreen" src={whatsapp} alt="" />
                                <img className="socialIconsSmallScreen" src={twitter} alt="" />
                            </div>
                        </div>
                    
                </div>
                </div>
                <div className="headings">
                <div className="aboutUs"><h1 className="headingsH1">About Us</h1>                    
                    <p className='aboutUsContent'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</p>
                </div>

                <div className="address"><h1 className="headingsH1">Address</h1>
                    <div className="address_footer">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28268.13226164827!2d85.31520470334901!3d27.67042602455932!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19f557addc9d%3A0x957e0240a36ccc5a!2sSpatial%20Engineering%20Solution%20and%20Research%20Company%20Pvt.%20Ltd!5e0!3m2!1sen!2snp!4v1684205235887!5m2!1sen!2snp" width="300" height="200" style={{border:'0',maxWidth:'100%'}} allowFullScreen="No" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                    <div className="address_footer_for_mobile">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28268.13226164827!2d85.31520470334901!3d27.67042602455932!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19f557addc9d%3A0x957e0240a36ccc5a!2sSpatial%20Engineering%20Solution%20and%20Research%20Company%20Pvt.%20Ltd!5e0!3m2!1sen!2snp!4v1684205235887!5m2!1sen!2snp" width="100%" height="200" style={{border:'0'}} allowFullScreen="No" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                </div>
            </div>  
            </div>
            <p className="copyright">Powered by Fuzon-Tech © 2004</p>  
        </div>
    </div>
)
}

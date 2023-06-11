import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../css/Footer.css'
import '../css/Style.css'
import logo from '../images/logo.jpg'
import payment from '../images/paymentt.png'
const Footer = () => {

    return (
        <footer className="footer-area">
            <div className="footer-wave-box">
                <div className="footer-wave footer-animation" />
            </div>
            <div className="main">
                <div className="footer">
                    <div className="single-footer">
                        <h4>about us</h4>
                        <p>Our shoe shop has built a strong reputation for providing high-quality and fashionable
                            footwear at competitive prices. Our customers trust us to consistently
                            deliver on our promise of excellent customer service and a wide selection of stylish shoes.</p>
                        <div className="footer-social">
                            <a href><i className="fab fa-facebook-f" /></a>
                            <a href><i className="fab fa-twitter" /></a>
                            <a href><i className="fab fa-instagram" /></a>
                            <a href><i className="fab fa-linkedin-in" /></a>
                        </div>
                    </div>
                    <div className="single-footer">
                        <h4>main menu</h4>
                        <ul>
                            <li><a href><i className="fas fa-chevron-right" /> home</a></li>
                            <li><a href><i className="fas fa-chevron-right" /> about us</a></li>
                            <li><a href><i className="fas fa-chevron-right" /> services</a></li>
                            <li><a href><i className="fas fa-chevron-right" /> gallery</a></li>
                            <li><a href><i className="fas fa-chevron-right" /> contact us</a></li>
                        </ul>
                    </div>
                    <div className="single-footer">
                        <h4>quick links</h4>
                        <ul>
                            <li><a href><i className="fas fa-chevron-right" /> privacy policy</a></li>
                            <li><a href><i className="fas fa-chevron-right" /> terms &amp; conditions</a></li>
                            <li><a href><i className="fas fa-chevron-right" /> disclaimer</a></li>
                        </ul>
                    </div>
                    <div className="single-footer">
                        <h4>contact us</h4>
                        <ul>
                            <li><a href><i className="fas fa-map-marker-alt" /> Linh Trung, Thu Duc</a></li>
                            <li><a href><i className="fas fa-mobile-alt" /> +01 234 56 789</a></li>
                            <li><a href><i className="far fa-envelope" /> 20521200@gm.uit.edu.vn</a></li>
                            <li><a href><i className="fas fa-globe-europe" /> www.demo.com</a></li>
                        </ul>
                    </div>
                </div>
                <div className="copy">
                    <p>© 2023 all rights reserved by UIT</p>
                </div>
            </div>
        </footer>
    );

}

export default Footer;
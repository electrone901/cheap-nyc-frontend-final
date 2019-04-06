/******************************************************************************
Title           : Footer.js
Description     : Footer react component.
******************************************************************************/
import 'font-awesome/css/font-awesome.min.css';
import React from 'react';
import { Link } from 'react-router-dom';
// import '../../sass/main.scss';

export default() => {
    return (
        <footer className="bg-dark text-white mt-5 p-4 text-center">

            <section className="footer">
                
                <div className="container">

                    <div className="row">
                        <div className="col-sm col-md col-lg">
                            <h5>Quick links</h5>
                            <ul className="list-unstyled quick-links">
                                <li ><Link to="/"><i className="fa fa-angle-double-right"></i>Home</Link></li>
                                <li ><Link to="/addDeal"><i className="fa fa-angle-double-right"></i>Create Post</Link></li>
                                <li ><Link to="/register"><i className="fa fa-angle-double-right"></i>Join Now</Link></li>
                                <li ><Link to="/login"><i className="fa fa-angle-double-right"></i>Log in</Link></li>
                                <li ><Link to="/"><i className="fa fa-angle-double-right"></i>FAQ</Link></li>
                            </ul>
                        </div>

                        <div className="col-sm col-md col-lg">
                            <h5>Sponsorships</h5>
                            <ul className="list-unstyled quick-links">
                                <li><a href="https://www.facebook.com/groups/YoAmoNuevaYork/" target="blank"><i className="fa fa-angle-double-right"></i>I love New York</a></li>
                                <li><a href="https://electrone901.github.io/" target="blank"><i className="fa fa-angle-double-right"></i>City Tech NY</a></li>
                                <li><a href="https://www.facebook.com/byBetoNY/" target="blank"><i className="fa fa-angle-double-right"></i>Mexican Festival Restaurant</a></li>
                                <li><a href="https://tunein.com/user/iniciadorhoyos/" target="blank"><i className="fa fa-angle-double-right"></i>Radio Iniciador</a></li>
                                <li><a href="http://www.elshowdemarcosflores.com/index.html" target="blank"><i className="fa fa-angle-double-right"></i>Taco Mix</a></li>
                            </ul>
                        </div>

                        <div className="col-sm col-md col-lg">
                            <h5>Mobile Apps</h5>
                            <ul className="list-unstyled quick-links">
                                <li><a href="https://www.facebook.com/groups/YoAmoNuevaYork/" target="blank"><i className="fa fa-angle-double-right"></i>Iphone</a></li>
                                <li><a href="https://www.facebook.com/groups/YoAmoNuevaYork/" target="blank"><i className="fa fa-angle-double-right"></i>Android</a></li>
                                <li><a href="https://www.facebook.com/groups/YoAmoNuevaYork/" target="blank"><i className="fa fa-angle-double-right"></i>Windows</a></li>
                                <li><a href="https://www.facebook.com/groups/YoAmoNuevaYork/" target="blank"><i className="fa fa-angle-double-right"></i>Get Started</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="social-section">
                            <ul className="social">
                                <li className="list-inline-item"><a href="https://www.facebook.com/groups/YoAmoNuevaYork/" target="blank"><i className="fa fa-facebook-square fa-2x"></i></a></li>
                                <li className="list-inline-item"><a href="https://www.facebook.com/groups/YoAmoNuevaYork/" target="blank"><i className="fa fa-twitter fa-2x"></i></a></li>
                                <li className="list-inline-item"><a href="https://www.facebook.com/groups/YoAmoNuevaYork/" target="blank"><i className="fa fa-instagram fa-2x"></i></a></li>
                                <li className="list-inline-item"><a href="https://www.facebook.com/groups/YoAmoNuevaYork/" target="blank"><i className="google-plus-g fa fa-google-plus fa-2x"></i></a></li>
                                <li className="list-inline-item"><a href="https://www.facebook.com/groups/YoAmoNuevaYork/" target="blank"><i className="fa fa-envelope fa-2x"></i></a></li>
                            </ul>

                    </div>	


                        <div className="">
                            <p className="footerDescription">
                                Copyright & copy;{new Date().getFullYear()} Inc. NY, U.S. © All right Reversed <a className="text-green ml-2" href="https://lazona.herokuapp.com/" target="blank">  Cheapnyc.com</a>
                            </p>
                        </div>
                        
                </div>
	        </section>
            
        </footer>
    )
}
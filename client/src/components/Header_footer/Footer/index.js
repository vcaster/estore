import React from 'react';
import FontAwesome from '@fortawesome/react-fontawesome'
import faCompass from '@fortawesome/fontawesome-free-solid/faCompass'
import faPhone from '@fortawesome/fontawesome-free-solid/faPhone'
import faEnvelope from '@fortawesome/fontawesome-free-solid/faEnvelope'
import faClock from '@fortawesome/fontawesome-free-solid/faClock'

const str = process.env.REACT_APP_STORE;
const store = str.toLowerCase();
const Footer = () => {
    return (
        <footer className="bck_b_dark">
            <div className="container">
                <div className="logo">
                    {store}
                </div>
                <div className="wrapper">
                    <div className="left">
                        <h2>Be the first to know</h2>
                        <div className="">
                            drop your email bellow
                        </div>
                    </div>
                    <div className="right">
                        <h2>Contact Information</h2>
                        <div className="business_nfo">
                            <div className="tag">
                                <FontAwesome 
                                    icon = {faCompass}
                                    className="icon"
                                />
                                <div className="nfo">
                                    <div className="">Address</div>
                                    <div className="">{store} Location</div>
                                </div>
                            </div>
                            <div className="tag">
                                <FontAwesome 
                                    icon = {faPhone}
                                    className="icon"
                                />
                                <div className="nfo">
                                    <div className="">Phone</div>
                                    <div className="">{store} Phone number</div>
                                </div>
                            </div>
                            <div className="tag">
                                <FontAwesome 
                                    icon = {faClock}
                                    className="icon"
                                />
                                <div className="nfo">
                                    <div className="">Working Hours</div>
                                    <div className="">{store} Hours</div>
                                </div>
                            </div>
                            <div className="tag">
                                <FontAwesome 
                                    icon = {faEnvelope}
                                    className="icon"
                                />
                                <div className="nfo">
                                    <div className="">Email</div>
                                    <div className="">{store} email Address</div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            
        </footer>
    );
};

export default Footer;
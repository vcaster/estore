import React, { Component } from 'react';
const store = process.env.REACT_APP_STORE;
class Header extends Component {
    render() {
        return (
            <header className="bck_b_light">
                <div className="container">
                    <div className="left">
                        <div className="logo">
                        {store}
                        </div>
                    </div>
                    <div className="right">
                        <div className="top">
                            LINKS
                        </div>
                        <div className="bottom">
                            lINKS
                        </div>
                    </div>
                </div>
                
            </header>
        );
    }
}

export default Header;
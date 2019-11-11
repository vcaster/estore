import React, { Component } from 'react';
import HomeSlider from './home_slider'
import HomePromo from './home_promo'
class Home extends Component {
    render() {
        return (
            <div>
                <HomeSlider/>
                <HomePromo/>
            </div>
        );
    }
}

export default Home;
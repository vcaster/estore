import React, { Component } from 'react';
import HomeSlider from './home_slider'
import HomePromo from './home_promo'
import CardBlock from '../utils/card_block'

import {connect} from 'react-redux'
import {getProductBySell,getProductByArrival} from '../../actions/products_action'

class Home extends Component {

    componentDidMount(){
        this.props.dispatch(getProductBySell());
        this.props.dispatch(getProductByArrival());
    }

    render() {
        return (
            <div>
                <HomeSlider/>
                <CardBlock
                list={this.props.products.bySell}
                title="Best Selling"
                />
                <HomePromo/>
                <CardBlock
                list={this.props.products.byArrival}
                title="New Arrivals"
                />
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return{
        products: state.products
    }
}

export default connect(mapStateToProps)(Home);
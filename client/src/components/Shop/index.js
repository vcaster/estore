import React, { Component } from 'react';
import PageTop from '../utils/page_top'

import {types} from '../utils/Form/fixed_catgories'

import { connect } from "react-redux";
import {getBrands, getTypes} from '../../actions/products_action'

import CollapseCheckbox from "../utils/collapseCheckbox";


class Shop extends Component {

    state = {
        grid:'',
        limit:6,
        skip:0,
        filters:{
            brands:[],
            types:[],
            price:[]
        }
    }

    componentDidMount(){
        this.props.dispatch(getBrands());
        this.props.dispatch(getTypes());
    }

    handleFilters = (filters, category) => {
        const newFilters = {...this.state.filters}
        newFilters[category] = filters;
        this.setState({
            filters:newFilters
        })
    }

    render() {
        console.log(this.state.filters)
        const products = this.props.products;
        return (
            <div>
                <PageTop
                    title="Browse Products"
                />
                <div className="container">
                    <div className="shop_wrapper">

                        <div className="left">
                            
                            <CollapseCheckbox
                                initState={true}
                                title="Brands"
                                list={products.brands}
                                handleFilters={(filters)=>this.handleFilters(filters,'brands')}

                            />

                            <CollapseCheckbox
                                initState={true}
                                title="Types"
                                list={types}
                                handleFilters={(filters)=>this.handleFilters(filters,'types')}

                            />
                        </div>
                        <div className="right">
                            Right
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.products
    }
}

export default connect(mapStateToProps)(Shop);
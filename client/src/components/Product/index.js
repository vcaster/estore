import React, { Component } from 'react';
import PageTop from '../utils/page_top'

import { connect } from 'react-redux'
import ProdNfo from './prodNfo'
import ProdImg from './prodImg'

import { getProductDetails, clearProductDetails} from '../../actions/products_action'

class index extends Component {

    componentDidMount() {
        const id = this.props.match.params.id;
        // console.log(id)
        this.props.dispatch(getProductDetails(id)).then(response=>{
            if(!this.props.products.prodDetail){
                // console.log("no product found")
                this.props.history.push('/')
            }
        });
    }
    componentWillUnmount(){
        this.props.dispatch(clearProductDetails())
    }
    
    render() {
        return (
            <div>
                <PageTop
                    title="Product detail"
                />
                <div className="container">
                    {
                        this.props.products.productDetail ?
                        <div className="product_detail_wrapper">
                            <div className="left">
                                <div className=""
                                    style={{width: '500px'}}>
                                        <ProdImg
                                            detail={this.props.products.productDetail}
                                        />
                                </div>
                            </div>
                            <div className="right">
                                <ProdNfo
                                    addToCart = {(id)=> this.addToCartHandler(id)}
                                    detail={this.props.products.productDetail}
                                />
                                {/* {console.log(this.props.products.productDetail)} */}
                            </div>
                        </div>
                        : 'Loading'
                    }
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



export default connect(mapStateToProps)(index);
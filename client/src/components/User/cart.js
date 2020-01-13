import React, { Component } from 'react';
import UserLayout from '../../hoc/user'
import UserProductBlock from '../utils/User/product_block'
import { connect } from 'react-redux'
import { getCartItems} from '../../actions/user_actions'

import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faFrown from '@fortawesome/fontawesome-free-solid/faFrown'
import faSmile from '@fortawesome/fontawesome-free-solid/faSmile'



class UserCart extends Component {

    state = {
        loading: true,
        total:0,
        showTotal: false,
        showSuccess: false,
    }

    componentDidMount(){
        let cartItem =  [];
        let user = this.props.user;

        if (user.userData.cart) {
            if (user.userData.cart.length > 0) {
                user.userData.cart.forEach(item =>{
                    cartItem.push(item.id)
                });
                this.props.dispatch(getCartItems(cartItem, user.userData.cart)).then(()=>{
                    if(this.props.user.cartDetail.length > 0){
                        this.calculateTotal(this.props.user.cartDetail);
                    }
                })

            }            
        }
    }

    calculateTotal = (cartDetail) => {
        let total =0;

        cartDetail.forEach(item =>{
            total += parseInt(item.price, 10) * item.quantity
        })
        this.setState({
            total,
            showTotal: true
        })
    }

    removeFromCart = () => {
        
    }

    showNoItem = () => (
        <div className="cart_no_items">
        <FontAwesomeIcon icon={faFrown}/>
        <div className="">
            You have no Items
        </div>
         
        </div>
    )

    render() {
        return (
            <UserLayout>
                <div>
                    <h1>My cart</h1>
                    <div className="user_cart">
                        <UserProductBlock
                            products={this.props.user}
                            type="cart"
                            removeItem={(id)=>this.removeFromCart(id)}
                        />
                        {this.state.showTotal ?

                            <div className="">
                                <div className="user_cart_sum">
                                    <div className="">
                                        Total amount: $ {this.state.total}
                                    </div>
                                </div>
                            </div>
                            
                        :
                            this.state.showSuccess ?
                                <div className="cart_success">
                                <FontAwesomeIcon icon={faSmile}/>
                                <div className="">
                                    Thank you for your purchase
                                </div>
                                    
                                </div>
                            :

                            this.showNoItem()
                        }
                    </div>


                        {
                            this.state.showTotal ?
                            <div className="paypal_button_container">
                                Paypal
                            </div>
                            :
                            null
                        }

                </div>
            </UserLayout>
            
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}


export default connect(mapStateToProps)(UserCart);
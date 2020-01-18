import React, { Component } from 'react';
import UserLayout from '../../hoc/user'
import UserProductBlock from '../utils/User/product_block'
import { connect } from 'react-redux'
import { getCartItems, removeCartItem, onSuccessBuy} from '../../actions/user_actions'

import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faFrown from '@fortawesome/fontawesome-free-solid/faFrown'
import faSmile from '@fortawesome/fontawesome-free-solid/faSmile'

import Paystack from '../utils/paystack'

class UserCart extends Component {

    state = {
        loading: true,
        total:0,
        showTotal: false,
        showSuccess: false,
    }

    componentDidMount(){
        let cartItems =  [];
        let user = this.props.user;

        if (user.userData.cart) {
            if (user.userData.cart.length > 0) {
                user.userData.cart.forEach(item =>{
                    cartItems.push(item.id)
                });
                this.props.dispatch(getCartItems(cartItems, user.userData.cart)).then(()=>{
                    if(this.props.user.cartDetail.length > 0){
                        this.calculateTotal(this.props.user.cartDetail);
                    }
                })

            }            
        }
    }

    calculateTotal = (cartDetail) => {
        let total = 0;

        cartDetail.forEach(item =>{
            total += parseInt(item.price, 10) * item.quantity
        })
        this.setState({
            total,
            showTotal: true
        })
    }

    removeFromCart = (id) => {
        this.props.dispatch(removeCartItem(id))
        .then(()=>{
            if(this.props.user.cartDetail.length <= 0){
                this.setState({
                    showTotal: false
                })
            }else {
                this.calculateTotal(this.props.user.cartDetail)
            }
        })
    }

    showNoItem = () => (
        <div className="cart_no_items">
        <FontAwesomeIcon icon={faFrown}/>
        <div className="">
            You have no Items
        </div>
         
        </div>
    )

    transactionError = () => {

    }

    transactionCancelled = () => {

    }

    transactionSuccess = (data) => {

        this.props.dispatch(onSuccessBuy({
            cartDetail: this.props.user.cartDetail,
            paymentData: data
        })).then(()=>{
            if (this.props.user.successBuy) {
                this.setState({
                    showTotal: false,
                    showSuccess: true
                })
            }
        })
        
    }

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
                                <Paystack
                                    toPay={this.state.total}
                                    email={this.props.user.userData.email}
                                    transactionError={(data)=> this.transactionError(data)}
                                    transactionCancelled={(data)=> this.transactionCancelled(data)}
                                    onSuccess={(data)=> this.transactionSuccess(data)}
                                />
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
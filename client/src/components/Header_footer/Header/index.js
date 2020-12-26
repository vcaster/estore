import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {logoutUser} from '../../../actions/user_actions'
const store = process.env.REACT_APP_STORE;
class Header extends Component {
    state = {
        page: [
            {
                name:'Home',
                linkTo:'/',
                public: true
            },
            {
                name:'Categories',
                linkTo:'/shop',
                public: true
            }
            
        ],
        user: [
            {
                name:'My Cart',
                linkTo:'/user/cart',
                public: false
            },
            {
                name:'My Account',
                linkTo:'/user/dashboard',
                public: false
            },
            {
                name:'Login',
                linkTo:'/register_login',
                public: true
            },
            {
                name:'Logout',
                linkTo:'/user/logout',
                public: false
            },

        ]
    }

    logoutHandler = () =>{
        this.props.dispatch(logoutUser()).then(response =>{
            if(response.payload.success){
                this.props.history.push('/')
            }
        })
    }

    cartLink = (item,i) =>{
        const user = this.props.user.userData;
        return (
            <div className="cart_link" key = {i}>
                <span>{user.cart ? user.cart.length:0}</span>
                <Link to={item.linkTo}>
                    {item.name}
                </Link>
            </div>
         )
    }

    defaultLink = (item,i) => (
        item.name === 'Logout' ?
            <div className="log_out_link" 
            key={i}
            onClick = {()=> this.logoutHandler()}
            >
                {item.name}
            </div>
        :

        <Link to={item.linkTo} key={i}>
            {item.name}
        </Link>

    )

    showLinks = (type) => {
        let list = [];

        if(this.props.user.userData){
            type.forEach((item)=>{
                if(!this.props.user.userData.isAuth){
                    if (item.public === true){
                        list.push(item);
                    }
                }
                else{
                    if(item.name !== 'Login'){
                        list.push(item);
                    }
                }
            });
        }

        return list.map((item,i) => {
            if(item.name !== 'My Cart'){
                return this.defaultLink(item,i)
            }else{
                return this.cartLink(item,i)
            }

            
        })
    }

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
                            {this.showLinks(this.state.user)}
                        </div>
                        <div className="bottom">
                            {this.showLinks(this.state.page)}
                        </div>
                    </div>
                </div>
                
            </header>
        );
    }
}

function mapStateToProps(state){
    return{
        user: state.user
    }
}


export default connect(mapStateToProps)(withRouter(Header));
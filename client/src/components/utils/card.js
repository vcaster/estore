import React, { Component } from 'react';
import MyButton from '../utils/button'
import { Pane, Button, Text } from 'evergreen-ui'
import {connect} from 'react-redux'
import { addToCart } from '../../actions/user_actions'

class Card extends Component {

    renderCardImage(images){
        if(images.length > 0){
            return images[0].url
        }else{
            return '/images/image_not_available.png'
        }
    }

    render() {

        const props = this.props
        return (
        <Pane clearfix>
            <Pane
            elevation={4}
            float="left"
            width={200}
            height={120}
            margin={24}
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
          >
            <Text>Elevation 4</Text>
            <Text size={300}>Dialog</Text>
          </Pane>
        </Pane>

            // <div className={`card_item_wrapper ${props.grid}`}>
            //     <div className="image"
            //         style={{
            //             background: `url(${this.renderCardImage(props.images)}) no-repeat`
            //         }}
            //     ></div>
            //     <div className="action_container">
            //         <div className="tags">
            //             <div className="brand">{props.brand.name}</div>
            //             <div className="name">{props.name}</div>
            //             <div className="name">${props.price}</div>
                    
            //     </div>
            //     { props.grid ? 

            //         <div className="description">
            //             <p>
            //             {props.description}
            //             </p>
            //         </div>


            //         :null
            //     }
            //     <div className="actions">
            //         <div className="button_wrapp">
            //             <MyButton
            //                 type="default"
            //                 altClass="card_link"
            //                 title="View Product"
            //                 linkTo={`/product_detail/${props._id}`}
 
            //                 addStyles={{
            //                     margin: "10px 0 0 0"
            //                 }}
            //             />
            //         </div>
            //         <div className="button_wrapp">
            //             <MyButton
            //                 type="bag_link"
            //                 runAction= {() =>{
            //                         this.props.user.userData.isAuth ?
            //                         this.props.dispatch(addToCart(props._id))
            //                     :
            //                         console.log("please login")
            //                 }}
            //             />
            //         </div>
            //     </div>
            //     </div>
            // </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}


export default connect(mapStateToProps)(Card);
import React from 'react';
import MyButton from '../utils/button'

const homePromo = (props) => {

    const promo = {
        img:'/images/featured/featured_home_3.jpg',
        lineOne:'Up to X% off',
        lineTwo:'In X product',
        linkTitle:'Shop now',
        linkTo:'/shop'
    }

    const renderPromotion = () => (
        promo ?
        <div className="home_promotion_img"
            style={{
                background:`url(${promo.img})`
            }}
        >
            <div className="tag title">{promo.lineOne}</div>
                <div className="tag low_title">{promo.lineTwo}</div>
                <div className="">
                    <MyButton
                        type="default"
                        title={promo.linkTitle}
                        linkTo={promo.linkTo}
                        addStyles={{
                            margin: '10px 0 0 0'
                        }}>
                            
                        </MyButton>
                </div>
        </div>
        :null
    )

    return (
        <div className="home_promotion">
            {renderPromotion()}
        </div>
    );
};

export default homePromo;
import React from 'react';
import Slider from 'react-slick'; 
import MyButton from '../utils/button'

const homeSlider = (props) => {

    const slides = [
        {
            img:'/images/featured/featured_home.jpg',
            lineOne:'Promo 1',
            lineTwo:'Custom promo',
            linkTitle:'Shop now',
            linkTo:'/shop'
        },
        {
            img:'/images/featured/featured_home_2.jpg',
            lineOne:'Promo 1',
            lineTwo:'Custom promo',
            linkTitle:'Shop now',
            linkTo:'/shop'
        }
    ]

    const settings = {
        dots: false,
        infinite:true,
        speed:500,
        autoplay:true,
        slidesToShow: 1,
      slidesToScroll: 1,
      initialSlide: 0,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            dots: false
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            initialSlide: 1
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        },
        {
            breakpoint: 0,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
      ],
        arrows:false
    }

    const generateSlides = () => (
        slides ?
            slides.map((item,i) =>(
                <div className="" key={i}>
                    <div className="featured_image"
                        style={{
                            background:`url(${item.img})`,
                            height:`${window.innerHeight}px`
                        }}
                    >
                        <div className="featured_action">
                            <div className="tag title">{item.lineOne}</div>
                            <div className="tag low_title">{item.lineTwo}</div>
                            <div className="">
                                <MyButton
                                    type="default"
                                    title={item.linkTitle}
                                    linkTo={item.linkTo}
                                    addStyles={{
                                        margin: '10px 0 0 0'
                                    }}>
                                        
                                    </MyButton>
                            </div>
                        </div>

                    </div>
                </div>
            ))
        :null
    )


    return (
        <div className="featured_container">
            <Slider {...settings}>
                { generateSlides()}
            </Slider>
            
        </div>
    );
};

export default homeSlider;
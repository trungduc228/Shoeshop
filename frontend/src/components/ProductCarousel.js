import React, { Component } from "react";
import Slider from "react-slick";
import slide1 from '../images/HomeScreen/slider-bannar1.jpg' 
import slide2 from '../images/HomeScreen/slider-bannar2.jpg' 
export default class Fade extends Component {
    render() {
        const settings = {
            dots: true,
            fade: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true
        };
        return (
                 <div>
                <Slider {...settings}>
                    <div>
                        <img className="slider-img" src={slide1} />
                    </div>
                    <div>
                        <img src={slide2} />
                    </div>
                </Slider>
            </div>       
        );
    }
}
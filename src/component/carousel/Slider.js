/******************************************************************************
Title           : Slider.js
Description     : React component that contains all components for the carousel
******************************************************************************/
import React, { Component } from 'react';
import Slide from './Slide';
import RightArrow from './RightArrow';
import LeftArrow from './LeftArrow';
import TextSlider from './TextSlider';

export default class Slider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [
                "images/b2.jpg",
                "images/bestDeals.jpg",
                "images/under_1.jpg",
                "images/b4.jpg",
                "images/over_50.jpg",
                "images/under_15.jpg",
                "images/under_20.jpg",
                "images/b1.jpg", 
                "images/b3.jpg",
                "images/b6.jpg",
            ],
            currentIndex: 0,
            translateValue: 0,
            autoplay: true
        }
    }

    componentDidMount = () => {
        if(this.state.autoplay) {
        const interval = window.setInterval(() => {
                  this.goToNextSlide()
                }, 3000)
        this.setState({ interval })
      }
    }


    goToPrevSlide = () => {
        if(this.state.currentIndex === 0) 
            return;
        
        this.setState( prevState => ({
            currentIndex: prevState.currentIndex-1,
            translateValue: prevState.translateValue + this.slideWidth()
        }));
    }

    goToNextSlide = () => {
        // Exiting the method early if we are at the end
        // We also want to reset currentIndex & translateValue so we return the first image
        if(this.state.currentIndex === this.state.images.length-1) {
            return this.setState({
                currentIndex: 0,
                translateValue: 0
            })
        }

        this.setState(prevState => ({
            currentIndex: prevState.currentIndex + 1,
            translateValue: prevState.translateValue + -(this.slideWidth())
        }))   
    }

    // calculate the with of current slide and returns it so that translateValue can setState for the next image 
    slideWidth = () => {
        return document.querySelector('.slide').clientWidth
    }

    render() {
        return (
            <div className="slider">

                <div className="slider-wrapper"
                style={{
                    transform: `translateX(${this.state.translateValue}px)`,
                    transition: 'transform ease-out 0.45s',
                    animationDelay: '0.45s'
                }}> 
                    {
                        this.state.images.map((image, i) => (
                            <Slide key={i} image={image} />
                        ))
                    }   
                </div>
                <LeftArrow goToPrevSlide={this.goToPrevSlide} />
                < TextSlider />
                <RightArrow goToNextSlide={this.goToNextSlide} />
            </div>
        )
    }
}

import React, {Component} from 'react';
import Slider from '../carousel/Slider';

class howItWorks extends Component{
  render(){
      
      return(
          <div>
            <Slider />
            <div className="container space-top">
                <div className="jumbotron">
                    <div className="tiptop">
                        <h1 className="display-4">Our Mission</h1>
                        <p className="lead">Whether you’re traveling or living in NYC, our mission is to provide the best deals based on price. Our aim is to build a community of people who want to find more accessible prices and new ways to save money while doing what they love. </p>
                    </div>
                    <h3 className="how-works-title space-top">About Us</h3>
                    <p>
                        CheapNy provides the best deals based on price and value. Do New York like a local: do more with less.

                        Everyday, we continue to expand our deals to find more ways for you to save 
                        money doing the things you love.

                        CheapNy collects and displays deals into a simple, understandable format 
                        making it the one-stop shop for all New Yorkers, new and old. Contact us to <a className="btn btn-primary btn-width" href="mailto:realcheapny@gmail.com?Subject=Feedback-Suggestions" target="_top">realcheapny@gmail.com</a>
                    </p>
                    {/* <p>CheapNy aggregates many deals into a simple, understandable format, this is the one stop shop for locals and tourist in NYC to find more reasonably priced ways to have fun. Everyday, we continue to grow our outreach throughout the city, and continue to find more ways for you to save money doing the things you love. Your feedback is crucial, and we would love to hear from you. Contact us to <a className="btn btn-primary" href="mailto:realcheapny@gmail.com?Subject=Feedback-Suggestions" target="_top">realcheapny@gmail.com</a></p> */}
                    
                    <br/>
                    <h3 className="how-works-title">How do we ensure deals are always up to date?</h3>
                        <li>We rely on our team of fantastic trouble shooters who can solve problems and make sure our service is as seamless and timely as possible.</li>
                        <li>We rely on people like you who write a review or report a post (when a post is reported several times it automatically gets erased)</li>
                        <li>Every post has an expiration date that helps to remove the post when it's not longer available </li>
                        <li>CheapNy provides a platform where deals are posted everyday therefore it’s hard to ensure every deal is valid, we recommend you contact the provider in advance.</li>
                </div>


                <div className="jumbotron">
                <h3 className="how-works-title">How It Works</h3>
                <ul className="list-group">
                            <li className="list-group-item">*All deals must be under $30.</li>
                            <li className="list-group-item">Reported posts are removed.</li>
                            <li className="list-group-item">Posts have an expiration date. </li>
                            <li className="list-group-item">More than one post is allowed for a business.</li>
                            <li className="list-group-item">Sharing is caring. Please share your NYC tips & hacks, your favorite restaurants, places, activities, events, etcetera under $30.</li>
                            <li className="list-group-item">Make new friends and help each other discover new things within the city. </li>
                            <li className="list-group-item">Leave a comment, comments help other members make informed decisions.</li>
                            <li className="list-group-item">Leave truthful references  that describe your experience most accurately.</li>
                            <li className="list-group-item">Like posts you have try or you want to.</li>
                            <li className="list-group-item">Report duplicate posts, inaccurately, and scams that are not within a reasonable price. </li>
                        </ul>
                </div>

                <ul className="how-works-list-parent">
                    <li className="">
                        <h3 className="how-works-title">In the Future</h3>
                        <p>We are constantly finding new deals and places. Right now we want to exhaust ourselves with places with online presences, but then we will continue to target every other method there is. Ultimately would love to have businesses sign up with their own profile and control some of their postings, and allow them to post flash deals in a tweet format.</p>
                    </li>
                    <li className="">
                        <h3 className="how-works-title">Disclaimer</h3>
                        <p>Limitation of liability clauses are common in end-user license agreements so that users are aware that they will not be able to hold the company liable for any damages arising out of the use of the application.</p>
                    </li>
                    <li className="">
                        <h3 className="how-works-title">Credits</h3>
                        <p>“Images Google Copyright.” </p>
                    </li>
                </ul>
                </div>
          </div>
      );
  }
}
export default (howItWorks);
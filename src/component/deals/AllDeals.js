import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../common/Spinner';
import noAvailable from '../../img/noAvailable.png';

class AllDeals extends Component {
    render() {
        // console.log(' AllDeals props',this.props)
      return  <div className="row">
        {
            this.props.data ? this.props.data.map((item, key) => {
                return (
                    // <div className="col-lg-3 col-md-3 col-sm-6 text-center" id="dealPadding" key={key}>
                    //     <div className="border">
                    //         <h5>{item.name}  ${item.price} </h5> 
                    //         <figure className="figure">
                    //             <Link to={`/deal/${item._id}`}>
                    //                 <img src={item.image ? item.image : noAvailable} className="figure-img img-fluid rounded" alt="deal"/>
                    //             </Link>
                    //             <div className="container2">
                    //                 <figcaption className="figure-caption container2-item">Location: {item.city ? item.city : "None"}</figcaption>
                    //                 <Link to={`/deal/${item._id}`} className="container2-item-btn">
                    //                     Details
                    //                 </Link>
                    //             </div>
                    //         </figure>
                    //     </div>
                    // </div> 
                    
                    // <div className="col-lg-3 col-md-3 col-sm-6 text-center" id="dealPadding" key={key}>
                    //     <div className="border">
                    //         <h5>{item.name}  ${item.price} </h5> 
                    //         <figure className="figure">
                    //             <Link to={`/deal/${item._id}`}>
                    //                 <img src={item.image ? item.image : noAvailable} className="figure-img img-fluid rounded" alt="deal"/>
                    //             </Link>
                    //             <div className="container2">
                    //                 <figcaption className="figure-caption container2-item">Location: {item.city ? item.city : "None"}</figcaption>
                    //                 <Link to={`/deal/${item._id}`} className="container2-item-btn">
                    //                     Details
                    //                 </Link>
                    //             </div>
                    //         </figure>
                    //     </div>
                    // </div> 
                 


                    <div className="col-lg-3 col-md-3 col-sm-6 text-center" id="dealPadding" key={key}>
                        <div class="flex flex--column card groupCard groupDeals">
                            <div class="flex-item flex-item--shrink"
                                aria-label="Awesome Events" role="img">
                                <Link to={`/deal/${item._id}`}>
                                    <img src={item.image ? item.image : noAvailable} className="figure-img img-fluid rounded" alt="deal"/>
                                </Link>
                            </div>
                            <div className="space-all">
                            <p className="text--sectionTitle">{item.name}  ${item.price} </p>
                                <div class="container2">
                                    <figcaption class="figure-caption container2-item"><i class="far fa-thumbs-up"></i> {item.likes.length} Likes</figcaption>
                                    <Link to={`/deal/${item._id}`} className="btn btn-primary btn-details">
                                        Details
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            }): <Spinner />
        }
      </div>
    }
}
export default AllDeals;

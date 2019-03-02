import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../common/Spinner';

class AllDeals extends Component {
    render() {
      return  <div className="row">
        {
            this.props.data ? this.props.data.map((item, key) => {
                return (
                    <div className="col-lg-3 col-12 text-center" key={key}>
                        <div className="border">
                            <h5>{item.name}  ${item.price} </h5> 
                            <figure className="figure">
                                <img src={item.image ? item.image : 'https://d2lm6fxwu08ot6.cloudfront.net/img-thumbs/960w/90V03Q5Y60.jpg'} className="figure-img img-fluid rounded" alt="deal"/>
                                <div className="container2">
                                    <figcaption className="figure-caption container2-item">Location: {item.city ? item.city : "None"}</figcaption>
                                    <Link to={`/deal/${item._id}`} className="container2-item-btn">
                                        Details
                                    </Link>
                                </div>
                            </figure>
                        </div>
                    </div> 
                );
            }): <Spinner />
        }
      </div>
    }
}
export default AllDeals;

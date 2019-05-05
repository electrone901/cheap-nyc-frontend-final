import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../common/Spinner';
import noAvailable from '../../img/noAvailable.png';

class AllDeals extends Component {
    render() {
        console.log('DDATA',this.props.data)
      return  <div className="row">
        {
            this.props.data ? this.props.data.map((item, key) => {
                return (
                    <div className="col-lg-3 col-md-3 col-sm-6 text-center space-down" id="dealPadding" key={key}>
                        <div className="flex flex--column card groupCard groupDeals">
                            <div className="flex-item flex-item--shrink"
                                aria-label="Awesome Events" role="img">
                                <Link to={`/deal/${item._id}`}>
                                    <img src={item.image ? item.image : noAvailable} className="figure-img img-fluid rounded" alt="deal"/>
                                </Link>
                            </div>
                            <div className="space-all">
                            <p className="text--sectionTitle">{item.name}  ${item.price} </p>
                                <div className="container2">
                                    <figcaption className="figure-caption container2-item"><i className="far fa-thumbs-up"></i> {item.likes.length} Likes</figcaption>
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

import React from 'react';

const FilterButtons = ({ showResetBtn, selectValue, value, findDeals, getAllDeals, handleChangeCategory, handleChangeCity, handleChangePrice }) => {
    return(
        <div className="filterbutton">
            <div className="dropdown col-lg-3 col-md-3 col-sm">
            {
                showResetBtn ? 
                <button className="btn btn-primary mb-2 ml-4 px-5" onClick={getAllDeals}>Reset All</button>: null
            }
            </div>
            <div className="row text-center">
                <div className="dropdown col-lg-3 col-md-3 col-sm">
                    <select
                    value={selectValue}
                    onChange={handleChangeCategory}
                    className="btn btn-light dropdown-toggle btn-width btn-height"
                    >
                    <option value="">All categories</option>
                    <option value="Food">Food</option>
                    <option value="Drinks">Drinks</option>
                    <option value="Activities">Activities</option>
                    <option value="Events">Events</option>
                    <option value="Arts">Arts</option>
                    <option value="Sports">Sports</option>
                    <option value="Outdoor">Outdoor</option>
                    <option value="Indoor">Indoor</option>
                    <option value="Music">Music</option>
                    <option value="Classes">Classes</option>
                    <option value="Travel">Travel</option>
                    <option value="Social">Social</option>
                    <option value="Others">Others</option>
                    </select>
                </div>

                <div className="dropdown col-lg-3 col-md-3 col-sm">
                    <select
                    value={selectValue}
                    onChange={handleChangeCity}
                    className="btn btn-light dropdown-toggle btn-width btn-height"
                    > 
                    <option value="">All Cities</option>
                    <option value="Manhattan">Manhattan</option>
                    <option value="Queens">Queens</option>
                    <option value="Bronx">Bronx</option>
                    <option value="Brooklyn">Brooklyn</option>
                    <option value="Staten Island">Staten Island</option>
                    </select>
                </div>

                <div className="dropdown col-lg-3 col-md-3 col-sm">
                    <select
                    value={value}
                    onChange={handleChangePrice}
                    className="btn btn-light dropdown-toggle btn-width btn-height"
                    >
                    <option value="-1&-1">All Prices</option>
                    <option value="0&0">Free</option>
                    <option value="0&1">Under $1</option>
                    <option value="1&5">$1 to $5</option>
                    <option value="5&10">$5 to $10</option>
                    <option value="10&20">$10 to $20</option>
                    <option value="20&30">$20 to $30</option>
                    </select>
                </div>

                <div className="dropdown col-lg-3 col-md-3 col-sm">
                    <button className="btn btn-primary btn-width" onClick={findDeals}>Find Deals</button>
                </div>
            </div>
        </div>
    );
};

export default FilterButtons;
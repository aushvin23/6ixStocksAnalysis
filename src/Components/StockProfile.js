import React, { Component } from 'react';

//StockProfile Component
class StockProfile extends Component {

    render() {
        return (
            <div>
                <div className="profile">
                    <h2>{this.props.stockProfile.companyName}</h2>
                    <div className="profileInfo">

                        <div className="exchange">
                            <p>Exchange:</p>
                            <p>{this.props.stockProfile.exchange}</p>
                        </div>

                        <div className="industry">
                            <p>Industry:</p>
                            <p>{this.props.stockProfile.industry}</p>
                        </div>

                        <div className="ceo">
                            <p>CEO:</p>
                            <p>{this.props.stockProfile.ceo}</p>
                        </div>

                        <p className="stockDescription">Description</p>
                        <p className="stockDescriptionInfo">{this.props.stockProfile.description}</p>

                        <div className="website">
                            <p>Website: </p>
                            <p>{this.props.stockProfile.website}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default StockProfile;
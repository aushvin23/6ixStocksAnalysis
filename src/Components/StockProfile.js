import React, { Component } from 'react';

//StockProfile Component
class StockProfile extends Component {

    render() {
        return (
            <div>
                <div className="profile">
                    <div className="profileInfo">

                        <div className="exchange">
                            <p><strong>  Exchange:</strong> {this.props.stockProfile.exchange}</p>
                        </div>

                        <div className="industry">
                            <p><strong>  Industry: </strong>{this.props.stockProfile.industry}</p>
                        </div>

                        <div className="ceo">
                            <p><strong>  CEO: </strong>{this.props.stockProfile.ceo}</p>
                        </div>

                        <p className="stockDescription"><strong>  Description: </strong></p>
                        <p className="stockDescriptionInfo">  {this.props.stockProfile.description}</p>

                        <div className="website">
                            <p><strong>  Website: </strong>{this.props.stockProfile.website}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default StockProfile;
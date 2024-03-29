import React from "react";
import { Col, Row } from 'react-materialize';
import StarRatings from 'react-star-ratings';
import BeforeCheckout from "./BeforeCheckout";
import AfterCheckout from "./AfterCheckout";

export default class CheckoutDetails extends React.Component {

    doCheckout = () => {
        this.props.checkOut()
    }

    rateAfterCheckout = (transactionId, rating) => {
        this.props.addRating(transactionId, rating);
    };

    parseDate = (date) => {
        if (date === null) {
            return null;
        } else {
            const dateOptions = {

                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric'
            };
            return new Date(date).toLocaleDateString('en-US', dateOptions);
        }
    };

    render() {
        const {parkingLot, transactionOrder} = this.props.checkoutDetails;
        if (parkingLot != null && transactionOrder != null) {
            return (
                <div>
                    <Row style={{margin: '0'}} className="white-text">
                        <Col s={6} style={{ padding: '15px' }}>
                            <span>
                                {parkingLot.name}
                            </span>
                        </Col>
                        <Col s={6} style={{ padding: '15px' }}>
                            <StarRatings
                                rating={parkingLot.starRating}
                                starRatedColor="orange"
                                numberOfStars={5}
                                starDimension="12px"
                                starSpacing="0.5px"
                                name='rating'>
                            </StarRatings>
                        </Col>
                    </Row>
                    
                    {
                        this.props.checkoutDetails.transactionOrder.checkOut !== null ?
                            <AfterCheckout onRate={this.rateAfterCheckout}
                                           checkoutDetails={this.props.checkoutDetails}
                                            parseDate = {this.parseDate}
                            /> :
                            <BeforeCheckout
                                checkoutDetails={this.props.checkoutDetails}
                                checkOut={this.doCheckout}
                                parseDate = {this.parseDate}
                            />
                    }

                </div>
            )
        } else {
            return <div/>
        }
    }
}
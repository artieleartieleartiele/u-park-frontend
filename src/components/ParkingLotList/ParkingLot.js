import React, {Component} from 'react';
import {Row, Col} from 'react-materialize';
import StarRatings from 'react-star-ratings';

export default class ParkingLot extends Component {
    render() {
        const {parkingLot} = this.props;
        return (
            <div>
                <Row>
                    <Col style={{float: 'left', textAlign: 'left'}}>
                        {parkingLot.name}
                        <br/>
                        <span style={{fontSize: '11px'}}>{parseFloat(parkingLot.distance).toFixed(2)} km</span>
                    </Col>
                    <Col style={{float: 'right', fontSize: '11px'}}>
                        ₱{parkingLot.rate}/hr
                    </Col>
                    <br/>
                    <Col style={{float: 'right', fontSize: '11px'}}>
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
            </div>
        )
    }
};
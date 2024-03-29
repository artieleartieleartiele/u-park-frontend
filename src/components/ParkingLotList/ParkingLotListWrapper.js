import React, {Component} from 'react'
import ParkingLotList from './ParkingLotList'
import ParkingLotListInput from './ParkingLotListInput'
import gpsNotAvailable from '../../gpsNotAvailable.png'
import LocationResource from '../../api/LocationResource';
import FakeAuth from "../../FakeAuth";

export class ParkingLotListWrapper extends Component {

    state = {
        isGeolocationAvailable: false,
        userInfo: ''
    };

    componentDidMount() {
        let userInformation = FakeAuth.isAuthenticated();
        if (!userInformation) {
            window.location.href = '/';
        }
        this.setState({userInfo: userInformation.id});
        this.props.resetFilterCriteria();
        this.checkNavigator();
    }

    checkNavigator = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.setGeoLocation);
        }
    };

    setGeoLocation = (position) => {
        this.setState({isGeolocationAvailable: true});
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        this.props.getNearestParkingLotsFromLocation(latitude, longitude);
        this.props.filterParkingLotsByCriteria(this.props.criteria);
    };

    setFilter = (filter) => {
        if (filter === 'Price') {
            this.props.filterParkingLotsByCriteria('Price');
        } else if (filter === 'Rating') {
            this.props.filterParkingLotsByCriteria('Rating');
        } else {
            this.props.filterParkingLotsByCriteria('Default');
        }
    };

    setSelectedParkingLot = (parkingLotId) => {
        this.props.setSelectedParkingLot(parkingLotId, this.state.userInfo);
    };

    setManualLocation = (manualLocationName) => {
        if (manualLocationName === undefined || manualLocationName === '') {
            this.checkNavigator();
        } else {
            LocationResource.findByName(manualLocationName)
                .then(res => res.json())
                .then(res => {
                    const latitude = res.latitude;
                    const longitude = res.longitude;
                    this.props.getNearestParkingLotsFromLocation(latitude, longitude);
                    this.props.filterParkingLotsByCriteria(this.props.criteria);
                });
        }
    };

    render() {
        if (!this.state.isGeolocationAvailable) {
            return (
                <div>
                    <img src={gpsNotAvailable} style={{marginTop: '2rem'}} alt='altText'/>
                    <br/>
                    <p>
                        PLEASE TURN ON YOUR GPS
                    </p>
                </div>

            )
        }

        return (
            <div style={{display: 'flex', minHeight: '92vh', flexDirection: 'column'}}>
                <ParkingLotListInput onSetFilter={this.setFilter} onSetManualLocation={this.setManualLocation}/>
                <ParkingLotList parkingLotList={this.props.parkingLots}
                                selectedParkingLot={this.setSelectedParkingLot}/>
            </div>
        )
    }
}

export default ParkingLotListWrapper;
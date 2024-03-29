import React, {Component} from 'react'
import {Select, Col, Row, Autocomplete, Badge} from 'react-materialize';
import logo from "../../logo.png";
import LocationResource from '../../api/LocationResource';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import './ParkingLotList.css';

export default class ParkingLotListInput extends Component {

    state = {
        sortCriteria: 'Default',
        locations: null,
        manualSearch: '',
        inputStyle: 'parking-lot-input-default'
    };

    componentDidMount() {
        this.getLocations();
    }

    handleInputChange = (event) => {
        this.setState({sortCriteria: event.target.value});
        this.setState({inputStyle: 'parking-lot-input-active'})
        this.props.onSetFilter(event.target.value);
    };

    onChangeManualLocation = (chosenLocation) => {
        this.props.onSetManualLocation(chosenLocation);
        this.setState({manualSearch: chosenLocation})
    };

    getLocations = () => {
        LocationResource.getAll()
            .then(res => res.json())
            .then(res => {
                const mapped = res.map(item => ({[item.name]: null}));
                const newObj = Object.assign({}, ...mapped);
                this.setState({locations: newObj})
            });
    };

    clearInput = (event) => {
        if (event.target.value === '') {
            this.props.onSetManualLocation('');
            this.setState({manualSearch: ''})
        }
    };

    onClickProfile = () => {
        window.location.href = '/profile'
    };

    render() {
        if (!this.state.locations) {
            return <div/>
        }
        return (
            <div className={this.state.inputStyle} style={{marginLeft: '15px', marginRight: '15px', marginTop: '20px'}}>
                <br/>
                <Row>
                    <Col style={{float: 'left'}}>
                        <img style={{width: '100px'}}
                             src={logo} alt='logo'/>
                    </Col>
                    <Col style={{float: 'right'}}>
                        <AccountCircleIcon onClick={this.onClickProfile} style={{fontSize: '5rem', color: 'grey'}}/>
                    </Col>
                </Row>
                <Autocomplete options={{data: this.state.locations, onAutocomplete: this.onChangeManualLocation}}
                              placeholder="Choose your location" onChange={this.clearInput}/>
                <Select value={this.state.sortCriteria} onChange={this.handleInputChange}>
                    <option value="Default" disabled>
                        Sort by...
                    </option>
                    <option value="Distance">
                        Distance
                    </option>
                    <option value="Price">
                        Price
                    </option>
                    <option value="Rating">
                        Rating
                    </option>
                </Select>
                {!this.state.manualSearch ? null :
                    <div>
                        <Badge style={{fontWeight: 'bold', fontSize: '12px'}} className="teal" caption="" newIcon>
                            Near - {this.state.manualSearch}
                        </Badge>
                    </div>
                }
            </div>
        )
    }
}

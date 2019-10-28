import React from 'react';
import RegisterContainer from './containers/RegisterContainer';
import LogInContainer from './containers/LogInContainer'
import './App.css'
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom"
import ParkingLotListContainer from './containers/ParkingLotListContainer';
import Notification from './components/Notification/Notification';

export default class App extends React.Component {
    render() {
        return (
            <div className="App">
                <Router>
                    <Switch>
                        <Route exact path="/">
                            <LogInContainer/>
                        </Route>

                        <Route path="/register">
                            <RegisterContainer/>
                        </Route>

                        <Route path="/parkinglotlist">
                            <ParkingLotListContainer/>
                        </Route>

                        <Route path="/notification">
                            <Notification/>
                        </Route>
                    </Switch>
                </Router>
            </div>
        );
    }
}

import React from "react";
import { Row, Col, Card, CardTitle } from 'react-materialize';
import logo from "../../logo.png";
import CheckoutDetails from "./CheckoutDetails";


export default class Checkout extends React.Component {

    render() {
        return(
            <div>
                <Row>
                    <Col s={12}>
                        <Card
                            header={<CardTitle />}
                            actions={<CheckoutDetails checkoutDetails={this.props.checkOut} />}
                        >
                            <img src={logo} alt="logo"/>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}
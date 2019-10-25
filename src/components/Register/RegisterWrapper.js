import React, { Component } from 'react'
import logo from '../../logo.jpg'
import { Button, TextInput, Checkbox, Icon, Modal } from 'react-materialize';

export class RegisterWrapper extends Component {

    state = {
        email: '',
        phoneNumber: '',
        name: '',
        password: '',
        confirmPassword: '',
        conditionAgreement: false
    }

    componentDidMount() {
        this.props.getAllUsers()
    }
    

    onSubmit = (e) => {
        e.preventDefault()

        if (this.isInputValid()) {
            let newUser = {
                email: this.state.email,
                phoneNumber: this.state.phoneNumber,
                name: this.state.name,
                password: this.state.password,
                confirmPassword: this.state.confirmPassword
            }
            
            this.props.createUser(newUser)
        }
    }

    isInputValid() {
        if (!this.state.conditionAgreement) {
            alert('Please check the box to agree in terms and conditions')
            return false
        }
        if (!new RegExp(".+@.+\\..+").test(this.state.email)) {
            alert('Invalid Email')
            return false
        }

        if (!new RegExp("[0-9]{11}").test(this.state.phoneNumber)) {
            alert('Invalid Number, must be 11-digit number')
            return false
        }

        if (!new RegExp("[a-zA-Z0-9]{5}").test(this.state.name)) {
            alert('Invalid Name, must contain at least 5 characters')
            return false
        }

        if (!new RegExp("[a-zA-Z0-9]{3}").test(this.state.password)) {
            alert('Invalid Name, must contain at least 3 characters')
            return false
        }

        if (this.state.password != this.state.confirmPassword) {
            alert('Passwords do not match')
            return false
        }
        
        const isExist = this.props.users.some(user =>  
            user.email === this.state.email || user.phoneNumber === this.state.phoneNumber
        )

        if (isExist) {
            console.log('asdasd')
            alert('Email or phone number already exist')
            return false
        }
    }

    onChangeEmail = (e) => {
        this.setState({email: e.target.value})
    }
    onChangePhoneNumber = (e) => {
        this.setState({phoneNumber: e.target.value})
    }
    onChangeName = (e) => {
        this.setState({name: e.target.value})
    }
    onChangePassword = (e) => {
        this.setState({password: e.target.value})
    }
    onChangeConfirmPassword = (e) => {
        this.setState({confirmPassword: e.target.value})    
    }

    onChangeConditionAgreement = (e) => {
        this.setState({conditionAgreement: !this.state.conditionAgreement})
        console.log(this.state.conditionAgreement);
    }

    render() {
        return (
            <div className="register-wrapper">
                {/* <h1>uPark</h1> */}
                <img style = {{height: '200px', width: '90%'}} src={logo} />
                <form onSubmit = {this.onSubmit} style={{marginLeft: '2rem', marginRight: '2rem'}}>
                    <TextInput onChange = {this.onChangeEmail} placeholder = "Email"/>
                    <TextInput onChange = {this.onChangePhoneNumber} placeholder = "Phone Number"/>
                    <TextInput onChange = {this.onChangeName} placeholder = "Name"/>
                    <TextInput type = "password" onChange = {this.onChangePassword} placeholder = "Password" style = {{ marginTop: '2rem' }}/>
                    <TextInput type = "password" onChange = {this.onChangeConfirmPassword} placeholder = "Confirm Password"/>
                    <Checkbox onChange = {this.onChangeConditionAgreement} value="agree" label="I agree to Terms and Conditions"/>
                    <Button type = "submit" waves="light" style={{marginRight: '5px', marginTop: '2rem', width: '100%'}}>
                        Submit
                        <Icon left></Icon>
                    </Button>


                    <Modal header="Modal Header">
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
                        </p>
                    </Modal>
                </form>
            </div>
        )
    }
}

export default RegisterWrapper

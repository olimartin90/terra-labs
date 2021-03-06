import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Modal, Col, Form, FormGroup, FormControl, ControlLabel, Checkbox, Button } from 'react-bootstrap';

const axios = require('axios');

class Login extends Component {

  constructor(props) {
    super(props);

    this.handleLogin = this.handleLogin.bind(this);
    this.handleRegister = this.handleRegister.bind(this);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      toDashboard: false,
      show: false
    };
  }

  handleLogin(e) {
    e.preventDefault();
    const email = this.login_email.value
    const password = this.login_password.value
    axios.post('/api/v1/authentication', {
      user: {
        email: email,
        password: password
      }
    })
      .then(response => {
        this.setState({
          toDashboard: true
        })
        this.props.updateCurrentUser(
          response.data.user.email,
          response.data.user.id,
          response.data.user.company_name,
          response.data.user.latitude,
          response.data.user.longitude
        );
        console.log(response.data.user, "usseerrr")
        localStorage.setItem("auth_token", response.data.auth_token);
        localStorage.setItem("email", response.data.user.email);
        localStorage.setItem("user_id", response.data.user.id);
        localStorage.setItem("company_name", response.data.user.company_name);
        localStorage.setItem("latitude", response.data.user.latitude);
        localStorage.setItem("longitude", response.data.user.longitude);
      })
      .catch(error => {
        console.log(error)
      })
  }

  handleRegister(e) {
    e.preventDefault();
    const first_name = this.first_name.value
    const last_name = this.last_name.value
    const email = this.register_email.value
    const password = this.register_password.value
    const password_confirmation = this.password_confirmation.value
    const phone = this.phone.value
    const company_name = this.company_name.value
    const latitude = this.latitude.value
    const longitude = this.longitude.value
    axios.post('/api/v1/users', {
      user: {
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: password,
        password_confirmation: password_confirmation,
        phone: phone,
        company_name: company_name,
        latitude: latitude,
        longitude: longitude
      }
    })
      .then(response => {
        this.props.updateCurrentUser(
          response.data.user.email,
          response.data.user.id,
          response.data.user.company_name,
          response.data.user.latitude,
          response.data.user.longitude
        );
        this.handleClose();
      })
      .catch(error => {
        console.log(error)
      })
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  render() {
    if (this.state.toDashboard === true) {
      return <Redirect to='/dashboard' />
    }
    return (
      <div>
        <Form horizontal className="form-horizontal">
          <FormGroup controlId="formHorizontalEmail">
            <Col componentClass={ControlLabel} sm={1}>
            </Col>
            <Col sm={10}>
              <FormControl inputRef={(ref) => { this.login_email = ref }} name="email" type="email" placeholder="Email" />
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalPassword">
            <Col componentClass={ControlLabel} sm={1}>
            </Col>
            <Col sm={10}>
              <FormControl inputRef={(ref) => { this.login_password = ref }} name="password" type="password" placeholder="Password" />
            </Col>
          </FormGroup>

          <FormGroup>
            <Col sm={1}></Col>
            <Col sm={2}>
              <Button onClick={this.handleLogin}>Sign in</Button>
            </Col>
            <Col sm={4}>
              <Checkbox>Remember me</Checkbox>
            </Col>
          </FormGroup>

          <FormGroup>
            <Col smOffset={1} sm={4}>
              <a hef="#" onClick={this.handleShow}>Register Here</a>
            </Col>
          </FormGroup>

          <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Register</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form horizontal>
                <FormGroup controlId="formHorizontalFirstName">
                  <Col componentClass={ControlLabel} sm={2}>
                    Name
                          </Col>
                  <Col sm={10}>
                    <FormControl inputRef={(ref) => { this.first_name = ref }} name="firstName" type="fistName" placeholder="First Name" />
                  </Col>
                </FormGroup>

                <FormGroup controlId="formHorizontalLastName">
                  <Col componentClass={ControlLabel} sm={2}>
                  </Col>
                  <Col sm={10}>
                    <FormControl inputRef={(ref) => { this.last_name = ref }} name="lastName" type="lastName" placeholder="Last Name" />
                  </Col>
                </FormGroup>

                <FormGroup controlId="formHorizontalEmail">
                  <Col componentClass={ControlLabel} sm={2}>
                    Email
                          </Col>
                  <Col sm={10}>
                    <FormControl inputRef={(ref) => { this.register_email = ref }} name="email" type="email" placeholder="Email" />
                  </Col>
                </FormGroup>

                <FormGroup controlId="formHorizontalPassword">
                  <Col componentClass={ControlLabel} sm={2}>
                    Password
                          </Col>
                  <Col sm={10}>
                    <FormControl inputRef={(ref) => { this.register_password = ref }} name="password" type="password" placeholder="Password" />
                  </Col>
                </FormGroup>

                <FormGroup controlId="formHorizontalPasswordConfirmation">
                  <Col componentClass={ControlLabel} sm={2}>
                  </Col>
                  <Col sm={10}>
                    <FormControl inputRef={(ref) => { this.password_confirmation = ref }} name="passwordConfirmation" type="password" placeholder="Password Confirmation" />
                  </Col>
                </FormGroup>

                <FormGroup controlId="formHorizontalPhone">
                  <Col componentClass={ControlLabel} sm={2}>
                    Phone
                          </Col>
                  <Col sm={10}>
                    <FormControl inputRef={(ref) => { this.phone = ref }} name="phone" type="phone" placeholder="Phone" />
                  </Col>
                </FormGroup>

                <FormGroup controlId="formHorizontalCompanyName">
                  <Col componentClass={ControlLabel} sm={2}>
                    Company
                          </Col>
                  <Col sm={10}>
                    <FormControl inputRef={(ref) => { this.company_name = ref }} name="companyName" type="companyName" placeholder="Company Name" />
                  </Col>
                </FormGroup>

                <FormGroup controlId="formHorizontalCompanyName">
                  <Col componentClass={ControlLabel} sm={2}>
                    Location
                          </Col>
                  <Col sm={5}>
                    <FormControl inputRef={(ref) => { this.latitude = ref }} name="latitude" type="latitude" placeholder="Latitude" />
                  </Col>
                  <Col sm={5}>
                    <FormControl inputRef={(ref) => { this.longitude = ref }} name="longitude" type="longitude" placeholder="Longitude" />
                  </Col>
                </FormGroup>


              </Form>

            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.handleRegister}>Register</Button>
            </Modal.Footer>
          </Modal>

        </Form>
      </div>
    )
  };
};

export default Login;

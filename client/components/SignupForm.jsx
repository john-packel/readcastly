import React from 'react';
import { Grid, Row, Col, Jumbotron, FormGroup, ControlLabel, InputGroup, FormControl, Button } from 'react-bootstrap';
import axios from 'axios';
import { hashHistory } from 'react-router';

class SignupForm extends React.Component {
  constructor() {
		super();

    this.state = {
      firstName: '',
      email: '',
      password: '',
      lastName: '',
      phone: '',
      voicePref: '',
      avatar: '',
    };

    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handlePhoneChange = this.handlePhoneChange.bind(this);
    this.handleVoicePrefChange = this.handleVoicePrefChange.bind(this);
    this.handleAvatarChange = this.handleAvatarChange.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
  }

  handleSignUp(e) {
    e.preventDefault();
    // console.log("The email is: " + this.state.email);
    // console.log("The password is: " + this.state.password);
    // console.log("The first name is: " + this.state.firstName);
    // console.log("The last name is: " + this.state.lastName);
    // console.log("The phone is: " + this.state.phone);
    // console.log("The voice pref is: " + this.state.voicePref);
    // console.log("The avatar is: " + this.state.avatar);
    axios.post('/api/signup', {
      email: this.state.email,
      password: this.state.password,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      phone: '+1'+this.state.phone,
      voicePref: this.state.voicePref,
      avatar: this.state.avatar,
    })
		.then((res) => {
			console.log("POST REQUESTTTTTTTTTTTTTTTTTTTTTT" + res);
      hashHistory.push('/app');
      return;
		});
  }

  handleFirstNameChange(e) {
    console.log(e.target.value)
    this.setState({ firstName: e.target.value });
  }

  handleLastNameChange(e) {
    this.setState({ lastName: e.target.value });
  }

  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  handlePhoneChange(e) {
    this.setState({ phone: e.target.value });
  }

  handleVoicePrefChange(e) {
    this.setState({ voicePref: e.target.value });
  }

  handleAvatarChange(e) {
    this.setState({ avatar: e.target.value });
  }

  render() {
    return (
      <div id="signup-page">
      <Grid>
        <Row>
          <Col md={6} mdOffset={3}>
            <Jumbotron id="signup-jumbo">
              <img id="signup-logo" src='../images/readcastly-full-50pct.png' className="center-block" />
              <form>
                <FormGroup bsSize="lg">
                  <ControlLabel className="signup-label">E-mail Address</ControlLabel>
                  <InputGroup>
                    <InputGroup.Addon style={{backgroundColor: '#70cbce'}}><span className="glyphicon glyphicon-envelope" aria-hidden="true"></span></InputGroup.Addon>
                    <FormControl type="text" placeholder="Required" required />
                  </InputGroup>
                  <ControlLabel className="signup-label">First Name</ControlLabel>
                  <InputGroup>
                    <InputGroup.Addon style={{backgroundColor: '#70cbce'}}><span className="glyphicon glyphicon-user" aria-hidden="true"></span></InputGroup.Addon>
                    <FormControl type="text" placeholder="Required" required />
                  </InputGroup>
                  <ControlLabel className="signup-label">Last Name</ControlLabel>
                  <InputGroup>
                    <InputGroup.Addon style={{backgroundColor: '#70cbce'}}><span className="glyphicon glyphicon-user" aria-hidden="true"></span></InputGroup.Addon>
                    <FormControl type="text" placeholder="Optional" required />
                  </InputGroup>
                  <ControlLabel className="signup-label">Password</ControlLabel>
                  <InputGroup>
                    <InputGroup.Addon style={{backgroundColor: '#70cbce'}}><span className="glyphicon glyphicon-lock" aria-hidden="true"></span></InputGroup.Addon>
                    <FormControl type="password" placeholder="Required" required />
                  </InputGroup>
                  <ControlLabel className="signup-label">Verify Password</ControlLabel>
                  <InputGroup>
                    <InputGroup.Addon style={{backgroundColor: '#70cbce'}}><span className="glyphicon glyphicon-lock" aria-hidden="true"></span></InputGroup.Addon>
                    <FormControl type="password" placeholder="Required" required />
                  </InputGroup>
                  <ControlLabel  className="signup-label">Phone (to receive links to ReadCasts via text)</ControlLabel>
                  <InputGroup>
                    <InputGroup.Addon style={{backgroundColor: '#70cbce'}}><span className="glyphicon glyphicon-phone-alt" aria-hidden="true"></span></InputGroup.Addon>
                    <FormControl type="text" placeholder="Optional" required />
                  </InputGroup>
                  <br />
                  <Button bsStyle="warning" type="submit" onClick={this.handleSignUp.bind(this)} block>Join Us!</Button>
                </FormGroup>
              </form>
            <div>Already have an account? <a href="/#/">Login here</a></div>
          </Jumbotron>
        </Col>
      </Row>
      </Grid>
    </div>
    );
  }
}

export default SignupForm;

{/*}
              <form onSubmit={this.handleSignUp}>
                First Name:<br/>
              <input type="text" name="firstName" value={this.state.firstName} onChange={this.handleFirstNameChange}/><br/>
                Last Name:<br/>
              <input type="text" name="lastName" value={this.state.lastName} onChange={this.handleLastNameChange}/><br/>
                E-mail:<br/>
              <input type="email" name="email" value={this.state.email} onChange={this.handleEmailChange}/><br/>
                Password:<br/>
              <input type="password" name="password" value={this.state.password} onChange={this.handlePasswordChange}/><br/>
                Phone Number:<br/>
              <input type="text" name="phone" value={this.state.phone} onChange={this.handlePhoneChange}/>{/*<br/>
                Voice Preference:<br/>
              <input type="text" name="voicePref" value={this.state.voicePref} onChange={this.handleVoicePrefChange}/><br/>
                Avatar:<br/>
              <input type="url" name="avatar" value={this.state.avatar} onChange={this.handleAvatarChange}/>*/}{/*<br/>
              <Button type="submit" bsStyle="success">Sign Up</Button>
              </form>
*/}
//------------------ THIS FILE IS NOT USED ---------------------------
//--------THE RESPONSE OBJECT CANNOT BE PROPERLY HANDLED WITHIN AXIOS

import React from 'react';
import axios from 'axios';
import { withRouter } from "react-router-dom";
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password:''
    }
    this.handleChange = this.handleChange.bind(this);
    this.signUp = this.signUp.bind(this);
  }

  handleChange(e) {
    let newState = {};
    newState[e.target.name] = e.target.value;
    this.setState(newState);
  }

  signUp(e) {
    let newUser = {};
    newUser.username = this.state.username;
    newUser.password = this.state.password;
    if (newUser.username.length === 0 || newUser.password.length === 0) {
      return;
    }
    console.log(newUser.username, newUser.password);
    axios.post('/locosignup', newUser)
    .then((response) => {
      if (response.data === 'User already exists!') {
        this.props.history.push('/');
      }
      //------------------ THIS FILE IS NOT USED ---------------------------
      //--------THE RESPONSE OBJECT CANNOT BE PROPERLY HANDLED WITHIN AXIOS
    });
  }

  render() {
    return (
      <div>
        <TextField onChange={this.handleChange} name="username" value={this.state.username} hintText="Username" required={true}/>
        <br />
        <TextField onChange={this.handleChange} name="password" type="password" value={this.state.password} hintText="Password"/>
        <br />
        <br />
        <FlatButton onClick={this.signUp} label="Sign Up" />
    </div>
    )
  }
}

export default Signup;
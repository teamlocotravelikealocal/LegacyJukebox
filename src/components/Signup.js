import React from 'react';
import axios from 'axios';
import { withRouter } from "react-router-dom";
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ''
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
    axios.post('/signup', newUser)
    .then((response) => {
      this.props.history.push('/')
    })
  }

  render() {
    return (
      <div>
        <TextField onChange={this.handleChange} name="username" value={this.state.username} hintText="Username"/>
        <br />
        <br />
        <FlatButton onClick={this.signUp} label="Sign Up" />
    </div>
    )
  }
}

export default Signup;
import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Navbar from './Navbar';
import Container from './Container';
import Banner from './Banner';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name:this.props.name,
      user:''
    }
  }

  componentDidMount() {
    axios.get('/users/' + this.state.name)
    .then((response) => {
      this.setState({
       user: response.data
      });
    })
    .catch((err) => {
      console.log(err);
    });
  }

  render() {
    const textStyle = {
      textAlign: 'center',
      fontFamily: 'Roboto, sans-serif',
      fontWeight: 'bold',
      marginTop: '40px',
      color: '#128d9c'
    }
    const userNameStyle = {
      textTransform : 'capitalize'
    }
    console.log(this.props);
    return (
      <div>
        <Banner/>
        <MuiThemeProvider>
          <Navbar name={this.state.name}/>
        </MuiThemeProvider>
        {this.state.name !== 'not logged in' &&
        <div style={textStyle}>Welcome <span style={userNameStyle}>{this.state.name}</span>! Add a song, vote a song or sign in with spotify to play the first song in the list.</div>
        }
        {this.state.name === 'not logged in' &&
        <div style={textStyle}>Login to add, vote or play a song.</div>
        }
        <Container name={this.state.name} user={this.state.user}/>
      </div>
    )
  }
}
export default App;
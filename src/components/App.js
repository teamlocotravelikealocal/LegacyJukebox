import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Navbar from './Navbar';
import Container from './Container';
import Banner from './Banner';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {name:this.props.name}
  }
  render() {
    console.log(this.state.name);
    return (
      <div>
        <Banner/>
        <MuiThemeProvider>
          <Navbar name={this.state.name}/>
        </MuiThemeProvider>
        {this.state.name !== 'not logged in' &&
        <div>Welcome {this.props.name}! Go to search to select a song or sign in with spotify to play the first song in the list.</div>
        }
        {this.state.name === 'not logged in' &&
        <div>Login to select a song or sign in with spotify to play the first song in the list.</div>
        }
        <Container name={this.state.name}/>
      </div>
    )
  }
}
export default App;
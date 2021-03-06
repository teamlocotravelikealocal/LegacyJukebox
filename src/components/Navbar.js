import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

import { Link } from 'react-router-dom';

class Navbar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      selectedItem: '',
      name: this.props.name
    }
    this.handleToggle = this.handleToggle.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleToggle() {
    this.setState({open: !this.state.open});
  }
  handleClose () {
    this.setState({open: false});
  }

  render() {
    const navbarStyle = {
      zIndex: '1',
    }
    const linkStyle = {
      textDecoration : 'none',
      color : '#000'
    }
    return (
      <div>
        <AppBar
          title="Quinces JukeBox"
          style={navbarStyle}
          iconElementLeft={
            <IconButton
            onClick={this.handleToggle}
            ><NavigationMenu /></IconButton>}
        />
        <Drawer
          docked={false}
          width={200}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}
        >
          <MenuItem onClick={this.handleClose}><Link style={linkStyle} to="/">Playlist</Link></MenuItem>
          {this.state.name !== 'not logged in' &&
          <MenuItem onClick={this.handleClose}><Link style={linkStyle} to="/search">Find a song</Link></MenuItem>
          }
          {this.state.name === 'not logged in' &&
          <MenuItem onClick={this.handleClose}><a style={linkStyle} href="/locologin.html">Log In</a></MenuItem>
          }
          {this.state.name === 'not logged in' &&
          <MenuItem onClick={this.handleClose}><a style={linkStyle} href="/locosignup.html">Sign Up</a></MenuItem>
          }
          {this.state.name !== 'not logged in' &&
          <MenuItem onClick={this.handleClose}><a style={linkStyle} href="/hostLogin">Sign In With Spotify</a></MenuItem>
          }
          {this.state.name !== 'not logged in' &&
          <MenuItem onClick={this.handleClose}><a style={linkStyle} href="/logout">Log Out</a></MenuItem>
          }
        </Drawer>
      </div>
    )
  }
}

export default Navbar;
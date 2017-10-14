import React from 'react';
import { Switch, Route, PropsRoute } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Playlist from './Playlist';
import Signup from './Signup';
import Login from './Login';
import Search from './Search';


class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
      user: this.props.user
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({user: nextProps.user});
  }

  render() {
    return (
      <MuiThemeProvider>
        <Switch>
          <Route exact path='/' render={()=><Playlist name={this.state.name} user={this.state.user}/>}/>
          <Route exact path='/search' render={()=><Search name={this.state.name} user={this.state.user}/>}/>
        </Switch>
      </MuiThemeProvider>
    )
  }
}
export default Container;

// TODO: Review how react router should be implemented with a node express backend
//<Route path="/abc" render={()=><TestWidget num="2" someProp={100}/>}/>

// <Route exact path='/signup' component={Signup}/>
// <Route exact path='/login' component={Login}/>
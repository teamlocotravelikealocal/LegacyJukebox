import React from 'react';
import axios from 'axios';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import SearchEntry from './SearchEntry';
import Login from './Login';
import { Link } from 'react-router-dom';

class Search extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      query: '',
      results: [],
      users: [],
      currentUser: this.props.user,
      usersSongs: this.props.user.addedSongs,
      name: this.props.name,
      searchByValue: 'Search By Artist Name'
    }
    this.onSearch = this.onSearch.bind(this);
    this.searchByChange = this.searchByChange.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onAdd = this.onAdd.bind(this);
    // this.getAllUsers = this.getAllUsers.bind(this);
    // this.handleUserChange = this.handleUserChange.bind(this);
  }

  componentDidMount() {
    // console.log(this.props.user.addedSongs);
    // this.setState({
    //   usersSongs: this.props.user.addedSongs
    // });
    // axios.get('/users/' + this.state.name)
    // .then((response) => {
    //   this.setState({
    //    currentUser: response.data,
    //    usersSongs: response.data.addedSongs
    //   });
    // })
    // .catch((err) => {
    //   console.log(err);
    // });
  }

  searchByChange(e) {
    this.setState({ searchByValue: e.target.value });
  }

  onSearch(query){
    var searchBy = 'track';
    if (this.state.searchByValue == 'Search By Artist Name') {
      searchBy = 'artist';
    }
    axios.get('/songs/search', {
      params: {
        query: this.state.query,
        searchBy: searchBy
      }
    })
    .then((response) => {
      this.setState({ results: response.data.tracks.items});
    })
    .catch((err) => {
      console.error.bind(err);
    })
  }

  onChange(e) {
    let query = e.target.value;
    this.setState({query:query});
  }

  onAdd(song) {
    let newSong = {};
    newSong.name = song.name;
    newSong.image = song.album.images[1].url;
    newSong.link = song.external_urls.spotify;
    newSong.artist = song.artists[0].name;
    newSong.userName = this.state.name;
    // if(this.state.currentUser === '') {
    //   newSong.userName = 'anonymous';
    // } else {
    //   newSong.userName = this.state.currentUser.name;
    // }
    axios.post('/songs', newSong)
    .then((response) => {
      // window.location.href = "/hostLogin";
      window.location.href = "/";
    })
    .catch((err) => {
      console.log(err);
    });
  }

  // handleUserChange (user){
  //   this.setState({
  //     currentUser: user,
  //   });
  //   if(user.addedSongs.length > 0) {
  //     this.setState({usersSongs: user.addedSongs})
  //   }
  // };

  // getAllUsers() {
  //   axios.get(`/users`)
  //   .then((response) => {
  //     this.setState({
  //      users: response.data
  //     })
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   })
  // }

  render() {
    const styles = {
      inside: {
        width: '30%',
        display: 'inline-block'
      },
      textAlign: 'center',
      width: '100%',
      height: '100%'
    }
    return (
      <div style={styles}>
        <div style={styles.inside}>
        {/* <Login onChange={this.handleUserChange} users={this.state.users} currentUser={this.state.currentUser}/>*/}
        <TextField name="selectUser" onChange={this.onChange} hintText="Search a song"/>
        <br />
        {this.state.usersSongs &&
        <span>Remaining songs to add: {4 - this.state.usersSongs.length}</span>
        }
        {/* <br />
        <br />
        <Link to="/signup">Don't see your name? Sign up here!</Link> */}
        <br />
        <br />
        <select onChange={this.searchByChange} value={this.state.searchByValue}>
          <option value='Search By Artist Name'>Search By Artist Name</option>
          <option value='Search By Track Name'>Search By Track Name</option>
        </select>
        <br />
        <br />
        {this.state.usersSongs && this.state.usersSongs.length < 4 &&
        <RaisedButton onClick={this.onSearch} label="Search"/>
        }
        <div>
        {
        this.state.results && this.state.results.map((result, i) => {
          return (
            <SearchEntry key={i} onAdd={this.onAdd} Result={result}/>
          )
        })
      }
      </div>
          <ul>
          {
            this.state.usersSongs && this.state.usersSongs.map((song, i) => {
              return (
                <li key={i}>{song.name}, {song.artist}</li>
              )
            })
          }
          </ul>
        </div>
     </div>
    )
  }
}

export default Search;
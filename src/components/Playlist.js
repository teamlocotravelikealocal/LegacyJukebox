import React from 'react';
import axios from 'axios';
import SpotifyWebApi from 'spotify-web-api-js';
import PlaylistEntry from './PlaylistEntry';
import Player from './Player.js';
import FlatButton from 'material-ui/FlatButton';

const spotifyApi = new SpotifyWebApi();

class Playlist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      songs: [],
      currentSong: '',
      deviceId: '',
      currentUser: this.props.name,
      user: this.props.user
    }
    this.getAllSongs = this.getAllSongs.bind(this);
    this.upVote = this.upVote.bind(this);
    this.downVote = this.downVote.bind(this);
    this.handlePlayButtonClick = this.handlePlayButtonClick.bind(this);
  }

  componentDidMount() {
    this.getSpotifyToken();
    this.getDeviceId();
    this.getAllSongs();
  }

  getAllSongs() {
    axios.get(`/songs`)
    .then((response) => {
      this.setState({
        songs: response.data
      })
    })
    .catch((err) => {
      console.error.bind(err);
    })
  }

  upVote(song) {
    var found = false;
    if (song.usersVoted) {
      for (var i = 0; i < song.usersVoted.length; i++) {
        if (this.state.currentUser === song.usersVoted[i]) {
          found = true;
          break;
        }
      }
    }
    if (!found) {
      song.vote = 1;
      song.votedUser = this.state.currentUser;
      axios.put('/song', song)
      .then((response) => {
        this.getAllSongs();
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }

  downVote(song) {
    var found = false;
    if (song.usersVoted) {
      for (var i = 0; i < song.usersVoted.length; i++) {
        if (this.state.currentUser === song.usersVoted[i]) {
          found = true;
          break;
        }
      }
    }
    if (!found) {
      song.vote = -1;
      song.votedUser = this.state.currentUser;
      axios.put('/song', song)
      .then((response) => {
        this.getAllSongs();
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }

  getSpotifyToken() {
    const getHashParams = () => {
      let hashParams = {};
      let e, r = /([^&;=]+)=?([^&;]*)/g;
      let q = window.location.hash.substring(1);
      while ( e = r.exec(q)) {
        hashParams[e[1]] = decodeURIComponent(e[2]);
      }
      return hashParams;
    }

    const params = getHashParams();
    const access_token = params.access_token;
    const refresh_token = params.refresh_token;

    spotifyApi.setAccessToken(access_token);
    return access_token;
  }

  //get the active device for the host user who is signed in to Spotify
  getDeviceId() {
    spotifyApi.getMyDevices()
      .then((data) => {
        //if (data.length > 0) {
          this.setState({deviceId : data.devices[0].id})
       // }
      }, (err) =>{
        console.error(err);
      });
  }

  playCurrentSong(deviceId, trackId) {
    spotifyApi.play({
      device_id: deviceId,
      uris: ['spotify:track:' + trackId]
    });
  };

  handlePlayButtonClick () {
    const trackId = this.state.songs[0].link.split('track/')[1];
    const songId = this.state.songs[0]._id;
    this.setState({currentSong: this.state.songs[0]});
    this.playCurrentSong(this.state.deviceId, trackId);
    this.removeSong(songId);
  }

  removeSong(songId) {
    axios.delete('/song', {params: {id: songId}})
    .then((response) => {
      this.getAllSongs();
    })
    .catch((err) => {
      console.log(err);
    })
  }

  render() {

    const playerStyle = {
      display: 'block',
      width: '100%',
      verticalAlign: 'top',
      textAlign: 'center'
    }
    const playListStyle = {
      display: 'block',
      float: 'none',
      width: 'calc(100% - 34px)',
      maxWidth: '1600px',
      margin: '100px auto'
    }
    const playButtonStyle = {
      width: '100%',
      margin: '16px',
      textAlign: 'center'
    }

    const titleWrapStyle = {
      overflow: 'visible',
      height: '119px'
    }
      return (
        <div>
          {this.state.deviceId &&
          <div style={playButtonStyle}>
            <FlatButton onClick={this.handlePlayButtonClick} label="Play top song" primary={true} />
          </div>
          }
          <div>
            <div style={playerStyle}>
            {this.state.currentSong && <Player trackId={this.state.currentSong.link.split('track/')[1]}/>}
            </div>
            <div style={playListStyle} >
          {
            this.state.songs && this.state.songs.map((song, i) => {
              return (
                <PlaylistEntry index={i+1} user={this.state.currentUser} downVote={this.downVote} handlePlay={this.handlePlayButtonClick} upVote={this.upVote} Song={song} key={i} />
              )
            })
          }
            </div>
          </div>
        </div>
      )
  }
}

export default Playlist;
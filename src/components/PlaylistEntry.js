import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FloatingActionButton from 'material-ui/FloatingActionButton';

const PlaylistEntry = (props) => {
  const handleUpVote = () => {
    props.upVote(props.Song);
  }

  const handleDownVote = () => {
    props.downVote(props.Song);
  }

  const handlePlayButtonClick = () => {
    props.handlePlay(props.Song);
  }

  const cardStyle = {
    display: 'block',
    margin: '40px',
    width: '250px',
    margin: '15px',
    transitionDuration: '0.3s',
    float:'left',
    padding: '2px'
  }

  const containerStyle = {
    height: '300px'
  }
  const divStyle = {
    textAlign: 'center'
  }
  const buttonStyle = {
   margin: '5px'
  }
  const indexStyle = {
    position: 'relative',
    top: '-20px',
    left: '95px'
  }

  return (
      <div>
        <Card style={cardStyle}>
        <FloatingActionButton style={indexStyle}>{props.index}</FloatingActionButton>
          <CardMedia>
            <img src={props.Song.image} alt="" />
          </CardMedia>
          <CardTitle title={props.Song.name} subtitle={props.Song.artist} />
          <CardText>
            Added by: {props.Song.userName}
          </CardText>
          <CardActions>
            <div style={divStyle}>
              <FloatingActionButton style={buttonStyle} onClick={handleUpVote} mini={true}>
                +{props.Song.upVoteCount}
              </FloatingActionButton>
              <FloatingActionButton style={buttonStyle} onClick={handleDownVote} mini={true} secondary={true}>
                -{props.Song.downVoteCount}
              </FloatingActionButton>
            </div>
          </CardActions>
      </Card>
    </div>
  )
}

export default PlaylistEntry;
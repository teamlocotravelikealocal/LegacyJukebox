import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';


const SearchEntry = (props) => {
  {console.log(props.Result)}
  const clickHandler = () => {
    props.onAdd(props.Result);
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

  const searchEntryTitleStyle = {
    overflow: 'visible',
    height: '185px'
  }
  return(
    <div>
      <Card style={cardStyle}>
        <CardMedia>
          <iframe src={'https://embed.spotify.com/?uri=spotify:track:' + props.Result.id} width="300" height="280" frameBorder="0" allowTransparency="true"></iframe>
        </CardMedia>
        <CardTitle style={searchEntryTitleStyle} title={props.Result.name} subtitle={props.Result.artists[0].name} />
        <CardActions>
          <div>
            <FloatingActionButton onClick={clickHandler} mini={true}>
              <ContentAdd />
            </FloatingActionButton>
          </div>
        </CardActions>
      </Card>
    </div>
  )
}

export default SearchEntry;
import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Navbar from './Navbar';
import Container from './Container';
import Banner from './Banner';

const App =  (props) => {
  return (
    <div>
    <Banner/>
    <MuiThemeProvider>
      <Navbar/>
    </MuiThemeProvider>
    <Container/>
  </div>
  );
}
export default App;
import React from 'react';

const Banner = () => {
  const bannerStyle = {
    position: 'fixed',
    top: '0',
    right: '0',
    border: '0',
    zIndex: '1000'
  }

  
  return (
    <div>
    <a href="http://hackreactor.com">
    <img style={bannerStyle}
    src="http://i.imgur.com/x86kKmF.png"
    alt="Built at Hack Reactor"></img>
    </a>
    </div>
  )
}

export default Banner;
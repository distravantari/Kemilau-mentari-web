import React, { Component } from 'react';

export default class Loading extends Component {
  render() {
    return (
      <div className='loading-overlay'>
        <div className='loading-wrapper'>
          <div className='loader'>Loading...</div>
          <h3 className='text-center'>Loading...</h3>
        </div>
      </div>
    );
  }
}

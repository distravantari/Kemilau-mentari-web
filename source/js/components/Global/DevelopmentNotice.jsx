import React, { Component } from 'react';

export default class DevelopmentNotice extends Component {
  constructor(){
    super();

    this.handleHideNotice = this.handleHideNotice.bind(this);
  }

  handleHideNotice() {
    this.noticeEl.classList.remove('active');
  }

  render() {
    return (
      <div className='development-notice active' ref={ (noticeEl => this.noticeEl = noticeEl) }>
        <h5 className='text-center white'>Page Under Construction</h5>
        <h6 className='interact text-center white' onClick={ this.handleHideNotice }>Click To Dismiss</h6>
      </div>
    );
  }
}

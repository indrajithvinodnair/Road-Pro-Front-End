import Spinner from 'react-spinner-material';
import React, { Component } from 'react';

export default class Example extends Component {
  render() {
  return (
      <div className="d-flex justify-content-center">
        <Spinner size={100} spinnercolor={"#333333"} spinnerwidth={2} visible={true} />
      </div>
    );
  }
}
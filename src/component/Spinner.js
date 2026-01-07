import React, { Component } from 'react'
import loading from './Escaping ball.gif'
export default class spinner extends Component {
  render() {
    return (
      <div>
        <br />
        <img src={loading} alt="" srcSet="" />
        <br />

      </div>
    )
  }
}

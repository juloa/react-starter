import React, { Component } from 'react';
import PageContent from "react-toolbox/lib/Layout/PageContent"
import { Link } from "react-router-dom"

export default class Home extends Component {
  render() {
    return <PageContent title="Home Component"><Link to="/posts">POSTS</Link></PageContent>
  }
}
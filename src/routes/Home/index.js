import React, { Component } from "react"
import PageContent from "react-starter/src/react-toolbox/lib/Layout/PageContent"
import { Link } from "react-router-dom"
import { hot } from "react-hot-loader"

class Home extends Component {

  render() {
    return <PageContent title="Home Component"><Link to="/posts">POSTS</Link></PageContent>
  }

}

export default hot(module)(Home)

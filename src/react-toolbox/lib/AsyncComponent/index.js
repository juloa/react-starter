import React, { Component } from "react";
import { FormattedMessage as Text } from "react-intl"
import PageContent from "../Layout/PageContent"
import messages from "./messages"

export default function asyncComponent(importComponent) {
  class AsyncComponent extends Component {
    constructor(props) {
      super(props);

      this.state = {
        component: null
      };
    }

    async componentDidMount() {
      const { default: component } = await importComponent();

      this.setState({
        component: component
      });
    }

    render() {
      const C = this.state.component;

      return C ? <C {...this.props} /> : <PageContent><div><Text { ...messages.loading } /></div></PageContent>;
    }
  }

  return AsyncComponent;
}

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Toggle from "./Toggle";

export default class ToggleProvider extends Component {

  static Renderer = class extends Component {
    static contextName = '__toggle__';
    static childContextTypes = { [ ToggleProvider.contextName ]: PropTypes.string.isRequired };

    getChildContext() {
      return {
        [ ToggleProvider.contextName ]: this.props.toggle
      }
    }

    render() {
      return this.props.children;
    }
  }

  render() {
    const { children, ...props } = this.props;
    return (
      <Toggle {...props} render={(toggle) => (
        <ToggleProvider.Renderer toggle={toggle} children={children}/>
      )}/>
    )
  }
}

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Toggle from "./Toggle";

export default class ToggleProvider extends Component {
  static contextName = '__toggle__';

  // ToggleProvider.Renderer
  // Is responsible for setting up the context for this toggle state.

  static Renderer = class extends Component {
    // Specify context types
    static childContextTypes = {
      [ ToggleProvider.contextName ]: PropTypes.object.isRequired
    };

    // return the context with the toggle object taken from the Renderer's props
    getChildContext() {
      return {
        [ ToggleProvider.contextName ]: this.props.toggle
      }
    }

    render() {
      // just return the children
      return this.props.children;
    }
  }

  render() {
    const { children, ...props } = this.props;
    // Take the children and the rest of the props and
    // return our own usage of the Toggle component.
    return (
      <Toggle {...props} render={(toggle) => (
        <ToggleProvider.Renderer toggle={toggle} children={children}/>
      )}/>
    )
  }
}
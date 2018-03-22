import React from 'react';

// RENDER PROPS
// https://egghead.io/lessons/react-use-render-props-with-react

// HoC vs Render Props
//
// HOC
// - Everything needs to be wrapped and a new component is created:
//    Problems we must solve:
//      a. move STATICS from wrapped component
//      b. fix the DISPLAY NAME
//      c. take care of the NAMESPACE defense to avoid naming collision
//      d. move wrapped component REFS
// - In order to know which are props from enhancement and which are own props, we must read implementation
// - Is harder to use types as Typescript or Flow
// - The composition takes place statically during the construction phase of the application

// Render Props
// - The composition takes place right within React's normal composition model: the render phase,
//   we can take advantage of lifecycle methods and natural flow of props and state because the composition model
//   is dynamic.

export default class ToggleRenderProps extends React.Component {
  static defaultProps = {
    defaultOn: false,
    onReset: () => console.log('Unspecified onReset'),
    onToggle: () => console.log('Unspecified onToggle')
  }

  // STATE INITIALIZERS
  // https://egghead.io/lessons/react-use-component-state-initializers
  initialState = { on: this.props.defaultOn };
  state = this.initialState;

  _toggle = () => {
    this.setState(({ on }) => ({
      on: !on
    }), this.props.onToggle);
  }

  _reset = () => {
    this.setState(() => ({
      on: this.initialState.defaultOn
    }), () => this.props.onReset())
  }

  _callOnArgs = (...fns) => (...args) => fns.forEach(fn => fn && fn(...args));

  // PROP GETTERS WITH RENDER PROPS
  // https://egghead.io/lessons/react-use-prop-getters-with-render-props

  _getTogglerProps = ({ onClick, ...props } = {}) => {
    // togglerProps Collection
    return {
      onClick: this._callOnArgs(onClick, this._toggle), // run both
      'aria-expanded': this.state.on,
      ...props
    };
  }

  render() {
    return this.props.render({
      on: this.state.on,
      toggle: this._toggle,
      reset: this._reset,
      getTogglerProps: this._getTogglerProps
    });
  }
}

import React from 'react';

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
  state = {
    on: true
  };

  toggle = () => {
    this.setState(({ on }) => ({
      on: !on
    }))
  }

  render() {
    return this.props.render({
      on: this.state.on,
      toggle: this.toggle,
      togglerProps: { // togglerProps Collection
        onClick: this.toggle,
        'aria-expanded': this.state.on
      }
    });
  }
}

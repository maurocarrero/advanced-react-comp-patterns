import React from 'react';
import Switch from './Switch';

/**
 * COMPOUND COMPONENTS
 * https://egghead.io/lessons/react-write-compound-components
 *
 * 1. One component at the top level (Toggle)
 * 2. Inner components (On, Off, Switch) can be accessed by the component hosting our main component, so it is able
 *    to configure how they are organized.
 * 3. All children component receives the main implicit state, in this case: "on".
 */

const ToggleOn = ({ on, children }) => on ? children : null;
const ToggleOff = ({ on, children }) => on ? null : children;
const ToggleSwitch = ({ on, toggle, ...props }) => <Switch onClick={toggle} on={on} {...props}/>;

export default class Toggle extends React.Component {
  static defaultProps = { onToggle: () => {} };

  static On = ToggleOn;
  static Off = ToggleOff;
  static Switch = ToggleSwitch;

  state = { on: true };

  toggle = () => {
    this.setState(
      ({ on }) => ({ on: !on }),
      () => this.props.onToggle(this.state.on)
    );
  };

  render() {
    // We clone all (only include direct descendents) children passing main components implicit props and we render that.
    const children = React.Children.map(
      this.props.children,
      child => React.cloneElement(child, {
        on: this.state.on,
        toggle: this.toggle
      })
    );

    return <div className="row">{children}</div>;
  }
}
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Switch from './Switch';
import withToggle, { TOGGLE_CONTEXT_KEY } from './withToggle';

/**

 // CONTEXT API

 // 1. define the toggle component context key that will be shared among all children.
 const TOGGLE_CONTEXT_KEY = '__toggle__';

 // 2. define the type of our context prop
 const MAIN_CONTEXT_TYPES = {
  [ TOGGLE_CONTEXT_KEY ]: PropTypes.object.isRequired
};

 // 3. get the context we need from all children Components and use their own props as well
 const ToggleWithContextOn = ({ children }, context) => {
  const { on } = context[ TOGGLE_CONTEXT_KEY ];
  return on ? children : null;
}
 const ToggleWithContextOff = ({ children }, context) => {
  const { on } = context[ TOGGLE_CONTEXT_KEY ];
  return on ? null : children;
}
 const ToggleWithContextSwitch = (props, context) => {
  const { on, toggle } = context[ TOGGLE_CONTEXT_KEY ];
  return <Switch onClick={toggle} on={on} {...props}/>
};

 // 4. all children specifies the same context types
 ToggleWithContextOn.contextTypes = MAIN_CONTEXT_TYPES;
 ToggleWithContextOff.contextTypes = MAIN_CONTEXT_TYPES;
 ToggleWithContextSwitch.contextTypes = MAIN_CONTEXT_TYPES;

 **/

// 1'. use withToggle HoC and steps 1, 2, 3, and 4 are encapsulated there.
const ToggleWithContextON = (props) => {
  const { children, [ TOGGLE_CONTEXT_KEY ]: { on } } = props;
  return on ? children : null;
};
const ToggleWithContextONUsingWithContextHoC = withToggle(ToggleWithContextON);

const ToggleWithContextOFF = (props) => {
  const { children, [ TOGGLE_CONTEXT_KEY ]: { on } } = props;
  return on ? null : children;
};
const ToggleWithContextOFFUsingWithContextHoC = withToggle(ToggleWithContextOFF);

const ToggleWithContextSwitch = (props) => {
  const { [ TOGGLE_CONTEXT_KEY ]: { on, toggle } } = props
  return <Switch onClick={toggle} on={on} {...props}/>;
};
const ToggleWithContextSwitchUsingWithContextHoC = withToggle(ToggleWithContextSwitch);

export default class ToggleWithContext extends Component {
  static defaultProps = {
    onToggle: () => {
    }
  };

  static On = ToggleWithContextONUsingWithContextHoC;         // ToggleWithContextOn
  static Off = ToggleWithContextOFFUsingWithContextHoC;       // ToggleWithContextOff
  static Switch = ToggleWithContextSwitchUsingWithContextHoC; // ToggleWithContextSwitch

  // 5. define context type to all children
  static childContextTypes = {
    [ TOGGLE_CONTEXT_KEY ]: PropTypes.object.isRequired
  };

  state = { on: true };

  // 6. define getChildContext method to know what to assign to children context
  getChildContext = () => {
    return {
      [ TOGGLE_CONTEXT_KEY ]: {
        on: this.state.on,
        toggle: this.toggle
      }
    }
  }

  toggle = () => {
    this.setState(
      ({ on }) => ({ on: !on }),
      () => this.props.onToggle(this.state.on)
    );
  };

  render() {
    // 7. we return the children as they are, they will be fed by the context
    return <div className="row">{this.props.children}</div>;
  }
}

import { Component } from 'react';

export default class Toggle extends Component {
  static defaultProps = {
    defaultOn: false,
    onReset: () => console.log('Unspecified onReset'),
    onToggle: () => console.log('Unspecified onToggle')
  }

  initialState = { on: this.props.defaultOn };
  state = this.initialState;

  _callOnArgs = (...fns) => (...args) => fns.forEach(fn => fn && fn(...args));

  _isNotControlled = () => this.props.on === undefined;

  getTogglerProps = ({ onClick, ...props } = {}) => ({
    onClick: this._callOnArgs(onClick, this.toggle),
    'aria-expanded': this.state.on,
    ...props
  });

  reset = () =>
    this._isNotControlled() ?
      this.setState(() => ({
        on: this.initialState.defaultOn
      }), this.props.onReset)
      :
      this.props.onReset();

  toggle = () =>
    this._isNotControlled() ?
      this.setState(({ on }) => ({
        on: !on
      }), this.props.onToggle)
      :
      this.props.onToggle();

  on = () => this._isNotControlled() ?
    this.state.on
    :
    this.props.on;

  render() {
    const { getTogglerProps, on, reset, toggle } = this;

    return this.props.render({
      getTogglerProps,
      on: on(),
      reset,
      toggle
    });
  }
}
import React, { Component, Fragment } from 'react';
import ToggleRenderProps from './ToggleRenderProps';
import Switch from '../Switch';

class Main extends Component {
  initialState = {
    on: false,
    times: 0
  };

  state = this.initialState;

  _plus = () =>
    this.setState(({ times }) => ({
      times: times + 1
    }));

  _reset = () =>
    this.setState(this.initialState);

  _maxReached = () =>
    this.state.times === 3;

  _onToggle = () => {
    if (!this._maxReached()) {
      this.setState(({ on }) => ({
        on: !on
      }), () => this._plus())
    }
  }

  _renderMessage = () => <span>Too many clicks</span>;

  render() {
    return (
      <article>
        <h2>Toggle using Render Props pattern</h2>
        <h4>Control props</h4>
        <p>Toggle component now is controlled.</p>
        <ToggleRenderProps
          on={this.state.on}
          defaultOn={true}
          onToggle={this._onToggle}
          onReset={this._reset}
          render={({ on, getTogglerProps, reset }) => (
            <Fragment>
              <Switch
                on={on}
                {...getTogglerProps()}
              />
              <button onClick={reset}>Reset</button>
              {this._maxReached() && this._renderMessage()}
            </Fragment>
          )}
        />
      </article>
    )
  }
}

export default Main;

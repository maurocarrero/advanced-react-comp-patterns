import React, { Component } from 'react';
import { render } from 'react-dom';
import Toggle, { ToggleWithContext, ToggleRenderProps, withToggle } from './toggle';

import './styles.css';
import { TOGGLE_CONTEXT_KEY } from "./toggle/withToggle";

class App extends Component {

  static SHOW_SIMPLE_TOGGLE_PROP = 'showSimpleToggle';
  static SHOW_SIMPLE_TOGGLE_WITH_CONTEXT_PROP = 'showToggleWithContext';
  static SHOW_SIMPLE_TOGGLE_HOC_PROP = 'showToggleHOC';
  static SHOW_SIMPLE_TOGGLE_RENDER_PROPS_PROP = 'showToggleRenderProps';

  state = {
    [App.SHOW_SIMPLE_TOGGLE_PROP]: false,
    [App.SHOW_SIMPLE_TOGGLE_WITH_CONTEXT_PROP]: false,
    [App.SHOW_SIMPLE_TOGGLE_HOC_PROP]: false,
    [App.SHOW_SIMPLE_TOGGLE_RENDER_PROPS_PROP]: true
  }

  componentDidCatch(err) {
    console.log('ERROR CAUGHT:', err.message);
  }

  _handleOnChange = (prop) => () => {
    this.setState((props) => ({
      [prop]: !props[prop]
    }));
  }

  _handleSimpleToggleOnChange = this._handleOnChange(App.SHOW_SIMPLE_TOGGLE_PROP);
  _handleToggleWithContextOnChange = this._handleOnChange(App.SHOW_SIMPLE_TOGGLE_WITH_CONTEXT_PROP);
  _handleToggleHOCOnChange = this._handleOnChange(App.SHOW_SIMPLE_TOGGLE_HOC_PROP);
  _handleToggleRenderPropsOnChange = this._handleOnChange(App.SHOW_SIMPLE_TOGGLE_RENDER_PROPS_PROP);

  _renderToggle = () => (
    <article>
      <h2>Toggle as Compound component</h2>
      <Toggle onToggle={console.log}>
        <Toggle.On>Encendido on top</Toggle.On>
        <Toggle.Off>Apagado on top</Toggle.Off>
        <Toggle.Switch/>
      </Toggle>
      <Toggle onToggle={console.log}>
        <Toggle.On>Encendido on top</Toggle.On>
        <Toggle.Switch/>
        <Toggle.Off>Apagado on bottom</Toggle.Off>
      </Toggle>
      <Toggle onToggle={console.log}>
        <div>
          <Toggle.Off>This will not work because is not a direct children, we can fix this by using Context
            API</Toggle.Off>
        </div>
        <Toggle.On>Apagado will work</Toggle.On>
        <Toggle.Switch/>
      </Toggle>
    </article>
  )

  _renderToggleWithContext = () => (
    <article>
      <h2>Toggle Compound component using Context API</h2>
      <ToggleWithContext>
        <div>
          <h5>Off works independently of its location in the rendered structure, fed by the context.</h5>
          <ToggleWithContext.Off>Off</ToggleWithContext.Off>
        </div>
        <ToggleWithContext.On>On</ToggleWithContext.On>
        <ToggleWithContext.Switch/>
      </ToggleWithContext>
    </article>
  )

  _renderToggleHOC() {
    const CustomSwitch = (props) => {
      const { on, toggle } = props[ TOGGLE_CONTEXT_KEY ];
      return <button onClick={toggle}>{on ? 'ON' : 'OFF'}</button>;
    }
    const EnhancedCustomSwitch = withToggle(CustomSwitch);

    // PROPS NAMESPACE CLASH
    // https://egghead.io/lessons/react-handle-prop-namespace-clashes-with-higher-order-components
    // This will crash when embellished with the context because it uses a custom "on" prop that
    // overrides the context on.
    const MyEventComponent = (props) => {
      const { event, on } = props;
      const toggleProps = props[ TOGGLE_CONTEXT_KEY ];

      const buttonProps = { [ event ]: on };

      return toggleProps.on ? <button {...buttonProps}>The {event} event.</button> : null;
    };

    const EnhancedMyEventComponent = withToggle(MyEventComponent);

    const MySwitchClassMessage = (props) => {
      const { [ TOGGLE_CONTEXT_KEY ]: { on } } = props;
      return on ? 'Warning: the button is toggled on' : 'Warning: the button is toggled off';
    };

    MySwitchClassMessage.displayName = 'MySwitchClass.Message';

    class MySwitchClass extends Component {

      static ToggleMessage = withToggle(MySwitchClassMessage);

      render() {
        const { on, toggle } = this.props[ TOGGLE_CONTEXT_KEY ];
        return <button onClick={toggle}>{on ? 'ON' : 'OFF'}</button>;
      }
    }


    const EnhancedMySwitchClass = withToggle(MySwitchClass);

    return (
      <article>
        <h2>Toggle HoC</h2>
        <p>Enhanced by using withToggle HoC to connect it to the context.</p>
        <ToggleWithContext>
          <ToggleWithContext.Off>Off</ToggleWithContext.Off>
          <ToggleWithContext.On>On</ToggleWithContext.On>
          <ToggleWithContext.Switch/>
          <EnhancedCustomSwitch/>
          <EnhancedMyEventComponent event="onClick" on={(evt) => console.log(evt.type)}/>
          <EnhancedMySwitchClass/>
          <EnhancedMySwitchClass.ToggleMessage/>
        </ToggleWithContext>
      </article>
    )
  }

  _renderToggleRenderProps = () => <ToggleRenderProps />

  _renderHeader = () => {
    const { showSimpleToggle, showToggleRenderProps, showToggleWithContext, showToggleHOC } = this.state;

    return (
      <div className="header">
        <div>
          <input type="checkbox" onChange={this._handleSimpleToggleOnChange} checked={showSimpleToggle}/>Show simple
          Toggle
        </div>
        <div>
          <input type="checkbox" onChange={this._handleToggleWithContextOnChange} checked={showToggleWithContext}/>
          Show Toggle with Context
        </div>
        <div>
          <input type="checkbox" onChange={this._handleToggleHOCOnChange} checked={showToggleHOC}/>
          Show Toggle using HoC
        </div>
        <div>
          <input type="checkbox" onChange={this._handleToggleRenderPropsOnChange} checked={showToggleRenderProps}/>
          Show Toggle using Render Props
        </div>
      </div>
    )
  }

  render() {
    const { showSimpleToggle, showToggleWithContext, showToggleHOC, showToggleRenderProps } = this.state;

    return (
      <section className="container">
        {this._renderHeader()}
        {showSimpleToggle && this._renderToggle()}
        {showToggleWithContext && this._renderToggleWithContext()}
        {showToggleHOC && this._renderToggleHOC()}
        {showToggleRenderProps && this._renderToggleRenderProps()}
      </section>
    )
  }
}

render(<App/>, document.getElementById('root'));

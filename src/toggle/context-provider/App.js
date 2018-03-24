import React from 'react';
import Toggle from './Toggle';

// IMPLEMENT A REACT CONTEXT-PROVIDER
// https://egghead.io/lessons/react-implement-a-react-context-provider

const Content = ({ toggle }) => (
  <main>
    <h1>This is the main content</h1>
    <p>The switch is {toggle.on ? 'on' : 'off'}</p>
  </main>
);

const Footer = ({ toggle }) => {
  return (
    <footer>
      <h6>Footer, here as well the value is {toggle.on ? 'on' : 'off'}</h6>
      <button onClick={toggle.toggle}>Toggle</button>
    </footer>
  )
};

const Header = ({ toggle }) => (
  <header>
    <p>Toggle should come in the context, here is {toggle.on ? 'on' : 'off'} too.</p>
  </header>
);

// Instead of doing all this prop passing,
// we use the ToggleProvider which in turn
// uses Context API to provide the toggle state.
const App = () => (
  <Toggle
    render={(toggle) => (
      <section>
        <Header toggle={toggle}/>
        <Content toggle={toggle}/>
        <Footer toggle={toggle}/>
      </section>
    )}
  />
);

export default App;
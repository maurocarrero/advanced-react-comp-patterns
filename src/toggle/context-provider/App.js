import React from 'react';
import ToggleProvider from './ToggleProvider';
import ConnectedToggle from './ConnectedToggle';

// IMPLEMENT A REACT CONTEXT-PROVIDER
// https://egghead.io/lessons/react-implement-a-react-context-provider

const Content = () => {
  return (
    <section>
      <Header />
      <main>
        <h1>This is the main content</h1>
        <ConnectedToggle render={(toggle) => <p>The switch is {toggle.on ? 'on' : 'off'}</p>}/>
        <div>
          <p>
            Instead of doing all the prop passings to the children, we use the ToggleProvider which in
            turn uses Context API to provide the toggle state:
            We have 2 components:
          </p>
          <ol>
            <li><strong>ToggleProvider</strong>: takes the children and the rest of the props and
              return a renderer <strong>ToggleProvider.Renderer</strong> that is a component that
              adds the toggle object as its context and renders the children.
            </li>
            <li><strong>ConnectedToggle</strong>: is a functional component that takes the props and the
              context and returns the execution of the render methods passing the context as its argument,
              this way the rendered elements receive the toggle object from the context.
            </li>
          </ol>
        </div>
      </main>
      <Footer />
    </section>
  )
};

const Footer = () => {
  return (
    <footer>
      <ConnectedToggle render={(toggle) => (
        <div>
          <h6>Footer, here as well the value is {toggle.on ? 'on' : 'off'}</h6>
          <button onClick={toggle.toggle}>Toggle</button>
        </div>
      )}/>
    </footer>
  )
};

const Header = () => (
  <header>
    <ConnectedToggle render={(toggle) =>
      <p>Toggle should come in the context, here is {toggle.on ? 'on' : 'off'} too.</p>
    }/>
  </header>
);

// Instead of doing all this prop passing,
// we use the ToggleProvider which in turn
// uses Context API to provide the toggle state.
const App = () => (
  <ToggleProvider>
    <Content/>
    <ConnectedToggle render={(toggle) =>
      <button onClick={toggle.toggle}>Toggle</button>}
    />
  </ToggleProvider>
);

export default App;
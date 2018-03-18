import React, { Fragment } from 'react';
import ToggleRenderProps from './ToggleRenderProps';
import Switch from '../Switch';

// https://egghead.io/lessons/react-use-prop-getters-with-render-props

const Main = () => {
  const render = ({ on, togglerProps }) => (
    <Fragment>
      <Switch on={on} {...togglerProps}/>
      <button
        onClick={(evt) => {
          // We implement our click
          console.log('CLICKED!');
          // and call the onClick from the togglerProps
          // A way of fixing the problem of overwriting onClick function,
          // the problem now is that we must expose implementation details,
          // if onClick changes to onKeyDown we must change accordingly,
          // it is a leak abstraction.
          togglerProps.onClick(evt);
        }}>
        {on ? 'Turn OFF' : 'Turn ON'}
      </button>
    </Fragment>
  );

  return (
    <article>
      <h2>Toggle using Render Props pattern</h2>
      <ToggleRenderProps render={render}/>
    </article>
  )
};

export default Main;

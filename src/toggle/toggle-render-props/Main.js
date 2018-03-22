import React, { Fragment } from 'react';
import ToggleRenderProps from './ToggleRenderProps';
import Switch from '../Switch';

const Main = () => {
  const render = ({ on, getTogglerProps }) => (
    <Fragment>
      <Switch on={on} {...getTogglerProps()}/>
      <hr/>
      <input type="text" {...getTogglerProps({
        onClick: (evt) => evt.target.style.backgroundColor = on ? 'red' : 'lightgreen',
        onChange: () => console.log('onChange'),
        onBlur: () => console.log('onBlur')
      })}/>
      {/*// PROP GETTERS WITH RENDER PROPS*/}
      {/*// https://egghead.io/lessons/react-use-prop-getters-with-render-props*/}
      <button {...getTogglerProps({
        onClick: () => console.log('onClick'),
        onChange: () => console.log('onChange')
      })}>{on ? 'Turn OFF' : 'Turn ON'}</button>
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

import React, { Fragment } from 'react';
import ToggleRenderProps from './ToggleRenderProps';
import Switch from '../Switch';

const Main = () => {
  return (
    <article>
      <h2>Toggle using Render Props pattern</h2>
      <ToggleRenderProps
        defaultOn={true}
        onToggle={() => console.log('onToggle')}
        onReset={() => console.log('onReset')}
        render={({ on, getTogglerProps, reset }) => (
          <Fragment>
            <Switch
              on={on}
              {...getTogglerProps()}
            />
            <button onClick={reset}>Reset</button>
          </Fragment>
        )}
      />
    </article>
  )
};

export default Main;

import React from 'react';
import PropTypes from 'prop-types';
import hoistNonReactStatics from 'hoist-non-react-statics';

// 1. define the toggle component context key that will be shared among all children.
export const TOGGLE_CONTEXT_KEY = '__toggle__';

const withToggle = (Component) => {
  class EnhancedComponent extends React.Component {
    static displayName = `withToggle(${Component.displayName || Component.name})`;  // To be shown correctly in Dev Tools.
    static WrappedComponent = Component;                                            // To ease unit testing, Storybook, etc.

    // 2. define the type of our context prop
    static contextTypes = {
      [TOGGLE_CONTEXT_KEY]: PropTypes.object.isRequired
    };

    render() {
      // get the context we need and own props
      const toggleContext = this.context[ TOGGLE_CONTEXT_KEY ];

      // PROPS NAMESPACE CLASH
      // Any context value will be overridden by another value with the same key in this.props if we do this:
      // return <Component {...toggleContext} {...props} />;

      // Instead we use the toggle context key to minimize this eventual clash.
      // If we have TOGGLE_CONTEXT_KEY in this.props this will obviously fail, but the possibilities are highly reduced.
      const props = {
        [TOGGLE_CONTEXT_KEY]: toggleContext,
        ...this.props
      };

      // return the Component embellished with context and props
      return <Component {...props} />;
    }
  }
  return hoistNonReactStatics(EnhancedComponent, Component); // so we move statics from Component into the enhanced one
}

export default withToggle;
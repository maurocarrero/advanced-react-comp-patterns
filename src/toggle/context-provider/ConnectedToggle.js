import PropTypes from 'prop-types';
import ToggleProvider from './ToggleProvider';

const ConnectedToggle = (props, context) =>
  props.render(context[ToggleProvider.contextName]);

ConnectedToggle.contextTypes = {
  [ToggleProvider.contextName]: PropTypes.object.isRequired
}

export default ConnectedToggle;

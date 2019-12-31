import PropTypes from 'prop-types';

const playerShape = PropTypes.shape({
  id: PropTypes.string,
  imageUrl: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  uid: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired,
});

export default { playerShape };

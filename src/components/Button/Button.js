import PropTypes from 'prop-types';
import s from './Button.module.css';

export default function Button({ children, onClick }) {
  return (
    <button className={s.Button} type="button" onClick={onClick}>
      {children}
    </button>
  );
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};

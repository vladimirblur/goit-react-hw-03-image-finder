import { Component } from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.getElementById('root-modal');

export default class Modal extends Component {
  componentDidMount() {
    const overlay = document.querySelector('.Overlay');
    window.addEventListener('keydown', this.handleKeydown);

    overlay.addEventListener('click', this.handleClickOverlay);
  }

  componentWillUnmount() {
    const overlay = document.querySelector('.Overlay');
    window.removeEventListener('keydown', this.handleKeydown);

    overlay.removeEventListener('click', this.handleClickOverlay);
  }

  handleKeydown = e => {
    if (e.code === 'Escape') {
      this.props.onCloseModal();
    }
  };

  handleClickOverlay = () => {
    this.props.onCloseModal();
  };

  render() {
    return createPortal(
      <div className="Overlay">
        <div className="Modal">
          <img src={this.props.imgSrc} alt="" />
        </div>
      </div>,
      modalRoot,
    );
  }
}

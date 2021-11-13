import { Component } from 'react';
import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import ImageGalleryItem from './components/ImageGalleryItem';
import Button from './components/Button';
import ImageApi from './services/ImageApi';
import Loader from 'react-loader-spinner';
import scrollTo from './services/scrollToNextPage';
import Modal from './components/Modal';

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

import './App.css';

const imageApiServise = new ImageApi();

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

class App extends Component {
  state = {
    searchQuery: '',
    images: [],
    status: Status.IDLE,
    currentPage: 1,
    showModal: false,
    currentImage: '',
  };

  componentDidUpdate(prevProps, prevState) {
    const { searchQuery, currentPage } = this.state;
    const prevImages = prevState.searchQuery;
    const nextImages = searchQuery;

    if (prevImages !== nextImages || prevState.currentPage !== currentPage) {
      this.setState({ status: Status.PENDING });

      imageApiServise
        .fetchImages(nextImages, currentPage)
        .then(images => {
          if (currentPage > 1) {
            this.setState(prevState => ({
              images: [...prevState.images, ...images],
              status: Status.RESOLVED,
            }));
            scrollTo();
            return;
          }
          this.setState({ images, status: Status.RESOLVED });
        })
        .catch(error => {
          this.setState({ status: Status.REJECTED });
          console.error(error.message);
        });
    }
  }

  handleSearchSubmit = searchQuery => {
    this.setState({ searchQuery });
  };

  handleNextPage = () => {
    this.setState(prevState => ({ currentPage: prevState.currentPage + 1 }));
  };

  handleClickImage = e => {
    const currentImage = e.target.dataset.modal;

    this.setState({
      currentImage,
    });

    this.handleModalOpen();
  };

  handleModalOpen = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { images, status, currentImage } = this.state;
    return (
      <div className="App">
        <Searchbar onSubmit={this.handleSearchSubmit} />
        <ImageGallery>
          {status === 'resolved' && (
            <ImageGalleryItem images={images} onClick={this.handleClickImage} />
          )}
        </ImageGallery>
        <Loader
          type="Bars"
          color="#00BFFF"
          height={80}
          width={80}
          visible={status === 'pending'}
        />
        {images.length > 0 && (
          <Button onClick={this.handleNextPage}>Load more</Button>
        )}
        {this.state.showModal && (
          <Modal onCloseModal={this.handleModalOpen} imgSrc={currentImage} />
        )}
      </div>
    );
  }
}

export default App;

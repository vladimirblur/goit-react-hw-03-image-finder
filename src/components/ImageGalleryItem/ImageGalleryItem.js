import s from './ImageGalleryItem.module.css';

export default function ImageGalleryItem({ images, onClick }) {
  return images.map(({ id, webformatURL, largeImageURL, tags: photoAlt }) => (
    <li key={id} className={s.ImageGalleryItem}>
      <img
        className={s.ImageGalleryItemImage}
        src={webformatURL}
        alt={photoAlt}
        data-modal={largeImageURL}
        onClick={onClick}
      />
    </li>
  ));
}

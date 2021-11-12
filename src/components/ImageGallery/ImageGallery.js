import s from './ImageGallery.module.css';

export default function ImageGallery({ children }) {
  return <ul className={s.ImageGallery}>{children}</ul>;
}

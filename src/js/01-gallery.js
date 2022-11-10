import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line

console.log(galleryItems);
const gallery = document.querySelector('.gallery');

const markup = galleryItems
  .map(
    item =>
      `<a class="gallery__item" href=${item.original}><img class="gallery__image" src=${item.preview} alt=${item.description}/></a>`
  )
  .join('');
gallery.innerHTML = markup;
let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

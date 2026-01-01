// У файлі render-functions.js створи екземпляр SimpleLightbox для роботи з модальним вікном та зберігай функції для відображення елементів інтерфейсу:

// Підключення бібліотеки SimpleLightbox :
// Описаний у документації
import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';

// ==================================================================
// Створюємо нову галерею за допомогою бібліотеки SimpleLightbox
// ------------------------------------------------------------------
export let gallery = new SimpleLightbox('.gallery a', {
  captions: true,
  captionSelector: 'img',
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
  overlayOpacity: 0.6,
  widthRatio: 0.85,
  disableRightClick: true,
});
// ==================================================================

// ==================================================================
// createGallery(images).
// Ця функція повинна приймати масив images, створювати HTML-розмітку для галереї, додавати її в контейнер галереї та викликати метод екземпляра SimpleLightbox refresh().
// Нічого не повертає.
// ------------------------------------------------------------------
// Елемент галереї (список однотипних елементів <ul class=”gallery”>) уже має бути в HTML-документі.
// Після виконання HTTP-запитів у нього потрібно додавати розмітку карток зображень.

// Кожне зображення описується об'єктом, з якого тебе цікавлять лише такі властивості:

// webformatURL — посилання на маленьке зображення для списку карток у галереї
// largeImageURL — посилання на велике зображення для модального вікна
// tags — рядок з описом зображення. Підійде для атрибута alt
// likes — кількість вподобайок
// views — кількість переглядів
// comments — кількість коментарів
// downloads — кількість завантажень
// ------------------------------------------------------------------
export function createGallery(images) {
  const markup = images
    .map(image => {
      return `
        <li class="gallery-item">
          <a href="${image.largeImageURL}" class="gallery-link">
            <img
              src="${image.webformatURL}"
              alt="${image.tags}"
              class="gallery-image"
            />
            <div class="image-info">
              <div class="info">
                <p class="info-label">Likes</p>
                <p class="info-count">${image.likes}</p>
              </div>
              <div class="info">
                <p class="info-label">Views</p>
                <p class="info-count">${image.views}</p>
              </div>
              <div class="info">
                <p class="info-label">Comments</p>
                <p class="info-count">${image.comments}</p>
              </div>
              <div class="info">
                <p class="info-label">Downloads</p>
                <p class="info-count">${image.downloads}</p>
              </div>
            </div>
          </a>
        </li>`;
    })
    .join('');

  // Посилання на весь список галереї
  const galleryEl = document.querySelector('.gallery');

  // Додаємо картинки в список в DOM
  galleryEl.insertAdjacentHTML('beforeend', markup);
}
// ==================================================================

// ==================================================================
// clearGallery().
// Ця функція нічого не приймає та повинна очищати вміст контейнера галереї.
// Нічого не повертає.
// ------------------------------------------------------------------
export function clearGallery() {
  // Посилання на весь список галереї
  const galleryEl = document.querySelector('.gallery');
  // Очистка вмісту списку галереї
  galleryEl.innerHTML = '';
}
// ==================================================================

// ==================================================================
// showLoader().
// Ця функція нічого не приймає, повинна додавати клас для відображення лоадера.
// Нічого не повертає.
// ------------------------------------------------------------------
export function showLoader() {
  // Посилання на лоадер (точніше на обгортку лоадера)
  const loaderEl = document.querySelector('.loader-thumb');
  // Додаємо класс видимості лоадера
  loaderEl.classList.add('visible');
}
// ==================================================================

// ==================================================================
// hideLoader().
// Ця функція нічого не приймає, повинна прибирати клас для відображення лоадера.
// Нічого не повертає.
// ------------------------------------------------------------------
export function hideLoader() {
  // Посилання на лоадер (точніше на обгортку лоадера)
  const loaderEl = document.querySelector('.loader-thumb');
  // Прибираємо класс видимості лоадера
  loaderEl.classList.remove('visible');
}
// ==================================================================

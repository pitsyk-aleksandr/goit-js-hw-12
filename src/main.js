// У файлі main.js напиши всю логіку роботи додатка.
// Виклики нотифікацій iziToast, усі перевірки на довжину масиву в отриманій відповіді робимо саме в цьому файлі.
// Імпортуй в нього функції із файлів pixabay-api.js та render-functions.js та викликай їх у відповідний момент.

// Підключення бібліотеки iziToast :
// Імпорт, описаний в документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

// Об'єкт посилань сторінки :
const refs = {
  form: document.querySelector('.form'),
  btnSearch: document.querySelector('.btn-search'),
  inputSearch: document.querySelector('.input-search'),
  listImages: document.querySelector('.gallery'),
};

// Іменований імпорт значення та функцій
import {
  gallery,
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
} from './js/render-functions';

// Дефолтний імпорт функції
import getImagesByQuery from './js/pixabay-api';

// Слухач події submit форми
refs.form.addEventListener('submit', onFormSubmit);

// Обробник події submit форми
function onFormSubmit(event) {
  // Обнулення події за замовчуванням
  event.preventDefault();

  // Значення поля для пошуку (+ прибираємо пробіли)
  const textSearch = refs.inputSearch.value.trim();
  // Та оновлюємо значення поля для пошуку (без пробілів)
  refs.inputSearch.value = textSearch;

  // Якщо поле для вводу пусте або були тільки пробіли
  if (textSearch === '') {
    // Опції вікна сповіщення
    const iziToastSetting = {
      timeout: 3000,
      closeOnEscape: true,
      position: 'topRight',
      backgroundColor: '#EF4040',
      progressBarColor: '#B51B1B',
      iconUrl: './img/error.svg',
      iconColor: '#ffffff',
      title: 'ERROR ',
      titleColor: '#ffffff',
      titleSize: '16',
      message: 'Enter the image type',
      messageColor: '#ffffff',
      messageSize: '16',
    };
    // Показуємо вікно сповіщення - з помилкою
    iziToast.show(iziToastSetting);
    // Вихід
    return;
  }

  // Очистка всієї галереї в DOM
  clearGallery();

  // Показуємо лоадер
  showLoader();

  // Виклик функції запиту та обробка отриманих даних
  getImagesByQuery(textSearch)
    .then(data => {
      // Повернення з даних властивості hits - масиву з картинками
      return data.hits;
    })
    .then(images => {
      // Прибираємо лоадер
      hideLoader();
      // Якщо запит не дав результатів (масив з відповідями пустий)
      if (images.length === 0) {
        // Опції вікна сповіщення
        const iziToastSetting = {
          timeout: 3000,
          closeOnEscape: true,
          position: 'topRight',
          backgroundColor: '#EF4040',
          progressBarColor: '#B51B1B',
          iconUrl: './img/error.svg',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          messageColor: '#ffffff',
          messageSize: '16',
          messageLineHeight: '24',
          maxWidth: '432',
        };
        // Показуємо вікно сповіщення - з помилкою
        iziToast.show(iziToastSetting);
        // Вихід з пошуку
        return;
      }

      // Якщо запит дав результати :

      // Створюємо галерею в DOM
      createGallery(images);

      // Оновлюємо галерею SimpleLightbox
      gallery.refresh();
    })
    .catch(error => {
      // console.log(error);

      // Прибираємо лоадер
      hideLoader();

      // Опції вікна сповіщення
      const iziToastSetting = {
        timeout: 3000,
        closeOnEscape: true,
        position: 'topRight',
        backgroundColor: '#EF4040',
        progressBarColor: '#B51B1B',
        iconUrl: './img/error.svg',
        message: 'Sorry, error accessing resource',
        messageColor: '#ffffff',
        messageSize: '16',
        messageLineHeight: '24',
        maxWidth: '432',
      };
      // Показуємо вікно сповіщення - з помилкою
      iziToast.show(iziToastSetting);
      // Вихід з пошуку
      return;
    });

  // Перезавантаження форми та ощищення значень полів форми
  refs.form.reset();
}

// У файлі main.js напиши всю логіку роботи додатка.
// Виклики нотифікацій iziToast, усі перевірки на довжину масиву в отриманій відповіді робимо саме в цьому файлі.
// Імпортуй в нього функції із файлів pixabay-api.js та render-functions.js та викликай їх у відповідний момент.

// ==================================================================
// Глобальні змінні
// ------------------------------------------------------------------
// Значення поля для пошуку
let textSearch = '';
// Загальна кількість картинок у пошуку
let hitsCount = 0;
// Номер поточної сторінки
let pageCurrent = 0;
// Кількість сторінок
let pageCount = 0;
// Кількість картинок на сторінці
let hitsOnPage = 15;
// Опції вікна сповіщення
const iziToastSetting = {
  timeout: 3000,
  closeOnEscape: true,
  position: 'topRight',
  backgroundColor: '#EF4040',
  progressBarColor: '#B51B1B',
  // iconUrl: './img/error.svg',
  titleColor: '#ffffff',
  titleSize: '16',
  messageColor: '#ffffff',
  messageSize: '16',
  maxWidth: '432',
};
// ==================================================================

// ===================================================================
// Підключення бібліотеки iziToast
// -------------------------------------------------------------------
// Імпорт, описаний в документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

// ===================================================================
// Об'єкт посилань сторінки :
// -------------------------------------------------------------------
const refs = {
  form: document.querySelector('.form'),
  inputSearch: document.querySelector('.input-search'),
  btnSearch: document.querySelector('.btn-search'),
  btnLoadMore: document.querySelector('.btn-loadmore'),
  listImages: document.querySelector('.gallery'),
};

// ===================================================================
// Іменований імпорт значення та функцій
// -------------------------------------------------------------------
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions';

// ===================================================================
// Дефолтний імпорт функції
// -------------------------------------------------------------------
import getImagesByQuery from './js/pixabay-api';

// ===================================================================
// Слухач події submit форми - кнопка < Search >
// -------------------------------------------------------------------
refs.form.addEventListener('submit', onFormSubmit);

// ===================================================================
// Слухач події submit форми - кнопка < Load More >
// -------------------------------------------------------------------
refs.btnLoadMore.addEventListener('click', onbtnLoadMore);

// ===================================================================
// Обробник події submit форми
// -------------------------------------------------------------------
function onFormSubmit(event) {
  // Обнулення події за замовчуванням
  event.preventDefault();

  // Значення поля для пошуку (+ прибираємо пробіли)
  textSearch = refs.inputSearch.value.trim();
  // Та оновлюємо значення поля для пошуку (без пробілів)
  refs.inputSearch.value = textSearch;

  // Якщо поле для вводу пусте або були тільки пробіли
  if (textSearch === '') {
    // Опції вікна сповіщення - зміна назв
    iziToastSetting.title = 'ERROR ';
    iziToastSetting.message = 'Enter the image type';

    // Показуємо вікно сповіщення - з помилкою
    iziToast.show(iziToastSetting);
    // Вихід
    return;
  }

  // Очистка всієї галереї в DOM
  clearGallery();

  // Прибираємо кнопку < Load More >
  hideLoadMoreButton();

  // Показуємо лоадер
  showLoader();

  // Виклик функції запиту та обробка отриманих даних
  // Запит проводимо для першої сторінки
  pageCurrent = 1;

  // Виклик функції запиту - getImagesByQuery(query, page)
  getImagesByQuery(textSearch, pageCurrent)
    .then(data => {
      // Текст запиту - в консоль
      // console.log(`Текст запиту`, textSearch);
      // Властивість totalHits — загальна кількість зображень, які відповідають критерію пошуку
      hitsCount = data.totalHits;
      // console.log(`Загальна кількість картинок`, hitsCount);
      // Кількість сторінок :
      pageCount = Math.ceil(hitsCount / hitsOnPage);
      // console.log(`Кількість сторінок`, pageCount);
      // Повернення з даних властивості hits - масиву з картинками
      return data.hits;
    })
    .then(images => {
      // Прибираємо лоадер
      hideLoader();
      // Якщо запит не дав результатів (масив з відповідями пустий)
      if (images.length === 0) {
        // Опції вікна сповіщення - зміна назв
        iziToastSetting.title = '';
        iziToastSetting.message =
          'Sorry, there are no images matching your search query. Please try again!';
        // Показуємо вікно сповіщення - з помилкою
        iziToast.show(iziToastSetting);
        // Вихід
        return;
      }

      // Якщо запит дав результати :

      // Поточна сторінка - в консоль
      // console.log(`Поточна сторінка`, pageCurrent);

      // Створюємо галерею в DOM
      createGallery(images);

      // Якщо кількість сторінок більше 1, то показуємо кнопку < Load More >
      if (pageCount > 1) {
        showLoadMoreButton();
      } else {
        // Показати сповіщення, що дійшли до кінця колекції
        iziToastEndCollection();
      }
    })
    .catch(error => {
      // Прибираємо лоадер
      hideLoader();
      // Опції вікна сповіщення - зміна назв
      iziToastSetting.title = '';
      iziToastSetting.message = 'Sorry, error accessing resource';
      // Показуємо вікно сповіщення - з помилкою
      iziToast.show(iziToastSetting);
      // Вихід
      return;
    });

  // Перезавантаження форми та ощищення значень полів форми
  refs.form.reset();
}

// ===================================================================
// Обробник події  click  на кнопці < Load More >
// -------------------------------------------------------------------
function onbtnLoadMore(event) {
  // Прибираємо кнопку < Load More >
  hideLoadMoreButton();

  // Показуємо лоадер
  showLoader();

  // Виклик функції запиту та обробка отриманих даних
  // Запит проводимо для наступної сторінки
  pageCurrent = pageCurrent + 1;

  // Виклик функції запиту - getImagesByQuery(query, page)
  getImagesByQuery(textSearch, pageCurrent)
    .then(data => {
      // Повернення з даних властивості hits - масиву з картинками
      return data.hits;
    })
    .then(images => {
      // Прибираємо лоадер
      hideLoader();
      // Поточна сторінка - в консоль
      // console.log(`Поточна сторінка`, pageCurrent);
      // Додаємо картинки в галерею в DOM
      createGallery(images);
      // Якщо це НЕ остання сторінка, то показуємо кнопку < Load More >
      if (pageCurrent < pageCount) {
        showLoadMoreButton();
      } else {
        // Показати сповіщення, що дійшли до кінця колекції
        iziToastEndCollection();
      }

      // Прокрутка на 2 висоти картки :
      // Отримуємо висоту картки :
      const cardEl = document.querySelector('.gallery-item');
      const heightCard = Number(cardEl.getBoundingClientRect().height);
      // Робимо скролл екрану, вказуючи тільки кооррдинати по Y
      // scrollBy(xCoord, yCoord);
      scrollBy(0, heightCard * 2);
    })
    .catch(error => {
      // Прибираємо лоадер
      hideLoader();
      // Опції вікна сповіщення - зміна назв
      iziToastSetting.title = '';
      iziToastSetting.message = 'Sorry, error accessing resource';
      // Показуємо вікно сповіщення - з помилкою
      iziToast.show(iziToastSetting);
      // Вихід
      return;
    });
}

function iziToastEndCollection() {
  // Опції вікна сповіщення - зміна назв
  // iziToastSetting.backgroundColor = '#5536edff';
  // iziToastSetting.progressBarColor = '#1d0a6fff';
  iziToastSetting.title = '';
  iziToastSetting.message = `We're sorry, but you've reached the end of search results.`;
  // Показуємо вікно сповіщення
  iziToast.show(iziToastSetting);
}

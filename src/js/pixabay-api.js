// У файлі pixabay-api.js зберігай функції для виконання HTTP-запитів:

import axios from 'axios';

// ==================================================================
// getImagesByQuery(query, page).
// Функція приймає два параметри :
//     query (пошукове слово, яке є рядком)
//     page (номер сторінки, яка є числом),
// здійснює HTTP-запит і повертати значення властивості data з отриманої відповіді.
// ==================================================================

export default async function getImagesByQuery(query, page) {
  // Параметри запиту
  // Унікальний ключ доступу до API
  const keyApi = '53949044-97be2f3ebdad7466ae66aa0c3';
  const paramsQuery = {
    params: {
      key: keyApi,
      q: query,
      order: 'latest',
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: page,
      per_page: 15,
    },
  };

  // Робимо запит GET в API та записуємо відповідь у змінну
  const response = await axios.get('https://pixabay.com/api/', paramsQuery);

  // Повертаємо значення властивості  data  з отриманої відповіді
  return response.data;
}

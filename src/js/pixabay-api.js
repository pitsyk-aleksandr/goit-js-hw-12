// У файлі pixabay-api.js зберігай функції для виконання HTTP-запитів:

import axios from 'axios';

// ==================================================================
// getImagesByQuery(query).
// функція приймає один параметр query(пошукове слово, яке є рядком),
// здійснювати HTTP - запит
// і повертати значення властивості data з отриманої відповіді.
// ==================================================================

export default function getImagesByQuery(query) {
  // Параметри запиту
  // Унікальний ключ доступу до API
  const keyApi = '53949044-97be2f3ebdad7466ae66aa0c3';
  const paramsQuery = {
    params: {
      key: keyApi,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: 1,
      per_page: 100,
    },
  };
  // Робимо запит GET в API
  return axios.get('https://pixabay.com/api/', paramsQuery).then(response => {
    // Повертаємо значення властивості data з отриманої відповіді
    return response.data;
  });
  // .catch(error => {
  //   console.log(error);
  // });
}

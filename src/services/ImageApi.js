const BASE_URL = 'https://pixabay.com/api/';

export default class ImageApi {
  fetchImages(query, page) {
    const searchParams = new URLSearchParams({
      key: '23521468-535c53472c6d56fb98e2bf6f2',
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      page: page,
      per_page: 15,
    });
    const url = `${BASE_URL}?${searchParams}`;

    return fetch(url).then(response => {
      if (response.ok) {
        return response.json().then(data =>
          data.hits.map(({ id, webformatURL, largeImageURL, tags }) => ({
            id,
            webformatURL,
            largeImageURL,
            tags,
          })),
        );
      }

      return Promise.reject(new Error(`No images with name ${query}`));
    });
  }
}

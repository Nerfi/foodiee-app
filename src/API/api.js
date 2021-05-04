export const apiHelper = (url) => {
 return fetch(url).then(response => response.json());
}

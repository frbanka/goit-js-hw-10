const countryDataFields = `name,capital,population,flags,languages`;
export function fetchCountries(name) {
  return fetch(
    `https://restcountries.com/v2/name/${name}?fields=${countryDataFields}`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

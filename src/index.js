import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix, { Notify } from 'notiflix';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;
const input = document.querySelector(`input#search-box`);
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');
const body = document.querySelector(`body`);

countryList.setAttribute(
  'style',
  'display:flex;flex-direction:column;padding-left:5px;list-style:none'
);
body.setAttribute('style', 'background-color:lightblue');
input.addEventListener('input', debounce(countrySearch, DEBOUNCE_DELAY));

function countrySearch() {
  const countryName = input.value.trim();

  if (!countryName) {
    countryList.innerHTML = ``;
    countryInfo.innerHTML = ``;
    return;
  }

  fetchCountries(countryName)
    .then(showCountryInfo)
    .catch(() => {
      countryList.innerHTML = ``;
      countryInfo.innerHTML = ``;
      Notify.failure('Oops, there is no country with that name');
    });
}
function showCountryInfo(countries) {
  if (countries.length === 1) {
    countryList.innerHTML = ``;
    const fetchedData = countries
      .map(country => {
        return `<p><img src="${country.flags.svg}" width="35px"></p>
        <p style="font-size: 28px"><b>${country.name}</b></p>
          <p><b>Capital: </b>${country.capital}</p>
          <p><b>Population: </b>${country.population}</p>
          <p><b>Languages: </b>${country.languages
            .map(lang => lang.name)
            .join(`, `)}</p>`;
      })
      .join('');
    countryInfo.innerHTML = fetchedData;
  }

  if (countries.length > 1) {
    countryInfo.innerHTML = ``;
    const fetchedData = countries
      .map(country => {
        return `<li style="list-style:none"><img src="${country.flags.svg}" width="30px"> ${country.name}</li>`;
      })
      .join('');
    countryList.innerHTML = fetchedData;
  }
  if (countries.length > 10) {
    countryList.innerHTML = ``;
    countryInfo.innerHTML = ``;
    Notiflix.info('Too many matches found. Please enter a more specific name.');
  }
}

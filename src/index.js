import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix, { Notify } from 'notiflix';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;
const input = document.querySelector('input#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

input.addEventListener('input', debounce(countrySearch, DEBOUNCE_DELAY));

function countrySearch() {
  const countryName = input.value.trim();

  fetchCountries(countryName)
    .then(showCountryInfo)
    .catch(() => {
      Notify.failure('Oops, there is no country with that name');
    });
}

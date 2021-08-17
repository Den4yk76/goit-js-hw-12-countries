// import './sass/main.scss';
import CountriesApiService from '../src/fetchCountries.js';
const debounse = require('lodash.debounce');

const refs = {
    inputEl: document.querySelector('.js-input'),
    listEl: document.querySelector('.js-countries'),
};

const countriesApiService = new CountriesApiService();

refs.inputEl.addEventListener('input', debounse(onInput, 1000));

function onInput(e) {
    refs.listEl.textContent = '';
    countriesApiService.fetchCountry(e).then(arrayIteration);
}

function arrayIteration(data) {
    for (let elem of data) {
        refs.listEl.insertAdjacentHTML('beforeend', `<li>${elem.name}</li>`);
    }
}

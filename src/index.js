import './sass/main.scss';
import CountriesApiService from '../src/fetchCountries.js';
import countryMarkup from './templates/country-template.hbs';
import {
    alert,
    notice,
    info,
    success,
    error,
    defaults,
} from '@pnotify/core/dist/PNotify.js';
import '@pnotify/core/dist/BrightTheme.css';

defaults.delay = 2500;
const countriesApiService = new CountriesApiService();

const debounse = require('lodash.debounce');
const refs = {
    inputEl: document.querySelector('.js-input'),
    listEl: document.querySelector('.js-countries'),
};

refs.inputEl.addEventListener('input', debounse(onInput, 1000));

function onInput(e) {
    if (countriesApiService.fetchCountry !== undefined) {
        refs.listEl.textContent = '';
        countriesApiService
            .fetchCountry(e)
            .then(arrayIteration)
            .catch(error => console.log('error index', error));
    } else {
        refs.listEl.textContent = '';
    }
}

function arrayIteration(data) {
    if (data !== undefined && data.length > 10) {
        error({
            text: 'Слишком много совпадений. Необходимо сделать запрос более специфичным',
        });
    } else if (data !== undefined && data.length >= 2 && data.length <= 10) {
        success({ text: 'Ляпс!)' });
        for (let elem of data) {
            refs.listEl.insertAdjacentHTML(
                'beforeend',
                `<li class="countries-list">${elem.name}</li>`,
            );
        }
    } else if (data !== undefined && data.length === 1) {
        success({ text: 'Диви шо тут!))' });
        for (let elem of data) {
            refs.listEl.insertAdjacentHTML('beforeend', countryMarkup(elem));
        }
    }
}

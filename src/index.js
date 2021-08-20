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
    if (countriesApiService.fetchCountry(e)) {
        refs.listEl.textContent = '';
        countriesApiService
            .fetchCountry(e)
            .then(data => {
                return data;
            })
            .then(arrayIteration)
            .catch(err =>
                err.status === 404
                    ? error({
                          text: `Возникла ошибка ${err.status}. Похоже такой записи не найдено`,
                      })
                    : error({
                          text: `Возникла непредвиденная ошибка. Попробуйте позже`,
                      }),
            );
    } else {
        return;
    }
}

function arrayIteration(data) {
    if (data.length > 10) {
        error({
            text: 'Слишком много совпадений. Необходимо сделать запрос более специфичным',
        });
    } else if (data.length >= 2 && data.length <= 10) {
        success({ text: 'Ляпс!)' });
        for (let elem of data) {
            refs.listEl.insertAdjacentHTML(
                'beforeend',
                `<li class="countries-list">${elem.name}</li>`,
            );
        }
    } else if (data.length === 1) {
        success({ text: 'Диви шо тут!))' });
        for (let elem of data) {
            refs.listEl.insertAdjacentHTML('beforeend', countryMarkup(elem));
        }
    }
}

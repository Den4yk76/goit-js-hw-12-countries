import './sass/main.scss';
import fetchCountries from '../src/fetchCountries.js';
import countryMarkup from './templates/country-template.hbs';
import countriesMarkup from './templates/countries-template.hbs';
import { success, error, defaults } from '@pnotify/core/dist/PNotify.js';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/confirm/dist/PNotifyConfirm.css';

defaults.delay = 2500;

const debounse = require('lodash.debounce');
const refs = {
    inputEl: document.querySelector('.js-input'),
    listEl: document.querySelector('.js-countries'),
};

refs.inputEl.addEventListener('input', debounse(onInput, 500));

function onInput(e) {
    if (e.target.value.trim('') === '') {
        refs.listEl.textContent = '';
        return;
    }

    refs.listEl.textContent = '';
    fetchCountries(e.target.value.trim(''))
        .then(response =>
            response.ok ? response.json() : Promise.reject(response),
        )
        .then(countries => {
            const countriesLength = countries.length;
            if (countriesLength === 1) {
                refs.listEl.innerHTML = countryMarkup(countries[0]);
                success({ text: `Страна, сэээээр` });
                return;
            }
            if (countriesLength > 1 && countriesLength <= 10) {
                refs.listEl.innerHTML = countriesMarkup(countries);
                success({ text: `Овсянка, сэээээр` });
                return;
            }
            error({
                text: 'Найдено слишком много стран, сэээр. Уточните поиск, сээээр',
            });
        })
        .catch(err => {
            if (err.status === 404) {
                error({
                    text: `Получена ошибка ${err.status}. Такая страна не найдена.`,
                });
            } else {
                error({
                    text: 'Произошла непредвиденная ошибка. Скорее всего проблема связи',
                });
            }
        });
}

import { error, defaults } from '@pnotify/core/dist/PNotify.js';
import '@pnotify/core/dist/BrightTheme.css';

defaults.delay = 2500;

export default class CountriesApiService {
    constructor() {}

    fetchCountry(e) {
        const val = e.target.value;

        if (val) {
            return fetch(`https://restcountries.eu/rest/v2/name/${val}`)
                .then(response =>
                    response.ok ? response.json() : Promise.reject(response),
                )
                .then(data => {
                    return data;
                })
                .catch(err =>
                    err.status === 404
                        ? error({
                              text: `Возникла ошибка ${err.status}. Похоже такой записи не найдено`,
                          })
                        : error({
                              text: `Возникла непредвиденная ошибка. Попробуйте позже`,
                          }),
                );
        } else return;
    }
}

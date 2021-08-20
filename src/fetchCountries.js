import { error, defaults } from '@pnotify/core/dist/PNotify.js';
import '@pnotify/core/dist/BrightTheme.css';

defaults.delay = 2500;

export default class CountriesApiService {
    constructor() {}

    fetchCountry(e) {
        const val = e.target.value;
        if (val) {
            return fetch(`https://restcountries.eu/rest/v2/name/${val}`)
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        return Promise.reject(response);
                    }
                })
                .catch(err => console.log(err));
        } else {
            return;
        }
    }
}

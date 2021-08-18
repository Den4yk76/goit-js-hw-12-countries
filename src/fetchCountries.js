export default class CountriesApiService {
    constructor() {}

    fetchCountry(e) {
        const val = e.target.value;

        if (val) {
            return fetch(`https://restcountries.eu/rest/v2/name/${val}`)
                .then(response => response.json())
                .then(data => {
                    return data;
                })
                .catch(error => console.log(error));
        } else return;
    }
}

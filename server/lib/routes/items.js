const router = require('express').Router();
const fetch = require('node-fetch');

const CH_API_URL = 'https://api.collection.cooperhewitt.org/rest/';
const CH_ACCESS_TOKEN = process.env.CH_ACCESS_TOKEN;

module.exports = router

    .get('/find', (req, res, next) => {
        const { color, page } = req.query;

        const searchUrl = `${CH_API_URL}?method=cooperhewitt.search.objects&access_token=${CH_ACCESS_TOKEN}&color=${color}&page=${page}&per_page=10`;

        fetch(searchUrl)
            .then(res => res.json())
            .then(({ objects, total }) => {
                const selected = objects.map(item => {
                    return { 
                        id: item.id,
                        title: item.title,
                        smallImageUrl: item.images[0].n.url,
                        largeImageUrl: item.images[0].z.url,
                        medium: item.medium,
                        description: item.description
                    };
                });
                res.send({ objects: selected, total });
            })
            .catch(next);
    });

// app.get('/search-location-weather', (req, res) => {
//     //build api URL with user zip
//     const baseUrl = 'http://api.openweathermap.org/data/2.5/weather?zip=';	
//     const apiId = '&appid=<YOUR API KEY GOES HERE>&units=imperial';

//     const userLocation = (url1, url2, zipcode) => {
//         let newUrl = url1 + zipcode + url2;
//         return newUrl;
//     };	

//     const apiUrl = userLocation(baseUrl, apiId, zipcode);

//     fetch(apiUrl)
//     .then(res => res.json())
//     .then(data => {
//         res.send({ data });
//     })
//     .catch(err => {
//         res.redirect('/error');
//     });

// })

//     const ACCESS_TOKEN = ''; /* <-- paste yours between the quotes */
// const BASE_QUERY = 'https://api.collection.cooperhewitt.org/rest/?method=cooperhewitt.';
// const COLLECTION_QUERY = `${BASE_QUERY}search.objects&access_token=${ACCESS_TOKEN}`;
// const OBJECT_QUERY = `${BASE_QUERY}objects.getInfo&access_token=${ACCESS_TOKEN}`;

// const throwJson = json => { throw json; };
// const get = url => fetch(url)
//   .then(r => r.ok ? r.json() : r.json().then(throwJson));

// export default function retrieve(color, page, perPage = 10) {
//   return get(`${COLLECTION_QUERY}&color=${color}&page=${page}&per_page=${perPage}`);
// }

// export function getItem(id) {
//   return get(`${OBJECT_QUERY}&object_id=${id}`);  
// }
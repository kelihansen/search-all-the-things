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
                    };
                });
                res.send({ items: selected, total });
            })
            .catch(next);
    })
    
    .get('/:id', (req, res, next) => {
        const { id } = req.params;

        const searchUrl = `${CH_API_URL}?method=cooperhewitt.objects.getInfo&access_token=${CH_ACCESS_TOKEN}&object_id=${id}`;

        fetch(searchUrl)
            .then(res => res.json())
            .then(({ object }) => {
                res.send({
                    title: object.title,
                    largeImageUrl: object.images[0].z.url,
                    medium: object.medium,
                    description: object.description
                });
            })
            .catch(next);
    });

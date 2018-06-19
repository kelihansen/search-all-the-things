const ACCESS_TOKEN = ''; /* <-- paste yours between the quotes */
const BASE_QUERY = 'https://api.collection.cooperhewitt.org/rest/?method=cooperhewitt.';
const COLLECTION_QUERY = `${BASE_QUERY}search.objects&access_token=${ACCESS_TOKEN}`;
const OBJECT_QUERY = `${BASE_QUERY}objects.getInfo&access_token=${ACCESS_TOKEN}`;

const throwJson = json => { throw json; };
const get = url => fetch(url)
  .then(r => r.ok ? r.json() : r.json().then(throwJson));

export default function retrieve(color, page, perPage = 10) {
  return get(`${COLLECTION_QUERY}&color=${color}&page=${page}&per_page=${perPage}`);
}

export function getItem(id) {
  return get(`${OBJECT_QUERY}&object_id=${id}`);  
}
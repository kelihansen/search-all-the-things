const ACCESS_TOKEN = ''; // <-- paste yours between the quotes
const BASE_QUERY = `https://api.collection.cooperhewitt.org/rest/?method=cooperhewitt.search.objects&access_token=${ACCESS_TOKEN}`;

const throwJson = json => { throw json; };
const get = url => fetch(url)
  .then(r => r.ok ? r.json() : r.json().then(throwJson));

export default function retrieve(color, page, perPage) {
  return get(`${BASE_QUERY}&color=${color}&page=${page}&per_page=${perPage}`);
}


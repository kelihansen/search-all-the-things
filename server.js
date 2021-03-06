require('dotenv').config();
const http = require('http');
const app = require('./lib/app');
const connect = require('./lib/util/connect');

const PORT = process.env.PORT || 3000;

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/cooper-hewitt';

connect(MONGODB_URI);

const server = http.createServer(app);

server.listen(PORT, () => {
    /* eslint-disable-next-line no-console */
    console.log('server running on', server.address().port);
});
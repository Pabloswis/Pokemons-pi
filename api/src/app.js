const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
//requiero el archivo de rutas del index
const pokemonRoutes = require('./routes/pokemonsRoutes.js');
const type = require('./routes/Type.js')
const origin = 'https://pokemons-pi-xi.vercel.app/' || 'http://localhost:3000'

require('./db.js');

const server = express();

server.name = 'API';

server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', origin ); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});


//aca tengo que traer cada ruta
//todo lo que llegue a /, va a usar lo que hay en index
server.use('/pokemons', pokemonRoutes);
server.use('/type',type)
//aca tendria que hacer la principal de /pokemons y /types

// Error catching endware.
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;

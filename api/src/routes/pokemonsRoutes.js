const bodyParser = require("body-parser");
const { Router } = require("express");
const axios = require("axios");
const { Pokemon, Type } = require("../db");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

// });

//[ ] GET /pokemons:
// Obtener un listado de los pokemons desde pokeapi.
// Debe devolver solo los datos necesarios para la ruta principal

router.get("/", async (req, res) => {
  const { createDb } = req.query;
  try {
    if (createDb) {
      const pokemonesDB = await Pokemon.findAll({
        include: {
          model: Type,
          attributes: ['nombre'],
          through:{
            attributes: []
          }
        },
      });
      console.log(pokemonesDB);
      res.send(pokemonesDB);
    } else {
      let primeraPromesa = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?limit=50&offset=0"
      );
      primeraPromesa = primeraPromesa.data.results?.map((pokemon) =>
        axios.get(pokemon.url)
      );
      const promesas = await Promise.all(primeraPromesa);

      const pokemonesListos = promesas.map((p) => {
        return {
          id: p.data.id,
          nombre: p.data.name,
          vida: p.data.stats[0].base_stat,
          ataque: p.data.stats[1].base_stat,
          defensa: p.data.stats[2].base_stat,
          velocidad: p.data.stats[5].base_stat,
          altura: p.data.height,
          peso: p.data.weight,
          tipo: p.data.types.map((t) => t.type.name),
          imagen: p.data.sprites.other.home.front_default,
        };
      });
      res.send(pokemonesListos);
    }
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

// GET /pokemons/{idPokemon}:
// Obtener el detalle de un pokemon en particular
// Debe traer solo los datos pedidos en la ruta de detalle de pokemon
// Tener en cuenta que tiene que funcionar tanto para un id de un pokemon existente en pokeapi o uno creado por ustedes

router.get("/:idPokemon", async (req, res) => {
  try {
    const { idPokemon } = req.params; // ==> 3

    if (idPokemon > 10) {
      const pokemon = await axios.get(
        "https://pokeapi.co/api/v2/pokemon/" + idPokemon
      );

      const pokemonListo = {
        id: pokemon.data.id,
        nombre: pokemon.data.name,
        vida: pokemon.data.stats[0].base_stat,
        ataque: pokemon.data.stats[1].base_stat,
        defensa: pokemon.data.stats[2].base_stat,
        velocidad: pokemon.data.stats[5].base_stat,
        altura: pokemon.data.height,
        peso: pokemon.data.weight,
        tipo: pokemon.data.types.map((t) => t.type.name),
        imagen: pokemon.data.sprites.other.home.front_default,
      };

      console.log(pokemonListo);
      res.status(201).json(pokemonListo);
    } else {
      //busco en la base de datos
      const pokemon = await Pokemon.findByPk(idPokemon);
      console.log(pokemon.tipo);

      pokemonListo = {
        id: pokemon.id,
        nombre: pokemon.nombre,
        vida: pokemon.vida,
        ataque: pokemon.ataque,
        defensa: pokemon.defensa,
        velocidad: pokemon.velocidad,
        altura: pokemon.altura,
        peso: pokemon.peso,
        tipo: "dame tiempo que busco",
        imagen: "no tiene imagen",
      };
      //corregir formato para que coincida con todos los get

      res.json(pokemonListo);
    }
  } catch (error) {
    res.status(400).json(error);
  }
});

// Recibe los datos recolectados desde el formulario controlado de la ruta de creación de pokemons por body
// Crea un pokemon en la base de datos relacionado con sus tipos.
router.post("/", async (req, res) => {
  const { id, nombre, vida, ataque, defensa, velocidad, imagen, tipo } =
    req.body;
  try {
    const newPokemon = await Pokemon.create({
      nombre,
      vida,
      ataque,
      defensa,
      velocidad,
      //vincular el tipo a la otra tabla
      tipo,
    });
    console.log(newPokemon.dataValues);

    res.status(201).json(newPokemon.dataValues);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

//conecto con el app
module.exports = router;

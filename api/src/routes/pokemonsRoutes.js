const bodyParser = require("body-parser");
const { Router } = require("express");
const axios = require("axios");
const { Pokemon, Type } = require("../db");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const getPokemonsApi = async () => {
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
  return pokemonesListos;
};

const getPokemonsDB = async () => {
  const pokemonesDB = await Pokemon.findAll({
    include: {
      model: Type,
      attributes: ["nombre"],
      through: {
        attributes: [],
      },
    },
  });
  return pokemonesDB;
};

const getAllPokemons = async () => {
  const pokemonsApi = await getPokemonsApi();
  const pokemonsDb = await getPokemonsDB();

  const allPokemons = pokemonsApi.concat(pokemonsDb);

  return allPokemons;
};

//[ ] GET /pokemons:
// Obtener un listado de los pokemons desde pokeapi.
// Debe devolver solo los datos necesarios para la ruta principal
// [ ] GET /pokemons?name="...":
// Obtener el pokemon que coincida exactamente con el nombre pasado como query parameter (Puede ser de pokeapi o creado por nosotros)
// Si no existe ningún pokemon mostrar un mensaje adecuado
router.get("/", async (req, res) => {
  try {
    const { nombre } = req.query;
    let allPokemons = await getAllPokemons();

    if (nombre) {
      let pokemonName = await allPokemons.filter((poke) =>
        poke.nombre.toLowerCase().includes(nombre.toLowerCase())
      );

      pokemonName.length
        ? res.status(200).send(pokemonName)
        : res.status(404).send("Pokemon no encontrado");
    } else {
      console.log(allPokemons);
      res.status(200).send(allPokemons);
    }
  } catch (error) {
    res.status(400).send(error);
  }

  // const { createDb } = req.query;
  // try {
  //   if (createDb) {
  //     const pokemonesDB = await Pokemon.findAll({
  //       include: {
  //         model: Type,
  //         attributes: ["nombre"],
  //         through: {
  //           attributes: [],
  //         },
  //       },
  //     });
  //     console.log(pokemonesDB);
  //     res.send(pokemonesDB);
  //   } else {
  //     let primeraPromesa = await axios.get(
  //       "https://pokeapi.co/api/v2/pokemon?limit=50&offset=0"
  //     );
  //     primeraPromesa = primeraPromesa.data.results?.map((pokemon) =>
  //       axios.get(pokemon.url)
  //     );
  //     const promesas = await Promise.all(primeraPromesa);

  //     const pokemonesListos = promesas.map((p) => {
  //       return {
  //         id: p.data.id,
  //         nombre: p.data.name,
  //         vida: p.data.stats[0].base_stat,
  //         ataque: p.data.stats[1].base_stat,
  //         defensa: p.data.stats[2].base_stat,
  //         velocidad: p.data.stats[5].base_stat,
  //         altura: p.data.height,
  //         peso: p.data.weight,
  //         tipo: p.data.types.map((t) => t.type.name),
  //         imagen: p.data.sprites.other.home.front_default,
  //       };
  //     });
  //     res.send(pokemonesListos);
  //   }
  // } catch (error) {
  //   console.log(error);
  //   res.status(400).send(error);
  // }
});

// GET /pokemons/{idPokemon}:
// Obtener el detalle de un pokemon en particular
// Debe traer solo los datos pedidos en la ruta de detalle de pokemon
// Tener en cuenta que tiene que funcionar tanto para un id de un pokemon existente en pokeapi o uno creado por ustedes
router.get("/:idPokemon", async (req, res) => {
  try {
    const { idPokemon } = req.params;
    let allPokemons = await getAllPokemons();
    if (idPokemon) {
      let pokemonId = await allPokemons.filter((poke) => poke.id.toString() === idPokemon.toString());
      pokemonId.length
        ? res.status(200).send(pokemonId)
        : res.status(404).send("No se encontro el Pokemon");
    }
  } catch (error) {
    res.status(400).send(error);
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
      imagen,
    });

    let tipoDb = await Type.findAll({
      where: { nombre: tipo },
    });
    //vincular el tipo a la otra tabla
    newPokemon.addType(tipoDb);

    console.log(newPokemon);

    res.status(201).json(newPokemon);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

//conecto con el app
module.exports = router;

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
    "https://pokeapi.co/api/v2/pokemon?limit=100&offset=0"
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
  let pokemonesDB = await Pokemon.findAll({ include: Type });

  pokemonesDB = pokemonesDB.map((poke) => {
    return {
      id: poke.id,
      nombre: poke.nombre,
      vida: poke.vida,
      ataque: poke.ataque,
      defensa: poke.defensa,
      velocidad: poke.velocidad,
      altura: poke.altura,
      peso: poke.peso,
      tipo: poke.types.map((t) => t.nombre),
      creadoDb: poke.creadoDb,
      imagen: poke.imagen,
    };
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
      //console.log(allPokemons);
      res.status(200).send(allPokemons);
    }
  } catch (error) {
    console.log(error);
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
    if (!idPokemon) res.send("no mandaste un Id");

    if (idPokemon) {
      let pokemonId = await allPokemons.filter(
        (poke) => poke.id.toString() === idPokemon.toString()
      );
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

  const pokemonCreado = await Pokemon.findOne({
    where: {
      nombre: nombre,
    },
  });

  try {
    if (pokemonCreado) res.status(200).json("Tu pokemon ya esta creado");
    if (!pokemonCreado) {
      const newPokemon = await Pokemon.create({
        nombre,
        vida,
        ataque,
        defensa,
        velocidad,
        imagen: imagen
          ? imagen
          : "https://purepng.com/public/uploads/large/purepng.com-pokeballpokeballdevicepokemon-ballpokemon-capture-ball-17015278258769okdi.png",
      });

      let tipoDb = await Type.findAll({
        where: { nombre: tipo },
      });
      //vincular el tipo a la otra tabla
      newPokemon.addType(tipoDb);

      //console.log(newPokemon);

      res.status(201).json("¡Pokemon creado con exito!");
    }
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

router.put("/:idPokemon", async (req, res) => {
  try {
    const { idPokemon } = req.params;
    const pokemon = req.body;

    const pokemonModificado = await Pokemon.update(pokemon, {
      where: { id: idPokemon },
    });

    res.status(200).json('pokemon modificado con exito');
  } catch (error) {
    res.status(400).json({ "mensaje de error": error });
  }
});

router.delete("/:idPokemon", async (req, res) => {
  try {
    const { idPokemon } = req.params;
    await Pokemon.destroy({ where: { id: idPokemon } });

    res.status(200).json({'Acabas de Borrar el pokemon con id': idPokemon});
  } catch (error) {
    res.status(400).json({ "mensaje de error": error });
  }
});
//conecto con el app
module.exports = router;

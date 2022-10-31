const axios = require("axios");
const bodyParser = require("body-parser");
const { Router } = require("express");
const { Type } = require("../db");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();
// [ ] GET /types:
// Obtener todos los tipos de pokemons posibles
// En una primera instancia deberán traerlos desde pokeapi y guardarlos en su propia base de datos y luego ya utilizarlos desde allí
router.get("/", async (req, res) => {
  try {
    let typeApi = await axios.get("https://pokeapi.co/api/v2/type");
    typeApi = typeApi.data.results.map((tipo) => axios.get(tipo.url));

    const tiposAll = await Promise.all(typeApi);

    let tiposName = tiposAll.map((p) => {
      return p.data.name;
    });
    
    tiposName.map((tipo) => {
      Type.findOrCreate({
        where: { nombre: tipo },
      });
    });

    const allTypes = await Type.findAll();

    res.status(200).json(allTypes);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;

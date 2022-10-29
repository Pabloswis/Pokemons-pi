const axios = require("axios");
const bodyParser = require("body-parser");
const { Router } = require("express");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

router.get("/", async (req, res) => {
  const typeApi = await axios.get("https://pokeapi.co/api/v2/type");

  const tipos = typeApi.data.results.map((tipo) => axios.get(tipo.url));


    const tiposAll = await Promise.all(tipos);
    const tiposListos = tiposAll.map(t=>{
      return {
          id: t.data.id,
          nombre: t.data.name
      }
    })
  //   console.log('tiposListos',  tiposListos)
  console.log(tiposListos)
  res.status(200).json(tiposListos);
});

module.exports = router;

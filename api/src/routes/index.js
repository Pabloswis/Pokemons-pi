const bodyParser = require("body-parser");
const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);



router.get("/", async (req, res) => {
  res.send("ruta / andando perfecto");
  
});

router.get("/pokemons", async (req, res) => {
  try {
    const { name } = req.query;

    if (name) {
      res.send("aca esta tu pokemon Name");
    }
    res.send("aca estan todos tus pokemones");
  } catch (error) {
    console.log(error);
  }
});


router.get("/pokemons/:idPokemon", async (req, res) => {
  try {
    const { idPokemon } = req.params;

    res.status(201).json('aca va tu pokemon id ' + idPokemon);
  } catch (error) {
    console.log(error);
  }
});

router.post('/pokemons', async(req,res)=>{
try {
    const pokemonBody = req.body
    console.log(pokemonBody)

    res.status(200).json(pokemonBody.name)

} catch (error) {
    console.log(error)
}

})

//conecto con el app
module.exports = router;

const { DataTypes } = require("sequelize");
const { get } = require("../app");

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("Pokemon", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    vida: {
      type: DataTypes.INTEGER,
      defaultValue: 100,
    },
    ataque: {
      type: DataTypes.INTEGER,
      defaultValue: 50,
    },
    defensa: {
      type: DataTypes.INTEGER,
      defaultValue: 50,
    },
    velocidad: {
      type: DataTypes.INTEGER,
      defaultValue: 50,
    },
    altura: {
      type: DataTypes.INTEGER,
      defaultValue: 35,
      // agregar 'metros' a la altura
      //get(){
      //   const medida = this.getDataValue('altura');
      //   //agregar al valor el str Metros
      // }
    },
    peso: {
      type: DataTypes.INTEGER,
      defaultValue: 50,
    },
    creadoDb: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    imagen: {
      type: DataTypes.STRING,
      // defaultValue: "https://purepng.com/public/uploads/large/purepng.com-pokeballpokeballdevicepokemon-ballpokemon-capture-ball-17015278258769okdi.png"
    },
  });
};

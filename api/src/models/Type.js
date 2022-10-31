const { DataTypes} = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

module.exports = (Sequelize) => {
  //defino el modelo
  Sequelize.define("type", {
    // id: {
    //   type: DataTypes.UUID,
    //   defaultValue: DataTypes.UUIDV4,
    //   primaryKey: true,
    // },
    nombre:{
        type:DataTypes.STRING
    }
  });
};

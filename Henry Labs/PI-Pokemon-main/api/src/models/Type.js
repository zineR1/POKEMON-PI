const {DataTypes} = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
 
  // defino el modelo

  sequelize.define('type', {
// En este caso no agrego Id porque no es como el caso de los pokemons que la info
// podía provenir de la Db o de la api así que no corro riesgo de colisiones.
id:{
type: DataTypes.INTEGER,
primaryKey: true,
allowNull: false
},  

name: {
      type: DataTypes.STRING,
      allowNull: false,
    }
 
  });
 };
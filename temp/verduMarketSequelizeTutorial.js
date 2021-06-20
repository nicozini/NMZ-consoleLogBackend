// NOTA IMPORTANTE: 
// Debatir estructura del proyecto. SRC. API.
// -------------------------------------------------------------------------------------------------


// ------ PASO 1 ------ Instalar dependencias

// ------ PASO 2 ------ Crear en la raíz del proyecto los siguientes archivos:

// .env (Para declarar las variables de entorno)
// .sequelizerc 

// Abrir el archivo.env y en su interior agregar:
// DB_USERNAME= root
// DB_PASSWORD=
// DB_HOST= localhost
// DB_DATABASE=asequelize
// DB_PORT=3306
// DB_DIALECT=mysql


// Abrir el archivo -sequelizerc y en su interior agregar:

// const path = require('path')
// module.exports = {
// config: path.resolve('./src/database/config', 'config.js'),
// 'models-path': path.resolve('./src/database/models'),
// 'seeders-path': path.resolve('./src/database/seeders'),
// 'migrations-path': path.resolve('./src/database/migrations'),
// }



// ------ PASO 3 ------ Ejecutar sequelize-cli init para crear las carpetas que menciona .sequelize
//                      y configurar .env

// Ingresar a src - config y en el interior del archivo config.js reemplazar todo por

// require('dotenv').config()

// module.exports =
// {
//     "username": process.env.DB_USERNAME,
//     "password": process.env.DB_PASSWORD,
//     "database": process.env.DB_DATABASE,
//     "host": process.env.DB_HOST,
//     "port": process.env.DB_PORT,
//     "dialect": process.env.DB_DIALECT,

//     seederStorage: "sequelize",
//     seederStorageTableName: "seeds",

//     migrationStorage: "sequelize",
//     migrationStorageTableName: "migrations"
// };



// ------ PASO 4 ------ Crear todos los modelos intervinientes

// verduMarket Sequelize Cli

// Modelos sin FK
// sequelize model:generate --name Roll --attributes type:string
// sequelize model:generate --name Payment --attributes type:string
// sequelize model:generate --name Category --attributes name:string
// sequelize model:generate --name State --attributes description:string
// sequelize model:generate --name Address --attributes street:string,number:integer

// Modelos con FK
// sequelize model:generate --name Image --attributes name:string,products_id:integer
// sequelize model:generate --name Shipping --attributes street:string,number:integer,price:decimal,orders_id:integer
// sequelize model:generate --name User --attributes first_name:string,last_name:string,email:string,password:string,avatar:string,addresses_id:integer,roll_id:integer
// sequelize model:generate --name Order --attributes number:integer,date:date,total:decimal,payments_id:integer,users_id:integer,users_addresses_id:integer,states_id:integer
// sequelize model:generate --name OrderDetail --attributes quantity:decimal,subtotal:decimal,orders_id:integer,products_id:integer
// sequelize model:generate --name Product --attributes name:string,price:decimal,stock:decimal,stock_min:decimal,stock_max:decimal,description:text,week:string,facts:text




// ------ PASO 4 ------ Crear todas las relaciones correpondientes

// hasMany, belongsTo, belongsToMany

// ------ PASO 5 ------ Agregar claves foraneas a las migraciones (references, con model y key)



// ------ PASO 6 ------ Crear migracion y modelos
// sequelize db:migrate
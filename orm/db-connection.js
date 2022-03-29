//use sequelize to access mysql database
const { Sequelize } = require('sequelize');



/* const connString = process.env.MYSQLCONNSTR_officialstonecapDatabase;

// protocol://user:password@server:port/databaseName
// const connection = new Sequelize('mysql://root:root1234@localhost:3306/demos');

const connection = new Sequelize(
  `mysql://${config.userName}:${config.password}@localhost:3306/${config.database}`,
  {
    define:{ timestamps: false }
  }
); */

const connection = new Sequelize(process.env.DATABASE_NAME, process.env.USER_NAME, process.env.PASSWORD, {
  host: process.env.HOST,
  dialect: 'mysql',
  define : {
    timestamps : false
  }
})


module.exports = connection;
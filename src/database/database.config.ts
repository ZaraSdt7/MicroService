import "npm:mysql2@3.5.2"
import { Sequelize } from "npm:sequelize-typescript@2.1.6"
import { env } from "node:process";


  export const sequelize = new Sequelize({
    dialect: "mysql",
    host: env.LOCALHOST || "localhost",
    port: 3306,
    username: env.USERNAME || "root"  ,
    password:env.PASSWORD || "",
    database: env.DBNAME || "orderdb",
    sync: {
        loggin: true,
        alter: true,
    },

    models: [
    
    ],
    
});
(async () => {
 try {
      await sequelize.sync({alter:true}); 
     await sequelize.authenticate();
     console.log("Connection has been established successfully.");
    
 } catch (error) {
     console.error("Unable to connect to the database:", error);
    
 }
})()


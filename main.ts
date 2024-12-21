import express from "npm:express@4.18.2";
import { config } from "https://deno.land/x/dotenv@v3.2.2/mod.ts";
import "jsr:@std/dotenv/load";
import swaggerJSDoc from "npm:swagger-jsdoc@6.2.8";
import swaggerUi from "npm:swagger-ui-express@4.6.3";
import "jsr:@std/dotenv/load";
import { sequelize } from "./src/database/database.config.ts";

config();
const app = express();
app.use(express.json());

// Swagger setup
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "My Deno API",
      version: "1.0.0",
      description: "API documentation for my Deno project",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ bearerAuth: [] }],
    servers: [
      {
        url: "http://localhost:8000",
      },
    ],
  },
  apis: [],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

sequelize.sync().then( () =>
{
  console.log("Database connection has been established successfully.");

  app.listen(8000, () => {
    console.log("Server is running on port 8000.");
  });
});

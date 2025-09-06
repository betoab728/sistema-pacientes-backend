import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0", // ← mejor pon esta versión, es la más estable
    info: {
      title: "API Sistema de Pacientes",
      version: "1.0.0",
      description: "Documentación de la API del sistema de pacientes",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./src/routes/*.ts"],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

export const swaggerDocs = (app: Express, port: number) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log(`📄 Swagger disponible en: http://localhost:${port}/api-docs`);
};

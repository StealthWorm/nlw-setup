import Fastify from "fastify";
import cors from "@fastify/cors";

import { appRoutes } from "./routes";

export const app = Fastify();

app.register(cors, {
  origin: "*"
});

app.register(appRoutes);
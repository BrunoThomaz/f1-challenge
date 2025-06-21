import fastify from "fastify";
import cors from "@fastify/cors";
import {teams, drivers} from "./utils";

const server = fastify({ logger: true });

server.register(cors, {
  origin: "*",
});

const PORT: number = Number(process.env.PORT);



server.get("/teams", async (req, res) => {
  res.type("application/json").code(200);
  return { teams };
});

server.get("/drivers", async (req, res) => {
  res.type("application/json").code(200);
  return { drivers };
});

interface DriverParams {
  id: string;
}

server.get<{ Params: DriverParams }>(
  "/drivers/:id",
  async (req, res) => {
    const id = parseInt(req.params.id);
    const driver = drivers.find((d) => d.id === id);

    if (!driver) {
      res.type("application/json").code(404);
      return { message: "Driver Not Found" };
    } else {
      res.type("application/json").code(200);
      return { driver };
    }
  }
);

server.listen({ port: PORT }, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
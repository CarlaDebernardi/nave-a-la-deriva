import express, { Request, Response } from "express";

const app = express();
const PORT = Number(process.env.PORT) || 3000;

const SYSTEM_CODES: Record<string, string> = {
  navigation: "NAV-01",
  communications: "COM-02",
  life_support: "LIFE-03",
  engines: "ENG-04",
  deflector_shield: "SHLD-05",
};

// Se elige un sistema al arrancar y queda fijo, para que /status y /repair-bay sean siempre coherentes
const systems = Object.keys(SYSTEM_CODES);
const damagedSystem = systems[Math.floor(Math.random() * systems.length)];

app.get("/status", (_req: Request, res: Response) => {
  res.json({ damaged_system: damagedSystem });
});

app.get("/repair-bay", (_req: Request, res: Response) => {
  const code = SYSTEM_CODES[damagedSystem];
  res.type("html").send(`<!DOCTYPE html>
<html>
<head>
    <title>Repair</title>
</head>
<body>
<div class="anchor-point">${code}</div>
</body>
</html>`);
});

app.post("/teapot", (_req: Request, res: Response) => {
  res.status(418).send("I'm a teapot");
});

app.listen(PORT, () => {
  console.log(`Nave a la deriva escuchando en el puerto ${PORT} — sistema averiado: ${damagedSystem}`);
});

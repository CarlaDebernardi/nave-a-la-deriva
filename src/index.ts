import express, { Request, Response } from "express";
import { MAX_PRESSURE, MIN_PRESSURE, saturationVolumes } from "./phaseChange";

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

app.get("/phase-change-diagram", (req: Request, res: Response) => {
  const raw = req.query.pressure;
  const pressure = typeof raw === "string" && raw.trim() !== "" ? Number(raw) : NaN;

  if (!Number.isFinite(pressure)) {
    res.status(400).json({ error: "El parámetro 'pressure' es obligatorio y debe ser numérico (MPa)" });
    return;
  }
  if (pressure < MIN_PRESSURE || pressure > MAX_PRESSURE) {
    res.status(400).json({
      error: `La presión debe estar entre ${MIN_PRESSURE} y ${MAX_PRESSURE} MPa (zona de saturación por encima de 30 °C)`,
    });
    return;
  }

  res.json(saturationVolumes(pressure));
});

app.listen(PORT, () => {
  console.log(`Nave a la deriva escuchando en el puerto ${PORT} — sistema averiado: ${damagedSystem}`);
});

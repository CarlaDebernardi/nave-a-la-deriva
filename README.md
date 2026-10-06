# Nave a la deriva (AltScore S1E7)

API en TypeScript + Express.

- `GET /status` → `{"damaged_system": "<sistema>"}` (elegido al azar al arrancar, fijo mientras corre)
- `GET /repair-bay` → HTML con `<div class="anchor-point">CÓDIGO</div>`
- `POST /teapot` → 418 I'm a teapot

## Uso

```bash
npm install
npm run dev        # desarrollo (ts-node)
npm run build      # compila a dist/
npm start          # corre la versión compilada
```

## Deploy en Render

- Build Command: `npm install && npm run build`
- Start Command: `npm start`

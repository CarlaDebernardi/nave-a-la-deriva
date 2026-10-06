# 🚀 Nave a la deriva

Solución al reto **AltScore S1E7**: una API que simula la llamada de auxilio de una nave averiada para que un robot de reparación la encuentre y sepa qué sistema arreglar.

**Stack:** TypeScript · Node.js · Express 5

---

## Endpoints

### `GET /status`

Informa qué sistema de la nave está averiado.

```json
{
  "damaged_system": "engines"
}
```

### `GET /repair-bay`

Devuelve una página HTML con el código del sistema averiado dentro de `<div class="anchor-point">`.

```html
<!DOCTYPE html>
<html>
<head>
    <title>Repair</title>
</head>
<body>
<div class="anchor-point">ENG-04</div>
</body>
</html>
```

| Sistema            | Código    |
|--------------------|-----------|
| `navigation`       | `NAV-01`  |
| `communications`   | `COM-02`  |
| `life_support`     | `LIFE-03` |
| `engines`          | `ENG-04`  |
| `deflector_shield` | `SHLD-05` |

### `POST /teapot`

Responde con el código de estado **418 I'm a teapot**.

---

## Decisión de diseño

El sistema averiado se elige **al azar una sola vez, cuando arranca el servidor**, y queda fijo mientras el proceso está vivo.

Así `/status` y `/repair-bay` siempre son coherentes entre sí: si el robot consulta el estado y después va a la bahía de reparación, el código que encuentra corresponde al sistema que se le informó. Si el sorteo se hiciera en cada request, las dos llamadas podrían no coincidir.

---

## Correr localmente

Requiere Node.js 18 o superior.

```bash
npm install
npm run dev        # desarrollo con ts-node
```

Para la versión compilada:

```bash
npm run build      # compila a dist/
npm start          # corre dist/index.js
```

El servidor escucha en el puerto definido por la variable `PORT` (por defecto `3000`) y al arrancar muestra en consola qué sistema quedó averiado.

### Probar los endpoints

```bash
curl http://localhost:3000/status
curl http://localhost:3000/repair-bay
curl -i -X POST http://localhost:3000/teapot
```

---

## Deploy

Desplegado en [Render](https://render.com) como Web Service desde la rama `main`:

| Configuración | Valor                             |
|---------------|-----------------------------------|
| Runtime       | Node                              |
| Build Command | `npm install && npm run build`    |
| Start Command | `npm start`                       |

El proyecto incluye un `.npmrc` que fija el registro público de npm, para que la instalación no dependa de la configuración de cada máquina.

---

## Flujo de trabajo

- `main`: versión desplegada
- `develop`: integración
- `E7/nave-a-la-deriva`: desarrollo del reto

Los cambios se hacen en la rama del reto y se integran a `develop` y luego a `main` mediante merge.

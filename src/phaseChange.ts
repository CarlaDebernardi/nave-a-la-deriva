// Curva de saturación P-v del fluido hidráulico, según el diagrama del cuaderno del ingeniero.
// Ambas líneas de saturación son rectas que se unen en el punto crítico.

// Punto crítico: líquido y vapor tienen el mismo volumen específico
const CRITICAL = { pressure: 10, volume: 0.0035 }; // MPa, m³/kg

// Isoterma de 30 °C: el robot solo consulta temperaturas mayores, es decir presiones mayores a esta
const T30 = { pressure: 0.05, liquidVolume: 0.00105, vaporVolume: 30 }; // MPa, m³/kg, m³/kg

export const MIN_PRESSURE = T30.pressure;
export const MAX_PRESSURE = CRITICAL.pressure;

export interface SaturationVolumes {
  specific_volume_liquid: number;
  specific_volume_vapor: number;
}

// Interpolación lineal entre la isoterma de 30 °C (t = 0) y el punto crítico (t = 1).
// Se escribe como a·(1 − t) + b·t para que en los extremos devuelva exactamente los valores del diagrama.
function lerp(a: number, b: number, t: number): number {
  return a * (1 - t) + b * t;
}

export function saturationVolumes(pressure: number): SaturationVolumes {
  const t = (pressure - MIN_PRESSURE) / (MAX_PRESSURE - MIN_PRESSURE);
  return {
    specific_volume_liquid: lerp(T30.liquidVolume, CRITICAL.volume, t),
    specific_volume_vapor: lerp(T30.vaporVolume, CRITICAL.volume, t),
  };
}

// example interfaces that can be use
// TIP: the types mentioned in the interfaces must be fulfilled in order to solve the problem.
interface TemperatureReading {
  time: Date
  temperature: number
  city: string
}
interface TemperatureSummary {
  first: number
  last: number
  high: number
  low: number
  average: number
}
const allTemperature: TemperatureReading[] = [];
export function processReadings(readings: TemperatureReading[]): void {
  for (const reading of readings) {
    allTemperature.push(reading);
  }
}

export function getTemperatureSummary(
  date: Date,
  city: string,
): TemperatureSummary | null {
  const auxAllTemperature = allTemperature;
  const equalDateForTemperature: TemperatureReading[] = [];
  for (const temperature of auxAllTemperature) {
    if (temperature.time.getTime() === date.getTime()
      && temperature.city === city) {
      equalDateForTemperature.push(temperature);
    }
  }
  if (equalDateForTemperature.length === 0) {
    return null;
  }
  let valueMax: number = equalDateForTemperature[0].temperature;
  let valueMin: number = equalDateForTemperature[0].temperature;
  let valueAverage = equalDateForTemperature[0].temperature;
  for (let i = 1; i < equalDateForTemperature.length; i++) {
    if (valueMax < equalDateForTemperature[i].temperature) {
      valueMax = equalDateForTemperature[i].temperature;
    }
    if (valueMin > equalDateForTemperature[i].temperature) {
      valueMin = equalDateForTemperature[i].temperature;
    }
    valueAverage = valueAverage + equalDateForTemperature[i].temperature;
  }
  valueAverage = valueAverage / equalDateForTemperature.length;

  const temperatureSummary: TemperatureSummary = {
    first: equalDateForTemperature[0].temperature,
    last: equalDateForTemperature[equalDateForTemperature.length - 1].temperature,
    high: valueMax,
    low: valueMin,
    average: valueAverage
  }

  return temperatureSummary;
}

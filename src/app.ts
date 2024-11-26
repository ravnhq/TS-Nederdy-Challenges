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

const temperatureReadings: TemperatureReading[] = []

export function processReadings(readings: TemperatureReading[]): void {
  temperatureReadings.push(...readings)
}

export function getTemperatureSummary(
  date: Date,
  city: string,
): TemperatureSummary | null {
  const selectedTemperatureReadings = temperatureReadings.filter(
    (temperatureReading) =>
      temperatureReading.time.getTime() === date.getTime() &&
      temperatureReading.city === city,
  )

  if (selectedTemperatureReadings.length === 0) {
    return null
  }

  const computedTemperature = selectedTemperatureReadings.map(
    (reading) => reading.temperature,
  )

  return {
    first: computedTemperature[0],
    last: computedTemperature[selectedTemperatureReadings.length - 1],
    high: Math.max(...computedTemperature),
    low: Math.min(...computedTemperature),
    average:
      computedTemperature.reduce((prev, curr) => prev + curr, 0) /
      selectedTemperatureReadings.length,
  }
}

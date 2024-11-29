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

let temperatureData: TemperatureReading[]
export function processReadings(readings: TemperatureReading[]): void {
  temperatureData = readings
}

export function getTemperatureSummary(
  date: Date,
  city: string,
): TemperatureSummary | null {
  const foundCity = temperatureData.find(
    (item: TemperatureReading) => item.city === city,
  )

  if (!foundCity) {
    return null
  }

  const cityTemperatureReadings: TemperatureReading[] = temperatureData.filter(
    (item: TemperatureReading) =>
      item.city === city && item.time.getDay() === date.getDay(),
  )
  const cityTemperatures: number[] = cityTemperatureReadings.map(
    (item: TemperatureReading) => item.temperature,
  )

  const first: number = cityTemperatures[0]
  const last: number = cityTemperatures.slice(-1)[0]
  const high: number = Math.max(...cityTemperatures)
  const low: number = Math.min(...cityTemperatures)
  const average: number =
    cityTemperatures.reduce(
      (total: number, temperature: number) => total + temperature,
    ) / cityTemperatures.length

  return {
    first,
    last,
    high,
    low,
    average,
  }
}

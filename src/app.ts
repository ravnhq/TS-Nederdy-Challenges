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

let temperatureReadings: TemperatureReading[] = []

export function processReadings(readings: TemperatureReading[]): void {
  temperatureReadings = readings
}

export function getTemperatureSummary(
  date: Date,
  city: string,
): TemperatureSummary | null {
  const filteredReadings = temperatureReadings.filter((reading) => {
    return reading.city === city && reading.time.getDate() === date.getDate()
  })

  if (filteredReadings.length === 0) return null

  const filteredTemperatures = filteredReadings.map(
    (reading) => reading.temperature,
  )

  const firstTemperature = filteredReadings[0].temperature
  const lastTemperature =
    filteredReadings[filteredReadings.length - 1].temperature

  const highTemperature = Math.max(...filteredTemperatures)
  const lowTemperature = Math.min(...filteredTemperatures)

  const averageTemperature =
    filteredReadings.reduce((acc, reading) => {
      return acc + reading.temperature
    }, 0) / filteredReadings.length

  const result: TemperatureSummary = {
    first: firstTemperature,
    last: lastTemperature,
    high: highTemperature,
    low: lowTemperature,
    average: averageTemperature,
  }
  return result
}

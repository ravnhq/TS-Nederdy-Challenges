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

const readingsList: TemperatureReading[] = []

export function processReadings(readings: TemperatureReading[]): void {
  readingsList.push(...readings)
}

export function getTemperatureSummary(
  date: Date,
  city: string,
): TemperatureSummary | null {
  const temperatures = readingsList
    .filter(
      (reading) =>
        reading.city === city &&
        reading.time.toDateString() === date.toDateString(),
    )
    .map((reading) => reading.temperature)

  if (temperatures.length === 0) return null

  const firstTemperature = temperatures[0]
  const lastTemperature = temperatures[temperatures.length - 1]
  const maxTemperature = Math.max(...temperatures)
  const minTemperature = Math.min(...temperatures)
  const averageTemp =
    temperatures.reduce(
      (previousTemperature, currentTemperature) =>
        previousTemperature + currentTemperature,
      0,
    ) / temperatures.length

  return {
    first: firstTemperature,
    last: lastTemperature,
    high: maxTemperature,
    low: minTemperature,
    average: averageTemp,
  }
}

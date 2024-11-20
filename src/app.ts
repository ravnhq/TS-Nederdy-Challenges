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

const globalReadings: TemperatureReading[] = []

export function processReadings(readings: TemperatureReading[]): void {
  globalReadings.push(...readings)
}

export function getTemperatureSummary(
  date: Date,
  city: string,
): TemperatureSummary | null {
  const filteredReadings = globalReadings.filter(
    (reading) =>
      reading.city === city && reading.time.getTime() === date.getTime(),
  )

  if (!filteredReadings.length) {
    return null
  }

  const summary = filteredReadings.reduce(
    (acc, reading, index) => {
      acc.total = acc.total + reading.temperature

      if (index === 0) {
        acc.first = reading.temperature
        acc.high = reading.temperature
        acc.low = reading.temperature
      }
      if (index === filteredReadings.length - 1) {
        acc.last = reading.temperature
        acc.average = acc.total / filteredReadings.length
      }
      acc.high = acc.high > reading.temperature ? acc.high : reading.temperature
      acc.low = acc.low < reading.temperature ? acc.low : reading.temperature

      return acc
    },
    {
      first: 0,
      last: 0,
      high: 0,
      low: 0,
      average: 0,
      total: 0,
    },
  )

  return summary
}

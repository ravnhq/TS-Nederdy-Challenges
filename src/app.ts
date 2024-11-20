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
  const summary: TemperatureSummary = {
    first: 0,
    last: 0,
    high: 0,
    low: 0,
    average: 0,
  }

  const filteredReadings = globalReadings.filter(
    (reading) =>
      reading.city === city && reading.time.getTime() === date.getTime(),
  )

  if (!filteredReadings.length) {
    return null
  }

  let index = 0
  let temperatureAcc = 0
  for (const reading of filteredReadings) {
    temperatureAcc += reading.temperature
    if (index === 0) {
      summary.first = reading.temperature
      summary.high = reading.temperature
      summary.low = reading.temperature
    } else if (index === filteredReadings.length - 1) {
      summary.last = reading.temperature
      summary.average = temperatureAcc / filteredReadings.length
    }

    summary.high =
      summary.high > reading.temperature ? summary.high : reading.temperature
    summary.low =
      summary.low < reading.temperature ? summary.low : reading.temperature
    index++
  }

  return summary
}

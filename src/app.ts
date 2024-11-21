import { TemperatureReading, TemperatureSummary } from './interfaces'
import { formatDate, getLowestValue, getMaxValue, getAverage } from './utils'

// example interfaces that can be use
// TIP: the types mentioned in the interfaces must be fulfilled in order to solve the problem.

const processedReadings: TemperatureReading[] = []

export function processReadings(readings: TemperatureReading[]): void {
  processedReadings.push(...readings)
}

export function getTemperatureSummary(
  date: Date,
  city: string,
): TemperatureSummary | null {
  const readings = processedReadings.filter(
    (read) => read.city === city && read.time.toISOString() == formatDate(date),
  )

  if (readings.length === 0) return null

  const summary: TemperatureSummary = {
    first: readings[0].temperature,
    last: readings[readings.length - 1].temperature,
    high: getMaxValue(readings),
    low: getLowestValue(readings),
    average: getAverage(readings),
  }

  return summary
}

// LAST ES LA FECHA MAS ANTIGUA

// example interfaces that can be use
// TIP: the types mentioned in the interfaces must be fulfilled in order to solve the problem.
import { TemperatureReading, TemperatureSummary } from './types'

const temperatureSummaries: Record<string, Record<number, TemperatureSummary>> =
  {}

export function processReadings(readings: TemperatureReading[]): void {
  readings.forEach(({ city, temperature, time }) => {
    const timeKey = time.getTime()

    // Here I decided to use the nullish coalescing assignment (??=)
    // because it assigns a default value ({}) to a property (temperatureSummaries[city])
    // only when that property is null or undefined.

    const cityData = (temperatureSummaries[city] ??= {})

    const summary = (cityData[timeKey] ??= {
      first: temperature,
      last: temperature,
      high: temperature,
      low: temperature,
      average: 0,
      count: 0,
    })

    const { high, low } = summary

    summary.last = temperature
    summary.high = Math.max(temperature, high)
    summary.low = Math.min(temperature, low)
    summary.average += temperature
    summary.count++
  })
}

export function getTemperatureSummary(
  date: Date,
  city: string,
): Omit<TemperatureSummary, 'count'> | null {
  const cityData = temperatureSummaries[city]
  if (!cityData) return null

  const summary = cityData[date.getTime()]
  if (!summary) return null

  const { count, ...summaryWithoutCount } = summary
  const average = count > 0 ? summary.average / count : 0

  return {
    ...summaryWithoutCount,
    average,
  }
}

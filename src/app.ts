import { TemperatureReading, TemperatureSummary } from './temperature-reading'

const citiesReadings: Map<string, TemperatureReading[]> = new Map()

export function processReadings(readings: TemperatureReading[]): void {
  readings.forEach((reading) => {
    let cityReadings = citiesReadings.get(reading.city)
    if (!cityReadings) {
      cityReadings = []
      citiesReadings.set(reading.city, cityReadings)
    }
    cityReadings.push(reading)
  })
}

export function getTemperatureSummary(
  date: Date,
  city: string,
): TemperatureSummary | null {
  const cityReadings = citiesReadings.get(city)
  if (!cityReadings) {
    return null
  }
  const filteredReadings = cityReadings
    .filter((reading) => {
      return reading.time.toDateString() === date.toDateString()
    })
    .map((r) => r.temperature)
  if (filteredReadings.length === 0) {
    return null
  }
  const first = filteredReadings[0]
  const last = filteredReadings[filteredReadings.length - 1]
  const high = Math.max(...filteredReadings)
  const low = Math.min(...filteredReadings)
  const average =
    filteredReadings.reduce((sum, temp) => sum + temp, 0) /
    filteredReadings.length
  return { first, last, high, low, average }
}

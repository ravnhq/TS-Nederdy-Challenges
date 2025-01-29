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

function getDateKey(date: Date): string {
  return date.toISOString().split('T')[0]
}

const temperatureData: Record<string, Record<string, TemperatureReading[]>> = {}

export function processReadings(readings: TemperatureReading[]): void {
  for (const reading of readings) {
    const dateKey = getDateKey(reading.time)
    const city = reading.city

    const cityData = (temperatureData[dateKey] ??= {})
    const cityReadings = (cityData[city] ??= [])

    const index = cityReadings.findIndex(
      (r) => r.time.getTime() > reading.time.getTime(),
    )

    if (index === -1) {
      cityReadings.push(reading)
    } else {
      cityReadings.splice(index, 0, reading)
    }
  }
}

export function getTemperatureSummary(
  date: Date,
  city: string,
): TemperatureSummary | null {
  const dateKey = getDateKey(date)

  if (!temperatureData[dateKey] || !temperatureData[dateKey][city]) {
    return null
  }

  const readings = temperatureData[dateKey][city]

  const first = readings[0].temperature
  const last = readings[readings.length - 1].temperature
  const high = Math.max(...readings.map((reading) => reading.temperature))
  const low = Math.min(...readings.map((reading) => reading.temperature))
  const average =
    readings.reduce((sum, reading) => sum + reading.temperature, 0) /
    readings.length

  return { first, last, high, low, average }
}

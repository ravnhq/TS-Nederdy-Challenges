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
  sum?: number | undefined
  count?: number | undefined
}

interface TemperatureReadingSummaryGroup {
  [key: string]: {
    [date: string]: TemperatureSummary
  }
}

const temperatureReadingSummaryGroup: TemperatureReadingSummaryGroup = {}

export function processReadings(readings: TemperatureReading[]): void {
  readings.forEach((reading) => {
    const city = reading.city
    const date = reading.time.toLocaleDateString()

    if (!temperatureReadingSummaryGroup[city]) {
      temperatureReadingSummaryGroup[city] = {}
    }

    if (!temperatureReadingSummaryGroup[city][date]) {
      temperatureReadingSummaryGroup[city][date] = {
        first: reading.temperature,
        last: reading.temperature,
        high: reading.temperature,
        low: reading.temperature,
        sum: reading.temperature,
        count: 1,
        average: reading.temperature,
      }
    } else {
      const summary = temperatureReadingSummaryGroup[city][date]

      summary.last = reading.temperature
      summary.high = Math.max(summary.high, reading.temperature)
      summary.low = Math.min(summary.low, reading.temperature)

      if (summary.sum === undefined) {
        summary.sum = reading.temperature
      } else {
        summary.sum += reading.temperature
      }

      if (summary.count === undefined) {
        summary.count = 1
      } else {
        summary.count++
      }

      summary.average = summary.sum / summary.count
    }
  })

  for (const city in temperatureReadingSummaryGroup) {
    for (const date in temperatureReadingSummaryGroup[city]) {
      const summary = temperatureReadingSummaryGroup[city][date]

      delete summary.sum
      delete summary.count
    }
  }
}

export function getTemperatureSummary(
  date: Date,
  city: string,
): TemperatureSummary | null {
  const selectedTemperatureReadings = temperatureReadingSummaryGroup[city]

  if (!selectedTemperatureReadings) {
    return null
  }

  return selectedTemperatureReadings[date.toLocaleDateString()]
}

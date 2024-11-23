import { TemperatureReading, TemperatureSummary } from './interfaces'

type ProccesedReadings = {
  [city: string]: {
    [date: string]: number[]
  }
}
let processedReadings: ProccesedReadings = {}

export function processReadings(readings: TemperatureReading[]): void {
  const processedData = readings.reduce<ProccesedReadings>((data, value) => {
    const { city, time, temperature } = value
    const formatedDate = time.toISOString()

    // Validate if city exists or isn't empty
    if (city.trim() === '' || !city) {
      throw new Error('Some register has no valid city')
    }

    // Create city objects if not exists
    if (!data[city]) {
      data[city] = {}
    }

    // Create date objects if not exists
    if (!data[city][formatedDate]) {
      data[city][formatedDate] = []
    }

    // Push temperatures
    data[city][formatedDate].push(temperature)
    return data
  }, {} as ProccesedReadings)

  processedReadings = { ...processedData }
}

export function getTemperatureSummary(
  date: Date,
  city: string,
): TemperatureSummary | null {
  const formatedDate = date.toISOString()

  if (!processedReadings[city] || !processedReadings[city][formatedDate])
    return null

  const temperatures = processedReadings[city][formatedDate]

  const first = temperatures[0]
  const last = temperatures[temperatures.length - 1]
  const high = Math.max(...temperatures)
  const low = Math.min(...temperatures)
  const average =
    temperatures.reduce((acc, value) => acc + value) / temperatures.length

  const summary: TemperatureSummary = {
    first,
    last,
    high,
    low,
    average,
  }

  return summary
}

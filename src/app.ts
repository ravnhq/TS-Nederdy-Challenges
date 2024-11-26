// eslint-disable-next-line @typescript-eslint/no-var-requires
const groupBy = require('object.groupby')

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

// is dictionary of key values (key is a number and value is an array)
let dailyReadings: { [date: string]: TemperatureReading[] }

export function processReadings(readings: TemperatureReading[]): void {
  dailyReadings = groupBy(readings, (value: TemperatureReading) => {
    return value.time.toDateString()
  })
}

export function getTemperatureSummary(
  date: Date,
  city: string,
): TemperatureSummary | null {
  const readings = dailyReadings[date.toDateString()].filter((item) => {
    return item.city === city
  })
  if (readings.length > 0) {
    let avg = 0
    let highest = 0
    let lowest = Number.MAX_SAFE_INTEGER
    for (const reading of readings) {
      avg += reading.temperature
      lowest = reading.temperature < lowest ? reading.temperature : lowest
      highest = reading.temperature > highest ? reading.temperature : highest
    }
    avg /= readings.length

    return {
      average: avg,
      first: readings[0].temperature,
      high: highest,
      last: readings[readings.length - 1].temperature,
      low: lowest,
    } as TemperatureSummary
  } else {
    return null
  }
}

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
const dailyReadings: { [date_city: string]: TemperatureReading[] } = {}

export function processReadings(readings: TemperatureReading[]): void {
  readings.reduce((acc, curr) => {
    if (acc[curr.city + curr.time.toDateString()]) {
      acc[curr.city + curr.time.toDateString()].push(curr)
    } else {
      acc[curr.city + curr.time.toDateString()] = [curr]
    }
    return acc
  }, dailyReadings)
}

export function getTemperatureSummary(
  date: Date,
  city: string,
): TemperatureSummary | null {
  const data = dailyReadings[city + date.toDateString()]
  const readings = data === undefined || data.length === 0 ? undefined : data

  if (readings) {
    const response = readings.reduce(
      (acc, { temperature }, index, array) => {
        // test
        acc.average += temperature
        acc.low = temperature < acc.low ? temperature : acc.low
        acc.high = temperature > acc.high ? temperature : acc.high
        return acc
      },
      {
        average: 0,
        first: 0,
        high: 0,
        low: Number.MAX_SAFE_INTEGER,
        last: 0,
      },
    )

    response.average /= readings.length
    response.first = readings[0].temperature
    response.last = readings[readings.length - 1].temperature

    return response
  } else {
    return null
  }
}

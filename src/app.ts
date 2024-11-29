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

let temperatureReadings: TemperatureReading[] = []

export function processReadings(readings: TemperatureReading[]): void {
  // add here your code
  temperatureReadings = readings
}

export function getTemperatureSummary(
  date: Date,
  city: string,
): TemperatureSummary | null {
  //add here your code
  const readings = temperatureReadings

  const readingsFilter = readings.filter(
    (value) => value.city === city && value.time.getTime() === date.getTime(),
  )

  if (!readingsFilter.length) {
    return null
  }

  const first = readingsFilter[0].temperature
  const last = readingsFilter[readingsFilter.length - 1].temperature
  let high = readingsFilter[0].temperature
  let low = readingsFilter[0].temperature
  let average = 0

  readingsFilter.forEach((curren) => {
    if (high < curren.temperature) {
      high = curren.temperature
    }

    if (low > curren.temperature) {
      low = curren.temperature
    }

    average += curren.temperature
  })

  average /= readingsFilter.length

  return {
    first,
    last,
    high,
    low,
    average,
  }
}

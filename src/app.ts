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

const temperatures = [] as TemperatureReading[]

export function processReadings(readings: TemperatureReading[]): void {
  // add here your code
  readings.forEach((temperatureRead) => temperatures.push(temperatureRead))
}

export function getTemperatureSummary(
  date: Date,
  city: string,
): TemperatureSummary | null {
  //add here your code
  const sortCities = (record: TemperatureReading) => record.city === city
  const sortTime = (record: TemperatureReading) =>
    record.time.getTime() === date.getTime()

  if (temperatures.some(sortCities) && temperatures.some(sortTime)) {
    const recordsByCity = temperatures.filter(sortCities)
    const recordsByDate = recordsByCity.filter(sortTime)

    const temperatureReadings = recordsByDate.map(
      (record) => record.temperature,
    )

    const high = Math.max(...temperatureReadings)
    const low = Math.min(...temperatureReadings)
    const average =
      recordsByDate.reduce(
        (accumulator, currentValue) => currentValue.temperature + accumulator,
        0,
      ) / recordsByDate.length
    const first = recordsByDate.shift()?.temperature as number
    const last = recordsByDate.pop()?.temperature as number

    return {
      first,
      last,
      high,
      low,
      average,
    } as TemperatureSummary
  } else {
    return null
  }
}

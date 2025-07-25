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

const readingsFormatted: Map<string, Map<string, TemperatureReading[]>> =
  new Map()

// Store temperature readings in a sorted way to facilitate searches by city and time
export function processReadings(readings: TemperatureReading[]): void {
  readings.forEach((r) => {
    const { city, time } = r

    const timeF = new Intl.DateTimeFormat('en-US').format(time)

    let cityMap = readingsFormatted.get(city)

    if (!cityMap) {
      cityMap = new Map<string, TemperatureReading[]>()
      readingsFormatted.set(city, cityMap)
    }

    let readingsArray = cityMap.get(timeF)
    if (!readingsArray) {
      readingsArray = []
      cityMap.set(timeF, readingsArray)
    }

    readingsArray.push(r)
  })
}

export function getTemperatureSummary(
  date: Date,
  city: string,
): TemperatureSummary | null {
  const dateF = new Intl.DateTimeFormat('en-US').format(date)

  const cityMap = readingsFormatted.get(city)
  if (!cityMap) return null

  const tempReadings = cityMap.get(dateF)
  if (!tempReadings) return null

  const first = tempReadings[0].temperature

  const lastIndex = tempReadings.length - 1
  const last = tempReadings[lastIndex].temperature
  const average =
    tempReadings.reduce((sum, e) => sum + e.temperature, 0) /
    tempReadings.length
  const high = Math.max(...tempReadings.map((e) => e.temperature))
  const low = Math.min(...tempReadings.map((r) => r.temperature))

  const temperatureResume: TemperatureSummary = {
    first: first,
    last: last,
    average: average,
    high: high,
    low: low,
  }

  return temperatureResume
}

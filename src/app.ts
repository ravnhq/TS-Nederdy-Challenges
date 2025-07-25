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

let processedDataMap: Map<string, Map<number, { temperatures: number[] }>> = new Map()
export function processReadings(readings: TemperatureReading[]): void {
  readings.map((reading) => {
    const normalizedDate = new Date(
      reading.time.getFullYear(),
      reading.time.getMonth(),
      reading.time.getDate(),
    )
    const dateKey = normalizedDate.getTime()

    if (!processedDataMap.has(reading.city)) {
      processedDataMap.set(reading.city, new Map())
    }
    const cityMap = processedDataMap.get(reading.city)!
    if (!cityMap.has(dateKey)) {
      cityMap.set(dateKey, { temperatures: [] })
    }
    const dateArray = cityMap.get(dateKey)!

    dateArray.temperatures.push(reading.temperature)
    cityMap.set(dateKey, dateArray)
    processedDataMap.set(reading.city, cityMap)
  })
}

export function getTemperatureSummary(
  date: Date,
  city: string,
): TemperatureSummary | null {
  const cityMap = processedDataMap.get(city)
  if (!cityMap) return null

  const dateKey = date.getTime()
  const dateArray = cityMap.get(dateKey)
  if (!dateArray) return null

  const temperatures = dateArray.temperatures
  const temperatureSummary: TemperatureSummary = {
    first: temperatures[0],
    average: temperatures.reduce((sum, t) => sum + t, 0) / temperatures.length,
    high: Math.max(...temperatures),
    last: temperatures[temperatures.length - 1],
    low: Math.min(...temperatures),
  }

  return temperatureSummary
}
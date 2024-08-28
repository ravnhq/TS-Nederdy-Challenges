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

const cityData: Map<string, Map<string, number[]>> = new Map()

export function processReadings(readings: TemperatureReading[]) {
  readings.forEach(({ time, temperature, city }) => {
    const dateStr = time.toISOString().split('T')[0]

    if (!cityData.has(city)) {
      cityData.set(city, new Map())
    }
    const cityMap = cityData.get(city)

    if(cityMap === undefined) return

      if (!cityMap.has(dateStr)) {
        cityMap.set(dateStr, [])
      }
      
      cityMap.get(dateStr)!.push(temperature)
  })
}

export function getTemperatureSummary(
  date: Date,
  city: string,
): TemperatureSummary | null {
  const dateStr = date.toISOString().split('T')[0]
  const cityMap = cityData.get(city)

  if (!cityMap) {
    return null
  }

  const temperatures = cityMap.get(dateStr)

  if (!temperatures || temperatures.length === 0) {
    return null
  }

  const first = temperatures[0]
  const last = temperatures[temperatures.length - 1]
  const high = Math.max(...temperatures)
  const low = Math.min(...temperatures)
  const average = temperatures.reduce((sum, temp) => sum + temp, 0) / temperatures.length

  return {
    first,
    last,
    high,
    low,
    average,
  }
}

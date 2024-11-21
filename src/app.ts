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

const formatDate = (date: Date): string => date.toLocaleDateString()

const temperatureData: Map<string, Map<string, number[]>> = new Map()

export function processReadings(readings: TemperatureReading[]): void {
  readings.forEach(({ city, temperature, time }) => {
    const formattedDate = formatDate(time)

    if (!temperatureData.has(city)) {
      temperatureData.set(city, new Map())
    }

    const cityMap = temperatureData.get(city)

    if (!cityMap?.has(formattedDate)) {
      cityMap?.set(formattedDate, [])
    }

    const cityMapDate = cityMap?.get(formattedDate)
    cityMapDate?.push(temperature)
  })
}

export function getTemperatureSummary(
  date: Date,
  city: string,
): TemperatureSummary | null {
  const cityData = temperatureData.get(city)

  if (!cityData) return null

  const dateData = cityData.get(formatDate(date))

  if (!dateData || dateData.length === 0) return null

  const first = dateData[0]
  const last = dateData[dateData.length - 1]
  const high = Math.max(...dateData)
  const low = Math.min(...dateData)
  const average = dateData.reduce((sum, temp) => sum + temp) / dateData.length

  return { first, last, high, low, average }
}

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

const dataLectures: TemperatureReading[] = []
export function processReadings(readings: TemperatureReading[]): void {
  dataLectures.push(...readings)
}

export function getTemperatureSummary(
  date: Date,
  city: string,
): TemperatureSummary | null {
  const filterArray = dataLectures.filter(
    (data) => data.time.getTime() === date.getTime() && data.city === city,
  )

  if (filterArray.length === 0) return null
  const temperatureArray: number[] = []

  filterArray.forEach((element) => temperatureArray.push(element.temperature))

  const sizeTemperatureArray = temperatureArray.length
  const average =
    temperatureArray.reduce((previous, current) => previous + current) /
    sizeTemperatureArray

  const orderedTemperature = [...temperatureArray].sort((a, b) => a - b)

  return {
    first: temperatureArray[0],
    last: temperatureArray[sizeTemperatureArray - 1],
    high: orderedTemperature[sizeTemperatureArray - 1],
    low: orderedTemperature[0],
    average: average,
  }
}

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

let globalReading: Array<TemperatureReading> = []

export function processReadings(readings: TemperatureReading[]): void {
  globalReading = readings
}

export function getTemperatureSummary(
  date: Date,
  city: string,
): TemperatureSummary | null {
  const filteredArray = globalReading.filter(
    (el) => el.time.getTime() === date.getTime() && el.city === city,
  )

  if (filteredArray.length === 0) return null

  let sum = 0

  filteredArray.forEach((el) => (sum += el.temperature))

  return {
    first: filteredArray[0].temperature,
    last: filteredArray[filteredArray.length - 1].temperature,
    low: filteredArray.map((el) => el.temperature).sort((a, b) => a - b)[0],
    high: filteredArray
      .map((el) => el.temperature)
      .sort((a, b) => a - b)
      .reverse()[0],
    average: sum / filteredArray.length,
  }
}

getTemperatureSummary(new Date('3/12/2021'), 'New York')

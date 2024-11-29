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
let data: TemperatureReading[] = []

export function processReadings(readings: TemperatureReading[]): void {
  data = [...readings]
}

export function getTemperatureSummary(
  date: Date,
  city: string,
): TemperatureSummary | null {
  let temperatures: number[] = []
  let sum = 0

  data.forEach((item) => {
    if (item.city === city && item.time.getTime() === date.getTime()) {
      temperatures.push(item.temperature)
      sum += item.temperature
    }
  })

  const temperaturesLength = temperatures.length

  if (!temperaturesLength) return null

  const avg = sum / temperaturesLength
  const first = temperatures[0]
  const last = temperatures[temperaturesLength - 1]
  temperatures = temperatures.sort((a, b) => a - b)
  return {
    first,
    last,
    high: temperatures[temperaturesLength - 1],
    low: temperatures[0],
    average: +avg.toFixed(2),
  }
}

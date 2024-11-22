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

const data: TemperatureReading[] = []

export function processReadings(readings: TemperatureReading[]): void {
  readings.forEach((item) => {
    data.push(item)
  })
}

export function getTemperatureSummary(
  date: Date,
  city: string,
): TemperatureSummary | null {
  const temperatures = data
    .filter(
      (item) =>
        item.city === city && item.time.toDateString() === date.toDateString(),
    )
    .map((item) => item.temperature)

  if (temperatures.length !== 0) {
    return {
      first: temperatures[0],
      last: temperatures[temperatures.length - 1],
      high: Math.max(...temperatures),
      low: Math.min(...temperatures),
      average:
        temperatures.reduce((sum, currentValue) => sum + currentValue) /
        temperatures.length,
    }
  }
  return null
}

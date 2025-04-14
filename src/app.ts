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

export function processReadings(readings: TemperatureReading[]): void {
  // add here your code
  readings.forEach((reading) => {
    storedReadings.push(reading)
  })
}

const storedReadings: TemperatureReading[] = []

export function getTemperatureSummary(
  date: Date,
  city: string,
): TemperatureSummary | null {
  //add here your code
  const targetDate = date.toISOString().slice(0, 10)
  const result = storedReadings.filter(
    (reading) =>
      reading.time.toISOString().slice(0, 10) == targetDate &&
      reading.city == city,
  )

  if (result.length === 0) {
    return null
  }

  const first = result[0].temperature
  const last = result[result.length - 1].temperature
  const temperatures = result.map((r) => r.temperature)
  const high = Math.max(...temperatures)
  const low = Math.min(...temperatures)
  const average =
    temperatures.reduce((acc, temp) => acc + temp, 0) / temperatures.length
  return { first, last, high, low, average }
}

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

const dataByCity: { [key: string]: TemperatureReading[] } = {}

export function processReadings(readings: TemperatureReading[]): void {
  readings.forEach((reading: TemperatureReading): void => {
    if (!dataByCity[reading.city]) {
      dataByCity[reading.city] = []
    }
    dataByCity[reading.city].push(reading)
  })
}

export function getTemperatureSummary(
  date: Date,
  city: string,
): TemperatureSummary | null {
  const readings: TemperatureReading[] = dataByCity[city]?.filter(
    (reading) => reading.time.toDateString() === date.toDateString(),
  )
  if (!readings || readings.length === 0) {
    return null
  }

  const temperatures: number[] = readings.map(
    (reading: TemperatureReading) => reading.temperature,
  )
  const first: number = temperatures[0]
  const last: number = temperatures[temperatures.length - 1]
  const high: number = Math.max(...temperatures)
  const low: number = Math.min(...temperatures)
  const average: number =
    temperatures.reduce((sum: number, temp: number) => sum + temp) /
    temperatures.length

  return { first, last, high, low, average }
}

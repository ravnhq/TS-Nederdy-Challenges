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

const examples: TemperatureReading[] = []

export function processReadings(readings: TemperatureReading[]): void {
  examples.push(...readings)
}

export function getTemperatureSummary(
  date: Date,
  city: string,
): TemperatureSummary | null {
  const currentTemperatures = examples.filter(
    (reading) =>
      reading.time.getTime() === date.getTime() && reading.city === city,
  )

  if (currentTemperatures.length === 0) {
    return null
  }

  const first = currentTemperatures[0]?.temperature

  const last = currentTemperatures[currentTemperatures.length - 1]?.temperature

  const high = Math.max(
    ...currentTemperatures.map((reading) => reading.temperature),
  )
  const low = Math.min(
    ...currentTemperatures.map((reading) => reading.temperature),
  )
  const average =
    currentTemperatures.reduce((prev, curr) => prev + curr.temperature, 0) /
    currentTemperatures.length

  return {
    first: first,
    last: last,
    high: high,
    low: low,
    average: average,
  }
}

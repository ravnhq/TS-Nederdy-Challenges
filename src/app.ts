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
  const data: Record<string, TemperatureReading[]> = {}

  for (const reading of readings) {
    const dateKey = reading.time.toISOString().split('T')[0]
    const key = `${reading.city}_${dateKey}`

    if (!data[key]) {
      data[key] = []
    }

    data[key].push(reading)
  }

  for (const key in data) {
    data[key].sort((a, b) => a.time.getTime() - b.time.getTime())
  }

  ;(processReadings as any)._data = data
}

export function getTemperatureSummary(
  date: Date,
  city: string,
): TemperatureSummary | null {
  const data = (processReadings as any)._data as
    | Record<string, TemperatureReading[]>
    | undefined

  if (!data) return null

  const dateKey = date.toISOString().split('T')[0]
  const key = `${city}_${dateKey}`

  const readings = data[key]
  if (!readings || readings.length === 0) return null

  const temps = readings.map((r) => r.temperature)

  return {
    first: readings[0].temperature,
    last: readings[readings.length - 1].temperature,
    high: Math.max(...temps),
    low: Math.min(...temps),
    average: temps.reduce((sum, t) => sum + t, 0) / temps.length,
  }
}

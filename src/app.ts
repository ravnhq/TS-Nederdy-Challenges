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

const groupedReadings: Map<string, TemperatureReading[]> = new Map();

export function processReadings(readings: TemperatureReading[]): void {
  // add here your code
  readings.forEach((reading) => {
    const dateKey = reading.time.toISOString().split('T')[0]
    const cityKey = reading.city.toLowerCase()
    const key = `${dateKey} ${cityKey}`

    // Check if the key already exists in the map. If it doesn't exists, create a new empty array for that key.
    if (!groupedReadings.has(key)) {
      groupedReadings.set(key, [])
    }

    groupedReadings.get(key)?.push(reading)
  })
}

export function getTemperatureSummary(
  date: Date,
  city: string,
): TemperatureSummary | null {
  //add here your code
  if (typeof city !== 'string' || city.length === 0) {
    throw new Error('Invalid city name')
  }
  const dateKey = date.toISOString().split('T')[0]
  const cityKey = city.toLowerCase()
  const key = `${dateKey} ${cityKey}`

  const readings = groupedReadings.get(key)

  if (!readings || readings.length === 0) {
    return null
  }

  const totalTemperature = readings.map((reading) => reading.temperature)

  // First temperature reading for the day
  const firstTemperature = readings[0].temperature

  // Last temperature reading for the day
  const lastTemperature = readings[readings.length - 1].temperature

  // Highest temperature reading for the day
  const highestTemperature = Math.max(...totalTemperature)

  // Lowest temperature reading for the day
  const lowestTemperature = Math.min(...totalTemperature)

  // Average of temperature readings that day
  const averageTemperature =
    totalTemperature.reduce((sum, temperature) => sum + temperature, 0) /
    totalTemperature.length

  return {
    first: firstTemperature,
    last: lastTemperature,
    high: highestTemperature,
    low: lowestTemperature,
    average: averageTemperature,
  }
}

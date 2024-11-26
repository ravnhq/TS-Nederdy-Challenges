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

let temperatureReadings: TemperatureReading[]

export function processReadings(readings: TemperatureReading[]): void {
  // add here your code
  temperatureReadings = readings
}

export function getTemperatureSummary(
  date: Date,
  city: string,
): TemperatureSummary | null {
  //add here your code
  const readings = temperatureReadings.filter((temperatureReading) => {
    return (
      temperatureReading.city === city &&
      temperatureReading.time.toDateString() === date.toDateString()
    )
  })

  if (readings.length === 0) {
    return null
  }

  const firstTemperature = readings[0].temperature
  const lastTemperature = readings[readings.length - 1].temperature

  let highestTemperature = readings[0].temperature
  let lowestTemperature = readings[0].temperature
  let totalTemperature = 0

  readings.forEach((reading) => {
    if (reading.temperature > highestTemperature) {
      highestTemperature = reading.temperature
    }

    if (reading.temperature < lowestTemperature) {
      lowestTemperature = reading.temperature
    }

    totalTemperature += reading.temperature
  })

  const averageTemperature = totalTemperature / readings.length

  return {
    first: firstTemperature,
    last: lastTemperature,
    high: highestTemperature,
    low: lowestTemperature,
    average: averageTemperature,
  }
}

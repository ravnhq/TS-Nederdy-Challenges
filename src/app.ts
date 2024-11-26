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
  const citiesArray = temperatureReadings.filter(
    (temperatureReading) =>
      temperatureReading.city === city &&
      temperatureReading.time.toDateString() === date.toDateString(),
  )

  if (citiesArray.length === 0) {
    return null
  }

  const first = citiesArray[0].temperature
  const last = citiesArray[citiesArray.length - 1].temperature

  let highestTemperature = citiesArray[0].temperature
  let lowest = citiesArray[0].temperature
  let total = 0

  citiesArray.forEach((city) => {
    if (city.temperature > highestTemperature) {
      highestTemperature = city.temperature
    }

    if (city.temperature < lowest) {
      lowest = city.temperature
    }

    total += city.temperature
  })

  const average = total / citiesArray.length

  return {
    first,
    last,
    high: highestTemperature,
    low: lowest,
    average,
  }
}

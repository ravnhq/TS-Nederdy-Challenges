// example interfaces that can be use
// TIP: the types mentioned in the interfaces must be fulfilled in order to solve the problem.
let example: TemperatureReading[] = []

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
  example = readings
}

export function getTemperatureSummary(
  date: Date,
  city: string,
): TemperatureSummary | null {
  //add here your code
  const arrayFiltered = example.filter((record) => {
    return record.time.getTime() === date.getTime() && record.city === city
  })

  if (arrayFiltered.length > 0) {
    const first = arrayFiltered[0].temperature
    const last = arrayFiltered[arrayFiltered.length - 1].temperature
    let average = 0
    let high = first
    let low = first

    for (const iterator of arrayFiltered) {
      if (iterator.temperature > high) high = iterator.temperature
      if (iterator.temperature < low) low = iterator.temperature

      average += iterator.temperature
    }
    average /= arrayFiltered.length

    return {
      average,
      first,
      high,
      last,
      low,
    }
  }
  return null
}

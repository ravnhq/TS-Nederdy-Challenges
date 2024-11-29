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

let inputReadings: TemperatureReading[] = []

export function processReadings(readings: TemperatureReading[]): void {
  // add here your code
  inputReadings = readings
}

export function getTemperatureSummary(
  date: Date,
  city: string,
): TemperatureSummary | null {
  //add here your code

  const readingsByCity = inputReadings.filter(
    (reading) => reading.city === city,
  )

  if (readingsByCity.length === 0) return null

  const readingsByDate = readingsByCity.filter(
    (reading) => reading.time.getTime() === date.getTime(),
  )

  const temperaturesArray = readingsByDate.map((value) => value.temperature)

  const reducer = (accumulator: number, current: number) =>
    accumulator + current

  return {
    first: readingsByDate[0].temperature,
    last: readingsByDate[readingsByDate.length - 1].temperature,
    high: Math.max(...temperaturesArray),
    low: Math.min(...temperaturesArray),
    average: temperaturesArray.reduce(reducer) / temperaturesArray.length,
  }
}

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

const readingsFiltered: TemperatureReading[] = []

export function processReadings(readings: TemperatureReading[]): void {
  // add here your code
  readingsFiltered.push(...readings)
}

export function getTemperatureSummary(
  date: Date,
  city: string,
): TemperatureSummary | null {
  //add here your code

  const listFiltered = readingsFiltered
    .filter((item) => {
      return (
        item.city === city && item.time.toDateString() === date.toDateString()
      )
    })
    .map((item) => item.temperature)

  const firstTemp = listFiltered[0]
  const lastTemp = listFiltered[listFiltered.length - 1]
  const highTemp = listFiltered.sort((tempA, tempB) => {
    return tempB - tempA
  })[0]
  const lowTemp = listFiltered.sort((tempA, tempB) => {
    return tempA - tempB
  })[0]
  const average =
    listFiltered.reduce((acc, item) => acc + item, 0) / listFiltered.length

  const summary: TemperatureSummary = {
    first: firstTemp,
    last: lastTemp,
    high: highTemp,
    low: lowTemp,
    average: average,
  }
  return listFiltered.length !== 0 ? summary : null
}

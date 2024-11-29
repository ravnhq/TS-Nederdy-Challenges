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

let valuesTemp: TemperatureReading[]

export function processReadings(readings: TemperatureReading[]): void {
  // add here your code
  valuesTemp = readings
}

export function getTemperatureSummary(
  date: Date,
  city: string,
): TemperatureSummary | null {
  //add here your code

  const temperatures: number[] = valuesTemp
    .filter(
      (localTime) =>
        localTime.city === city &&
        localTime.time.toString() === date.toString(),
    )
    .map((localTime) => localTime.temperature)

  if (temperatures.length > 0) {
    const temperatureObj: TemperatureSummary = {
      first: temperatures[0],
      last: temperatures[temperatures.length - 1],
      high: Math.max(...temperatures),
      low: Math.min(...temperatures),
      average:
        temperatures.reduce((total, value) => total + value) /
        temperatures.length,
    }

    return temperatureObj
  }

  return null
}

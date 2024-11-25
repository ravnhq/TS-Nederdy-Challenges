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

class Temperatures {
  static readings: TemperatureReading[]
}

export function processReadings(readings: TemperatureReading[]): void {
  // add here your code
  Temperatures.readings = readings
}

export function getTemperatureSummary(
  date: Date,
  city: string,
): TemperatureSummary | null {
  //add here your code

  const isSameDayMonthYear = (d1: Date, d2: Date): boolean => {
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDay() === d2.getDay()
    )
  }

  const filteredTemperaturedReadings = Temperatures.readings.filter(
    (reading: TemperatureReading): boolean => {
      return reading.city === city && isSameDayMonthYear(date, reading.time)
    },
  )

  if (!filteredTemperaturedReadings || !filteredTemperaturedReadings.length)
    return null

  const size = filteredTemperaturedReadings.length

  let result: TemperatureSummary = {
    average: 0,
    first: filteredTemperaturedReadings[0].temperature,
    last: filteredTemperaturedReadings[size - 1].temperature,
    high: filteredTemperaturedReadings[0].temperature,
    low: filteredTemperaturedReadings[0].temperature,
  }

  result = filteredTemperaturedReadings.reduce(
    (acc: TemperatureSummary, reading: TemperatureReading) => {
      acc.average += reading.temperature

      if (acc.high < reading.temperature) {
        acc.high = reading.temperature
      }

      if (acc.low > reading.temperature) {
        acc.low = reading.temperature
      }
      return acc
    },
    result,
  )

  result.average = result.average / size
  return result
}

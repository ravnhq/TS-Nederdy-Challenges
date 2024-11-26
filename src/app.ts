// example interfaces that can be use
// TIP: the types mentioned in the interfaces must be fulfilled in order to solve the problem.

interface TemperatureReading {
  time: Date
  temperature: number
  city: string
}
interface TemperatureSummary {
  first: number
  last?: number
  high?: number
  low?: number
  average: number
}

let dataTemperature: TemperatureReading[]

export function processReadings(readings: TemperatureReading[]): void {
  dataTemperature = readings
}

export function getTemperatureSummary(date: Date, city: string) {
  const dataResponse = dataTemperature.filter(
    (item) =>
      item.city === city &&
      item.time.toLocaleDateString() == date.toLocaleDateString(),
  )

  if (dataResponse.length !== 0) {
    const first = dataResponse[0].temperature
    const last = dataResponse[dataResponse.length - 1].temperature

    const allTemperatures = dataResponse.map((item) => item.temperature)
    const sumAllTemperatures = allTemperatures.reduce(
      (accumulator, temperatureValue) => accumulator + temperatureValue,
    )

    const orderTemperatures = allTemperatures.sort((a, b) => a - b)

    const low = orderTemperatures[0]
    const high = orderTemperatures[allTemperatures.length - 1]
    const average = sumAllTemperatures / allTemperatures.length

    const result: TemperatureSummary = {
      first,
      last,
      high,
      low,
      average,
    }
    return result
  }

  return null
}

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

const actualTemperatures: TemperatureReading[] = []

export function processReadings(readings: TemperatureReading[]): void {
  // add here your code
  actualTemperatures.push(...readings)
}

function averageTemperature(readings: TemperatureReading[]) {
  const result = readings.reduce(
    (sum, actualVal) => sum + actualVal.temperature,
    0,
  )
  return result / readings.length
}

function sameDay(date1: Date, date2: Date) {
  if (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getMonth() === date2.getMonth()
  )
    return true
  return false
}

export function getTemperatureSummary(
  date: Date,
  city: string,
): TemperatureSummary | null {
  //add here your code
  const todayTemperatures: TemperatureReading[] = actualTemperatures.filter(
    (value) => {
      if (sameDay(value.time, date) && value.city === city) return value
    },
  )
  if (todayTemperatures.length === 0) return null
  const sortedTemperatures = [...todayTemperatures].sort((val1, val2) =>
    val1.temperature <= val2.temperature ? -1 : 1,
  )
  return {
    first: todayTemperatures[0].temperature,
    last: todayTemperatures[todayTemperatures.length - 1].temperature,
    high: sortedTemperatures[sortedTemperatures.length - 1].temperature,
    low: sortedTemperatures[0].temperature,
    average: averageTemperature(todayTemperatures),
  }
}

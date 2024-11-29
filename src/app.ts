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

let readingsArray: TemperatureReading[] = []

export function processReadings(readings: TemperatureReading[]): void {
  readingsArray = readings
}

export function getTemperatureSummary(
  date: Date,
  city: string,
): TemperatureSummary | null {
  //Function to filter the global array so it only contains readings from the requested city and date
  const isFromDateAndCity = (read: TemperatureReading): boolean => {
    return read.time.getDate() === date.getDate() && read.city === city
  }

  //Function to find the highest temp from a readings array
  const findHighestTemp = (reads: TemperatureReading[]): TemperatureReading => {
    return reads.reduce(function (prev, current) {
      return prev.temperature > current.temperature ? prev : current
    })
  }

  //Function to find the lowest temp from a readings array
  const findLowestTemp = (reads: TemperatureReading[]): TemperatureReading => {
    return reads.reduce(function (prev, current) {
      return prev.temperature < current.temperature ? prev : current
    })
  }

  //Function to calculate the average temp from a readings array
  const findAvgTemp = (reads: TemperatureReading[]): number => {
    const avg = reads.reduce((accu, curr) => accu + curr.temperature, 0)
    return avg / reads.length
  }

  const filteredCity = readingsArray.filter(isFromDateAndCity)

  //If the filtered cities array is empty this means the requested city does not exist, therefore we return null.
  if (filteredCity.length === 0) return null

  const SummaryData: TemperatureSummary = {
    first: filteredCity[0].temperature,
    last: filteredCity[filteredCity.length - 1].temperature,
    high: findHighestTemp(filteredCity).temperature,
    low: findLowestTemp(filteredCity).temperature,
    average: findAvgTemp(filteredCity),
  }

  return SummaryData
}

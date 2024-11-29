import { TemperatureReading, TemperatureSummary } from './interfaces'

// type GroupedReadings = { [x: string]: TemperatureReading[] }

type GroupedReadings = Record<string, TemperatureReading[]>

// type ReadingsByCityAndDate = {
//   [x: string]: { [x: string]: TemperatureReading[] }
// }

type ReadingsByCityAndDate = Record<string, GroupedReadings>

const readingsByCityAndDate: ReadingsByCityAndDate = {}

function storeByCityAndDate(readings: TemperatureReading[]) {
  const readingsByCity: GroupedReadings = groupByCity(readings)
  for (const city in readingsByCity) {
    const date = readingsByCity[city]
    const readingsByDate: GroupedReadings = groupByDate(date)
    readingsByCityAndDate[city] = readingsByDate
  }
}

const processedSummaryStorage: {
  [x: string]: { [x: string]: TemperatureSummary }
} = {}

function processDailyReading() {
  // FIX: optimize processing algorithm
  let currentCity = ''
  let currentDate = ''
  Object.entries(readingsByCityAndDate).forEach(([city, dates]) => {
    currentCity = city
    const readings = Object.values(dates)
    readings.forEach((reading: TemperatureReading[]) => {
      currentDate = reading[0].time.toString()
      const temperatureSummary: TemperatureSummary = {
        first: 0,
        last: 0,
        high: 0,
        low: 0,
        average: 0,
      }
      Object.keys(temperatureSummary).forEach(
        (value) =>
          (temperatureSummary[value as keyof typeof temperatureSummary] =
            reading[0].temperature),
      )
      if (reading.length > 1) {
        temperatureSummary.last = reading[reading.length - 1].temperature
        let total = 0
        for (let index = 0; index < reading.length; index++) {
          const element = reading[index]
          total += element.temperature
          if (element.temperature > temperatureSummary.high) {
            temperatureSummary.high = element.temperature
          }
          if (element.temperature < temperatureSummary.low) {
            temperatureSummary.low = element.temperature
          }
          temperatureSummary.average = total / reading.length
        }
      }
      processedSummaryStorage[currentCity] = {
        ...(processedSummaryStorage[currentCity]
          ? processedSummaryStorage[currentCity]
          : {}),
        [currentDate]: temperatureSummary,
      }
    })
  })
}

export function processReadings(readings: TemperatureReading[]): void {
  storeByCityAndDate(readings)
  processDailyReading()
}

export function getTemperatureSummary(
  date: Date,
  city: string,
): TemperatureSummary | null {
  const formattedDate = date.toString()
  if (
    processedSummaryStorage.hasOwnProperty(city) &&
    processedSummaryStorage[city].hasOwnProperty(formattedDate)
  ) {
    return processedSummaryStorage[city][formattedDate]
  } else {
    return null
  }
}

function groupByCity(objectArray: TemperatureReading[]) {
  return objectArray.reduce(function (accumulator: GroupedReadings, object) {
    const city = object.city
    if (!accumulator[city]) {
      accumulator[city] = []
    }
    accumulator[city].push(object)
    return accumulator
  }, {})
}

function groupByDate(objectArray: TemperatureReading[]) {
  return objectArray.reduce(function (accumulator: GroupedReadings, object) {
    const formattedTime = object.time.toString()
    if (!accumulator[formattedTime]) {
      accumulator[formattedTime] = []
    }
    accumulator[formattedTime].push(object)
    return accumulator
  }, {})
}

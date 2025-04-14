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

type TempDataStore = Record<string, Record<string, number[]>>
// we use this type to record first the city, then the date and finally the readings for each date
const tempData: TempDataStore = {}
// variable with all the data of the temperatures

function formatDate(date: Date): string {
  const yyyy = date.getFullYear()
  const mm = String(date.getMonth() + 1).padStart(2, '0')
  const dd = String(date.getDate()).padStart(2, '0')
  return `${yyyy}-${mm}-${dd}`
}
// we format the dates to a reliable string to work with, following the ISO standard

export function processReadings(readings: TemperatureReading[]): void {
  if (!Array.isArray(readings) || readings.length === 0) {
    console.log('No readings provided or invalid readings array.')
    throw new Error('No readings provided or invalid readings array.')
  }
  for (const reading of readings) {
    if (
      !(reading.time instanceof Date) ||
      isNaN(reading.time.getTime()) ||
      typeof reading.temperature !== 'number' ||
      typeof reading.city !== 'string' ||
      reading.city.trim() === ''
    ) {
      console.log('Invalid reading skipped: ', reading)
      throw new Error(`Invalid reading encountered: ${JSON.stringify(reading)}`)
    }
    // end of Data validation
    const dateKey = formatDate(reading.time)
    const city = reading.city

    if (!tempData[city]) {
      tempData[city] = {}
    }

    if (!tempData[city][dateKey]) {
      tempData[city][dateKey] = []
    }

    tempData[city][dateKey].push(reading.temperature)
  }
}

export function getTemperatureSummary(
  date: Date,
  city: string,
): TemperatureSummary | null {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    console.log('Invalid date provided: ', date)
    throw new Error(`Invalid date provided: ${date}`)
  }

  if (typeof city !== 'string' || city.trim() === '') {
    console.log('Invalid city name: ', city)
    throw new Error(`Invalid city name provided: ${city}`)
  }
  // end of data validation

  const dateKey = formatDate(date)

  const cityData = tempData[city]
  if (!cityData) return null

  const temps = cityData[dateKey]
  if (!temps || temps.length === 0) return null

  const first = temps[0]
  const last = temps[temps.length - 1]
  const high = Math.max(...temps)
  const low = Math.min(...temps)
  const total = temps.reduce((sum, single) => sum + single, 0)
  const average = total / temps.length

  return { first, last, high, low, average }
}

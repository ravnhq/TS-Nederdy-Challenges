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

// Interface
interface RecordedCity {
  time: Date
  city: string
}

function isSameDay(date1: Date, date2: Date) {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  )
}

// Functionality
let citiesData: TemperatureReading[] = []

export function processReadings(readings: TemperatureReading[]) {
  citiesData = readings

  const mappedData = readings.map((reading) => {
    const city: RecordedCity = {
      time: reading.time,
      city: reading.city,
    }

    return city
  })

  const dayReadings = mappedData.reduce<RecordedCity[]>(
    (accumulator, current) => {
      const existingData = accumulator.find(
        (data) =>
          isSameDay(data.time, current.time) && data.city === current.city,
      )

      if (existingData === undefined) {
        const data: RecordedCity = {
          time: current.time,
          city: current.city,
        }

        accumulator.push(data)
      }

      return accumulator
    },
    [],
  )

  dayReadings.forEach((day) => {
    const summary = getTemperatureSummary(day.time, day.city)

    console.log(summary)
  })
}

export function getTemperatureSummary(
  date: Date,
  city: string,
): TemperatureSummary | null {
  const selectedCityInformation = citiesData.filter(
    (reading) => reading.city === city && isSameDay(reading.time, date),
  )

  if (selectedCityInformation.length === 0) {
    return null
  } else {
    const temperatures = selectedCityInformation.map(
      (information) => information.temperature,
    )

    const sumOfTemps = temperatures.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0,
    )

    const summary: TemperatureSummary = {
      first: temperatures[0],
      last: temperatures[temperatures.length - 1],
      high: Math.max(...temperatures),
      low: Math.min(...temperatures),
      average: sumOfTemps / temperatures.length,
    }

    return summary
  }
}

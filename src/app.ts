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

const readingsFormatted: {
  [city: string]: {
    [time: string]: TemperatureReading[]
  }
} = {}

// Store temperature readings in a sorted way to facilitate searches by city and time
export function processReadings(readings: TemperatureReading[]): void {
  //console.log(readings, 'test')
  readings.forEach((r) => {
    const { city, time } = r
    //console.log(city, time)

    const timeF = new Intl.DateTimeFormat('en-US').format(time)

    if (!readingsFormatted[city]) {
      readingsFormatted[city] = {}
    }

    if (!readingsFormatted[city][timeF]) {
      readingsFormatted[city][timeF] = []
    }

    readingsFormatted[city][timeF].push(r)
  })

  //1. Filtrar por city
  for (const city in readingsFormatted) {
    //2. Filtrar por fecha
    for (const date in readingsFormatted[city]) {
      //console.log(readingsFormatted[city][date])
      //3. Ordenar por temperatura
      readingsFormatted[city][date].sort(
        (a, b) => a.time.getTime() - b.time.getTime(),
      )
    }
  }
}

export function getTemperatureSummary(
  date: Date,
  city: string,
): TemperatureSummary | null {
  const dateF = new Intl.DateTimeFormat('en-US').format(date)

  if (date && city && readingsFormatted[city] && readingsFormatted[city][dateF]) {
 

    const tempReadings = readingsFormatted[city][dateF]
    const first = tempReadings[0].temperature

    const lastIndex = tempReadings.length - 1
    const last = readingsFormatted[city][dateF][lastIndex].temperature
    const average = tempReadings.reduce((sum, e) => sum + e.temperature, 0) / readingsFormatted[city][dateF].length
    const high = Math.max(...tempReadings.map(e => e.temperature))
    const low = Math.min(...tempReadings.map(r => r.temperature))


    const temperatureResume: TemperatureSummary = {
      first: first,
      last: last,
      average: average,
      high: high,
      low: low,
    }

    return temperatureResume
  } else {
    return null
  }
}


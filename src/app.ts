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

const temperature = [
  {
    time: new Date('1/3/2021'),
    temperature: 8,
    city: 'Utah',
  },
  {
    time: new Date('1/2/2021'),
    temperature: 10,
    city: 'Utah',
  },
  {
    time: new Date('1/2/2021'),
    temperature: 9,
    city: 'Utah',
  },
  {
    time: new Date('1/2/2021'),
    temperature: 12,
    city: 'Utah',
  },
  {
    time: new Date('1/2/2021'),
    temperature: 11,
    city: 'Utah',
  },
  {
    time: new Date('3/12/2021'),
    temperature: 15,
    city: 'New York',
  },
  {
    time: new Date('3/12/2021'),
    temperature: 10,
    city: 'New York',
  },
  {
    time: new Date('3/12/2021'),
    temperature: 11,
    city: 'New York',
  },
  {
    time: new Date('3/12/2021'),
    temperature: 9,
    city: 'New York',
  },
  {
    time: new Date('3/13/2021'),
    temperature: 16,
    city: 'New York',
  },
]
const refinedReadingsMap = new Map<string, Map<string, number[]>>()

export function processReadings(readings: TemperatureReading[]): void {
  for (const item of readings) {
    const timeKey = String(item.time)
    const city = item.city

    let nameMap = refinedReadingsMap.get(timeKey)
    if (!nameMap) {
      nameMap = new Map()
      refinedReadingsMap.set(timeKey, nameMap)
    }

    let cityTemps = nameMap.get(city)
    if (!cityTemps) {
      cityTemps = []
      nameMap.set(city, cityTemps)
    }
    cityTemps.push(item.temperature)
  }
}
processReadings(temperature)

function AverageArray(array: number[]): number {
  let sum = 0
  for (const digit of array) {
    sum += digit
  }

  const divider = array.length

  return sum / divider
}

export function getTemperatureSummary(
  date: Date,
  city: string,
): TemperatureSummary | null {
  //add here your code
  const key = date.toString()
  const result = refinedReadingsMap.get(key)
  const arrayTemperature = result?.get(city)

  if (!arrayTemperature || arrayTemperature.length === 0) {
    return null
  }

  const finalResult: TemperatureSummary = {
    first: arrayTemperature[0],
    last: arrayTemperature[arrayTemperature.length - 1],
    high: Math.max(...arrayTemperature),
    low: Math.min(...arrayTemperature),
    average: AverageArray(arrayTemperature),
  }

  // console.log(finalResult, 'este es el result')

  return finalResult
}

getTemperatureSummary(new Date('1/2/2021'), 'Utah')

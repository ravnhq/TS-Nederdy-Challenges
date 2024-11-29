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

function transformDate(array: any) {
  return array.map(({ time }: any) => time.toDateString())
}

function cities(array: any) {
  return array.map(({ city }: any) => city)
}

function setString(arr: string[]) {
  return [...new Set<string>(arr)]
}

function findElement(array: any) {
  return array.find((a: any) => a)
}

function processData(readings: TemperatureReading[]) {
  const cityNames = cities(readings)
  const reduceRepeatCities = setString(cityNames)
  const filterArrByCities = reduceRepeatCities.map((element) => {
    return readings.filter(({ city }) => city === element)
  })
  const filterArrByTimeAndCity = filterArrByCities.map((arr) => {
    const dateTime = transformDate(arr)

    const filterRepeatTime = setString(dateTime)

    const filterArrByTime = filterRepeatTime.map((element) => {
      return arr.filter(({ time }) => element === time.toDateString())
    })

    return filterArrByTime.map((filterArr) => {
      const t = transformDate(filterArr)
      const temp = filterArr.map(({ temperature }) => temperature)
      const arrCities = cities(filterArr)

      const filterRepeatTime = setString(t)
      const filterRepeatCity = setString(arrCities)

      return {
        time: findElement(filterRepeatTime),
        temperature: temp.length <= 1 ? findElement(temp) : temp,
        city: findElement(filterRepeatCity),
      }
    })
  })

  return filterArrByTimeAndCity
}

export function processReadings(readings: TemperatureReading[]): void {
  console.log(processData(readings))
}

export function getTemperatureSummary(
  date: Date,
  city: string,
): TemperatureSummary | null {
  const getData = processData(example)
  const getArrayData = getData.map((element) => {
    return element.find(
      (readTemperature) =>
        readTemperature.time === date.toDateString() &&
        readTemperature.city === city,
    )
  })

  const filterData = getArrayData.find((tem) => tem !== undefined)

  if (filterData?.time === date.toDateString() && filterData?.city === city) {
    if (Array.isArray(filterData.temperature)) {
      const first = filterData.temperature[0]
      const last = filterData.temperature[filterData.temperature.length - 1]
      const high = Math.max(...filterData.temperature)
      const low = Math.min(...filterData.temperature)
      const average =
        filterData.temperature.reduce((a, b) => a + b) /
        filterData.temperature.length

      return {
        first,
        last,
        high,
        low,
        average,
      }
    } else {
      return {
        first: filterData.temperature,
        last: filterData.temperature,
        high: filterData.temperature,
        low: filterData.temperature,
        average: filterData.temperature,
      }
    }
  } else {
    return null
  }
}

const example = [
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

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

interface CustomTemperatureSummary extends TemperatureSummary {
  count: number
}

const TemperatureSummaryByCity: Map<
  string,
  Map<number, CustomTemperatureSummary>
> = new Map()

export function processReadings(readings: TemperatureReading[]): void {
  for (const { time, temperature, city } of readings) {
    let cityMap = TemperatureSummaryByCity.get(city)

    if (cityMap === undefined) {
      cityMap = new Map()
      TemperatureSummaryByCity.set(city, cityMap)
    }

    const numberTime: number = time.getTime()

    let cityTime = cityMap.get(numberTime)

    if (cityTime === undefined) {
      cityTime = {
        average: 0,
        high: -Infinity,
        low: Infinity,
        first: temperature,
        last: temperature,
        count: 0,
      }
      cityMap.set(numberTime, cityTime)
    }

    const { low, high, count, average } = cityTime

    cityTime.low = low < temperature ? low : temperature
    cityTime.high = high > temperature ? high : temperature
    cityTime.count = count + 1
    cityTime.average = (average * count + temperature) / (count + 1)
    cityTime.last = temperature
  }
}

export function getTemperatureSummary(
  date: Date,
  city: string,
): TemperatureSummary | null {
  const cityMap = TemperatureSummaryByCity.get(city)
  if (!cityMap) {
    return null
  }

  const cityTimeSummary = cityMap.get(date.getTime())
  if (!cityTimeSummary) {
    return null
  }

  return cityTimeSummary
}

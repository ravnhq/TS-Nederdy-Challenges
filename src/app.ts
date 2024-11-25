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
    if (!TemperatureSummaryByCity.has(city)) {
      TemperatureSummaryByCity.set(city, new Map())
    }

    const cityMap: Map<number, CustomTemperatureSummary> =
      TemperatureSummaryByCity.get(city) as Map<
        number,
        CustomTemperatureSummary
      >
    const numberTime: number = time.getTime()

    if (!cityMap.has(numberTime)) {
      cityMap.set(numberTime, {
        average: 0,
        high: -Infinity,
        low: Infinity,
        first: temperature,
        last: temperature,
        count: 0,
      })
    }

    const cityTime: CustomTemperatureSummary = cityMap.get(
      numberTime,
    ) as CustomTemperatureSummary

    cityTime.low = cityTime.low < temperature ? cityTime.low : temperature
    cityTime.high = cityTime.high > temperature ? cityTime.high : temperature
    cityTime.count = cityTime.count + 1
    cityTime.average =
      (cityTime.average * (cityTime.count - 1) + temperature) / cityTime.count
    cityTime.last = temperature
  }
}

export function getTemperatureSummary(
  date: Date,
  city: string,
): TemperatureSummary | null {
  const cityMap: Map<number, CustomTemperatureSummary> | undefined =
    TemperatureSummaryByCity.get(city)
  if (!cityMap) {
    return null
  }

  const cityTimeSummary = cityMap.get(date.getTime())
  if (!cityTimeSummary) {
    return null
  }

  return cityTimeSummary as TemperatureSummary
}

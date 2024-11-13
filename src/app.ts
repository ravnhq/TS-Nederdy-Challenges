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

export function processReadings(
  readings: TemperatureReading[],
): TemperatureReading[] {
  // add here your code
  return readings
}

export function getTemperatureSummary(
  date: Date,
  city: string,
  // needed to pass the temperature readings array to work with it
  readings: TemperatureReading[],
): TemperatureSummary | null {
  //add here your code

  const processedWithForOf: TemperatureReading[] = []

  for (const read of readings) {
    if (read.city === city && read.time.getDate() === date.getDate()) {
      processedWithForOf.push(read)
    }
  }

  const processedWithArrMethod = readings.filter(
    (read) => read.city === city && read.time.getDate() === date.getDate(),
  )

  const first = processedWithForOf[0]?.temperature

  const high = processedWithArrMethod.sort(
    (a, b) => b.temperature - a.temperature,
  )[0]?.temperature

  const low = processedWithArrMethod.sort(
    (a, b) => a.temperature - b.temperature,
  )[0]?.temperature

  const average =
    processedWithArrMethod.length > 0
      ? processedWithArrMethod.reduce(
          (acc, curr) => acc + curr.temperature,
          0,
        ) / processedWithArrMethod.length
      : 0

  const last = processedWithForOf.reverse()[0]?.temperature

  if (date === null || city === null || processedWithArrMethod.length === 0) {
    return null
  }

  return {
    first,
    last,
    high,
    low,
    average,
  }
}

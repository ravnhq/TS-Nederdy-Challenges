import { CityTimestamp, TemperatureReading, TemperatureSummary } from "./GeoData"

const cities: CityTimestamp[] = []

export function processReadings(readings: TemperatureReading[]): void {
  // add here your code
  readings.forEach((item) => {
    const geoData = cities.filter(
      (geo) =>
        geo.city === item.city &&
        geo.time.toISOString() === item.time.toISOString(),
    )
    const index = cities.indexOf(geoData[0])
    if (geoData.length > 0) {
      cities[index].temperatures.push(item.temperature)
    } else {
      cities.push(new CityTimestamp(item.time, item.city, [item.temperature]))
    }
  })
}

export function getTemperatureSummary(
  date: Date,
  city: string,
): TemperatureSummary | null {
  //add here your code
  const result = cities.filter((geo) => {
    return (
      geo.city === city &&
      geo.time.toISOString().slice(0, 10) === date.toISOString().slice(0, 10)
    )
  })

  if (result.length > 0) {
    const first = result[0].temperatures[0]
    const last = result[0].temperatures[result[0].temperatures.length - 1]
    const hight = Math.max(...result[0].temperatures)
    const low = Math.min(...result[0].temperatures)
    const average =
      result[0].temperatures.reduce((a, b) => a + b, 0) /
      result[0].temperatures.length

    return new TemperatureSummary(first, last, hight, low, average)
  }

  return null
}

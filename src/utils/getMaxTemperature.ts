import { TemperatureReading } from '../interfaces'

export function getMaxValue(readings: TemperatureReading[]): number {
  const maxValue = readings.reduce((acc: any, value: any) => {
    return (acc = acc > value.temperature ? acc : value.temperature)
  }, 0)

  return maxValue
}

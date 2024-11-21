import { TemperatureReading } from '../interfaces'

export function getLowestValue(readings: TemperatureReading[]): number {
  const lowValue = readings.reduce((acc: number, value: TemperatureReading) => {
    return acc < value.temperature ? acc : value.temperature
  }, readings[0].temperature)

  return lowValue
}

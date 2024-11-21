import { TemperatureReading } from '../interfaces'

export function getAverage(data: TemperatureReading[]) {
  const arr = Object.values(data)
  const sum = (acc: any, obj: any) => acc + obj.temperature
  const avg = arr.reduce(sum, 0) / arr.length

  return avg
}

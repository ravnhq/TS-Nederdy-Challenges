export interface TemperatureReading {
  time: Date
  temperature: number
  city: string
}

export interface TemperatureSummary {
  first: number
  last: number
  high: number
  low: number
  average: number
}

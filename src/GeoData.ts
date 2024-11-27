// example interfaces that can be use
// TIP: the types mentioned in the interfaces must be fulfilled in order to solve the problem.
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
export class TemperatureSummary implements TemperatureSummary {
  constructor(
    public first: number,
    public last: number,
    public high: number,
    public low: number,
    public average: number,
  ) {}
}
export class CityTimestamp {
  constructor(
    public time: Date,
    public city: string,
    public temperatures: number[],
  ) {}
}
